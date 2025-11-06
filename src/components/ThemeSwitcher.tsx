import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { toast } from "sonner";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "medical">("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "theme-medical");
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "medical") {
      root.classList.add("theme-medical");
    }
  }, [theme]);

  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "medical"> = ["light", "dark", "medical"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    
    const themeNames = {
      light: "Light Theme",
      dark: "Dark Theme",
      medical: "Medical Theme"
    };
    toast.success(`Switched to ${themeNames[nextTheme]}`);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "medical":
        return <Palette className="h-5 w-5" />;
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300"
      title="Switch theme"
    >
      {getIcon()}
    </Button>
  );
};
