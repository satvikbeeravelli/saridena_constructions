import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="relative flex items-center">
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
      />
      <Sun className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500 dark:opacity-0 transition-opacity pointer-events-none" />
      <Moon className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 dark:opacity-100 opacity-0 transition-opacity pointer-events-none" />
    </div>
  )
}
