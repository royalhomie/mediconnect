-- Enable Row Level Security
alter table profiles enable row level security;

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text unique not null,
  phone text,
  address text,
  avatar_url text,
  role text not null default 'patient' check (role in ('patient', 'doctor')),
  preferences jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a trigger to handle the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Set up Row Level Security (RLS)
-- Allow public access to read profiles (adjust as needed)
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

-- Users can update their own profile
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'role'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for appointments
create table if not exists public.appointments (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.profiles(id) on delete cascade not null,
  doctor_id uuid references public.profiles(id) on delete cascade not null,
  appointment_date timestamp with time zone not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index if not exists appointments_patient_id_idx on public.appointments (patient_id);
create index if not exists appointments_doctor_id_idx on public.appointments (doctor_id);
create index if not exists appointments_date_idx on public.appointments (appointment_date);

-- Set up RLS for appointments
create policy "Users can view their own appointments"
  on appointments for select
  using (auth.uid() = patient_id or auth.uid() = doctor_id);

create policy "Users can create appointments"
  on appointments for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update their own appointments"
  on appointments for update
  using (auth.uid() = patient_id or auth.uid() = doctor_id);

-- Create a function to notify when an appointment is created/updated
create or replace function public.notify_appointment_change()
returns trigger as $$
begin
  perform pg_notify(
    'appointment_change',
    json_build_object(
      'event', TG_OP,
      'appointment_id', NEW.id,
      'patient_id', NEW.patient_id,
      'doctor_id', NEW.doctor_id,
      'appointment_date', NEW.appointment_date
    )::text
  );
  return NEW;
end;
$$ language plpgsql security definer;

-- Create triggers for appointment notifications
create or replace trigger on_appointment_created
  after insert on public.appointments
  for each row execute procedure public.notify_appointment_change();

create or replace trigger on_appointment_updated
  after update on public.appointments
  for each row execute procedure public.notify_appointment_change();
