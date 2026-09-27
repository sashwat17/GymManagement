import React from "react";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgressBar";
import { Search, Eye, Dumbbell, TrendingUp, Calendar } from "lucide-react";
import { useTrainees } from "../../hooks/useTrainees";
import type { TraineeLevel } from "../../types/trainee";

export function TraineeManagement() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("All");
  const traineesQuery = useTrainees({
    search: searchQuery || undefined,
    level: selectedLevel === "All" ? undefined : selectedLevel as TraineeLevel,
  });
  const trainees = traineesQuery.data ?? [];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Trainee Management</h1>
        <p className="text-muted-foreground">
          Manage and track your trainees' progress
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search trainees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-3 rounded-lg transition-all ${
                selectedLevel === level
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {traineesQuery.isLoading && <p className="text-muted-foreground">Loading trainees...</p>}
        {traineesQuery.isError && <p role="alert" className="text-destructive">{traineesQuery.error.message}</p>}
        {trainees.map((trainee) => (
          <Card key={trainee.id}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg text-2xl">
                  {trainee.avatarEmoji}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-foreground">{trainee.name}</h3>
                    <Badge variant={getLevelColor(trainee.level)}>
                      {trainee.level}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{trainee.lastActivityLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Dumbbell className="w-4 h-4" />
                      <span>
                        {trainee.workoutsCompleted}/{trainee.totalWorkouts}{" "}
                        workouts
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <TrendingUp className="w-4 h-4" />
                      <span>{trainee.progress}% progress</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Overall Progress
                      </span>
                      <span className="text-foreground">
                        {trainee.progress}%
                      </span>
                    </div>
                    <ProgressBar value={trainee.progress} max={100} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </Button>
                <Button variant="primary" className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  <span>Assign Workout</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!traineesQuery.isLoading && !traineesQuery.isError && trainees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No trainees found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
