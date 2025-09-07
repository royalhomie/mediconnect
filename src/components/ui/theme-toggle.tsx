import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { setTheme, setMedicalTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Medical Theme</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setMedicalTheme("blue")}>
            Medical Blue
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMedicalTheme("green")}>
            Healing Green
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMedicalTheme("orange")}>
            Trust Orange
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMedicalTheme("purple")}>
            Royal Purple
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMedicalTheme("teal")}>
            Serene Teal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMedicalTheme("rose")}>
            Caring Rose
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
