import { supabase } from './supabase';

export const STORAGE_BUCKET = 'doclink';

export const uploadFile = async (file: File, path: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  return data.path;
};

export const getFileUrl = (path: string) => {
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

export const deleteFile = async (path: string) => {
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([path]);

  if (error) {
    throw error;
  }
};

export const uploadProfilePicture = async (userId: string, file: File) => {
  const path = `profile-pictures/${userId}`;
  const filePath = await uploadFile(file, path);
  return getFileUrl(filePath);
};
