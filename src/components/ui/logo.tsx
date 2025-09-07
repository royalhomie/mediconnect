import { Stethoscope } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  withText?: boolean;
}

export const Logo = ({ 
  className = "", 
  iconClassName = "", 
  textClassName = "",
  withText = true 
}: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue to-medical-green rounded-lg blur-sm group-hover:blur-md transition-all" />
        <div className="relative rounded-lg bg-gradient-medical p-2">
          <Stethoscope className={`h-6 w-6 text-white ${iconClassName}`} />
        </div>
      </div>
      {withText && (
        <span className={`font-bold text-2xl bg-gradient-to-r from-medical-blue to-medical-green bg-clip-text text-transparent ${textClassName}`}>
          MediConnect
        </span>
      )}
    </div>
  );
};
