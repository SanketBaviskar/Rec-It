import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export function Fitness() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitness Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="175" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="70" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bmi">BMI</Label>
            <Input id="bmi" type="number" placeholder="22.9" disabled />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Fitness Level</Label>
          <Slider
            defaultValue={[5]}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Fitness Goals</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="weightLoss" />
              <Label htmlFor="weightLoss">Weight Loss</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="muscleGain" />
              <Label htmlFor="muscleGain">Muscle Gain</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="endurance" />
              <Label htmlFor="endurance">Endurance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="flexibility" />
              <Label htmlFor="flexibility">Flexibility</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="strength" />
              <Label htmlFor="strength">Strength</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="toning" />
              <Label htmlFor="toning">Toning</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="medicalConditions">Medical Conditions</Label>
          <Textarea id="medicalConditions" placeholder="List any relevant medical conditions" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTrainer">Preferred Trainer</Label>
          <Select>
            <SelectTrigger id="preferredTrainer">
              <SelectValue placeholder="Select preferred trainer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-smith">John Smith</SelectItem>
              <SelectItem value="jane-doe">Jane Doe</SelectItem>
              <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Workout Preferences</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="cardio" />
              <Label htmlFor="cardio">Cardio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="weightTraining" />
              <Label htmlFor="weightTraining">Weight Training</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="yoga" />
              <Label htmlFor="yoga">Yoga</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pilates" />
              <Label htmlFor="pilates">Pilates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="groupClasses" />
              <Label htmlFor="groupClasses">Group Classes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="swimming" />
              <Label htmlFor="swimming">Swimming</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fitnessNotes">Fitness Notes</Label>
          <Textarea id="fitnessNotes" placeholder="Additional notes about fitness goals or preferences" />
        </div>
      </CardContent>
    </Card>
  )
}