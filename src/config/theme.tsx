'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Waves, Flame, Leaf } from 'lucide-react'

const colorThemes = [
  {
    name: "Energy Blue (Current)",
    icon: Waves,
    colors: {
      primary: "#4169E1",
      secondary: "#9370DB",
      accent: "#3498db",
      background: "#f8fafc",
      foreground: "#1e293b",
      muted: "#e2e8f0",
      "muted-foreground": "#64748b",
    }
  },
  {
    name: "Power Red",
    icon: Flame,
    colors: {
      primary: "#FF4B4B",
      secondary: "#FF7676",
      accent: "#e74c3c",
      background: "#fff5f5",
      foreground: "#2d3748",
      muted: "#fed7d7",
      "muted-foreground": "#718096",
    }
  },
  {
    name: "Vitality Green",
    icon: Leaf,
    colors: {
      primary: "#2ECC71",
      secondary: "#27AE60",
      accent: "#1abc9c",
      background: "#f0fff4",
      foreground: "#2d3748",
      muted: "#c6f6d5",
      "muted-foreground": "#718096",
    }
  },
  {
    name: "Strength Purple",
    icon: Dumbbell,
    colors: {
      primary: "#9B51E0",
      secondary: "#6B46C1",
      accent: "#8e44ad",
      background: "#faf5ff",
      foreground: "#2d3748",
      muted: "#e9d8fd",
      "muted-foreground": "#718096",
    }
  }
]

export default function ColorPaletteShowcase() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Rec-It Color Palettes</h1>
      <Tabs defaultValue={colorThemes[0].name}>
        <TabsList className="grid w-full grid-cols-4">
          {colorThemes.map((theme) => (
            <TabsTrigger key={theme.name} value={theme.name} className="flex items-center gap-2">
              <theme.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{theme.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {colorThemes.map((theme) => (
          <TabsContent key={theme.name} value={theme.name}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <theme.icon className="h-6 w-6" />
                  {theme.name}
                </CardTitle>
                <CardDescription>Color palette for the {theme.name} theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(theme.colors).map(([name, color]) => (
                    <div key={name} className="space-y-2">
                      <div 
                        className="h-24 rounded-md border"
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-sm font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground">{color}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

