import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    location: string;
    availability: string;
    image?: string;
    expertise: string[];
  };
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="w-full transition-all hover:shadow-medical">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback>{doctor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({doctor.reviews} reviews)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {doctor.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <Clock className="h-4 w-4" />
          {doctor.availability}
        </div>
        <div className="flex flex-wrap gap-2">
          {doctor.expertise.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to={`/book?doctor=${doctor.id}`}>Book Appointment</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
