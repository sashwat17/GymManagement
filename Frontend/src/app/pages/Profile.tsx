import React from "react";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import {
  User,
  Ruler,
  Weight,
  Calendar,
  Target,
  Calculator,
} from "lucide-react";

export function Profile() {
  const [height, setHeight] = React.useState("175");
  const [weight, setWeight] = React.useState("75");
  const [age, setAge] = React.useState("28");
  const [goal, setGoal] = React.useState("Build Muscle");

  const [bmiHeight, setBmiHeight] = React.useState("");
  const [bmiWeight, setBmiWeight] = React.useState("");

  // Auto-calculate BMI when both values are present
  const calculateBMI = (): number | null => {
    const heightInMeters = parseFloat(bmiHeight) / 100;
    const weightInKg = parseFloat(bmiWeight);
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi =
        weightInKg / (heightInMeters * heightInMeters);
      return parseFloat(bmi.toFixed(1));
    }
    return null;
  };

  const bmiResult = calculateBMI();
  const hasBothValues =
    bmiHeight.trim() !== "" && bmiWeight.trim() !== "";

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5)
      return {
        category: "Underweight",
        variant: "warning" as const,
        message:
          "Your BMI is below the healthy range. Consider consulting a nutritionist.",
        color: "#c4866b",
      };
    if (bmi < 25)
      return {
        category: "Normal Weight",
        variant: "success" as const,
        message:
          "Your BMI is in the healthy range. Keep up the great work!",
        color: "#8fa68a",
      };
    if (bmi < 30)
      return {
        category: "Overweight",
        variant: "warning" as const,
        message:
          "Your BMI is above the healthy range. Regular exercise can help.",
        color: "#d4a574",
      };
    return {
      category: "Obese",
      variant: "danger" as const,
      message:
        "Your BMI indicates obesity. Consult a healthcare professional.",
      color: "#c85a54",
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground">
          Profile & Personalization
        </h1>
        <p className="text-muted-foreground">
          Manage your fitness profile
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h3 className="text-foreground">
              Personal Information
            </h3>
          </div>

          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-4xl">💪</span>
            </div>
            <div>
              <h2 className="text-foreground mb-1">
                Shishir Bhandari
              </h2>
              <p className="text-muted-foreground">
                example@gmail.com
              </p>
              <Badge variant="primary" className="mt-2">
                Premium Member
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 mb-2 text-foreground">
                <Ruler className="w-4 h-4 text-primary" />
                Height (cm)
              </label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-foreground">
                <Weight className="w-4 h-4 text-primary" />
                Weight (kg)
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                Age
              </label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-foreground">
                <Target className="w-4 h-4 text-primary" />
                Fitness Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Build Muscle</option>
                <option>Lose Weight</option>
                <option>Get Fit</option>
                <option>Improve Endurance</option>
                <option>Increase Flexibility</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="primary">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-secondary" />
            <h3 className="text-foreground">BMI Calculator</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Height (cm)
              </label>
              <Input
                type="number"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                placeholder="175"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Weight (kg)
              </label>
              <Input
                type="number"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                placeholder="75"
              />
            </div>

            {!hasBothValues ? (
              <div className="mt-6 p-6 bg-muted rounded-lg border border-border">
                <div className="text-center">
                  <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    To calculate your BMI, you must enter your
                    height and weight
                  </p>
                </div>
              </div>
            ) : (
              bmiResult !== null && (
                <div
                  className="mt-6 p-5 rounded-lg border-2 transition-all duration-300"
                  style={{
                    backgroundColor:
                      getBMICategory(bmiResult).color + "15",
                    borderColor:
                      getBMICategory(bmiResult).color + "40",
                  }}
                >
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Your BMI
                    </p>
                    <p
                      className="text-5xl mb-3"
                      style={{
                        color: getBMICategory(bmiResult).color,
                      }}
                    >
                      {bmiResult}
                    </p>
                    <Badge
                      variant={
                        getBMICategory(bmiResult).variant
                      }
                      className="text-sm px-4 py-1"
                    >
                      {getBMICategory(bmiResult).category}
                    </Badge>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      {getBMICategory(bmiResult).message}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-foreground mb-4">Fitness Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl text-primary mb-1">156</p>
            <p className="text-sm text-muted-foreground">
              Total Workouts
            </p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl text-secondary mb-1">
              38,420
            </p>
            <p className="text-sm text-muted-foreground">
              Calories Burned
            </p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl text-primary mb-1">124</p>
            <p className="text-sm text-muted-foreground">
              Hours Trained
            </p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl text-secondary mb-1">92%</p>
            <p className="text-sm text-muted-foreground">
              Attendance Rate
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}