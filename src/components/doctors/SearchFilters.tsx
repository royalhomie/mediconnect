import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

interface SearchFilters {
  specialty: string;
  location: string;
  maxDistance: number;
  availability: string;
  rating: number;
}

const specialties = [
  "All Specialties",
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
];

const availabilityOptions = [
  "Any Time",
  "Today",
  "Tomorrow",
  "This Week",
  "Next Week",
];

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    specialty: "All Specialties",
    location: "",
    maxDistance: 10,
    availability: "Any Time",
    rating: 0,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">Specialty</label>
        <Select
          value={filters.specialty}
          onValueChange={(value) => handleFilterChange("specialty", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          placeholder="Enter location"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Maximum Distance: {filters.maxDistance} km
        </label>
        <Slider
          value={[filters.maxDistance]}
          min={1}
          max={50}
          step={1}
          onValueChange={(value) => handleFilterChange("maxDistance", value[0])}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Availability</label>
        <Select
          value={filters.availability}
          onValueChange={(value) => handleFilterChange("availability", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Minimum Rating: {filters.rating} stars
        </label>
        <Slider
          value={[filters.rating]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(value) => handleFilterChange("rating", value[0])}
        />
      </div>

      <Button
        className="w-full"
        onClick={() => {
          setFilters({
            specialty: "All Specialties",
            location: "",
            maxDistance: 10,
            availability: "Any Time",
            rating: 0,
          });
        }}
        variant="outline"
      >
        Reset Filters
      </Button>
    </div>
  );
}
