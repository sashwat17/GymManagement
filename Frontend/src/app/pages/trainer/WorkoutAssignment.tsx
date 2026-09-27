import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Calendar, Clock, Dumbbell, User, AlertCircle } from 'lucide-react';
import { useTraineeOptions } from '../../hooks/useTrainees';
import { useAssignWorkout, useWorkouts } from '../../hooks/useWorkouts';
import type { AssignmentDifficulty } from '../../types/workout';

export function WorkoutAssignment() {
  const [selectedTrainee, setSelectedTrainee] = React.useState('');
  const [selectedWorkout, setSelectedWorkout] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<AssignmentDifficulty>('Medium');
  const [scheduledDate, setScheduledDate] = React.useState('');
  const [scheduledTime, setScheduledTime] = React.useState('');
  const traineesQuery = useTraineeOptions();
  const workoutsQuery = useWorkouts();
  const assignWorkout = useAssignWorkout();
  const trainees = traineesQuery.data ?? [];
  const workouts = workoutsQuery.data ?? [];

  const handleAssign = async () => {
    if (!selectedTrainee || !selectedWorkout) {
      alert('Please select both a trainee and a workout');
      return;
    }
    try {
      await assignWorkout.mutateAsync({
        traineeId: selectedTrainee,
        workoutId: selectedWorkout,
        difficulty,
        ...(scheduledDate && { scheduledDate }),
        ...(scheduledTime && { scheduledTime }),
      });
      alert('Workout assigned successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to assign workout.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Assign Workout</h1>
        <p className="text-muted-foreground">Create personalized workout assignments for your trainees</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-foreground">Select Trainee</h3>
            </div>

            <div className="space-y-3">
              {traineesQuery.isLoading && <p className="text-muted-foreground">Loading trainees...</p>}
              {traineesQuery.isError && <p role="alert" className="text-destructive">{traineesQuery.error.message}</p>}
              {trainees.map((trainee) => (
                <button
                  key={trainee.id}
                  onClick={() => setSelectedTrainee(trainee.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                    selectedTrainee === trainee.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                      {trainee.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-foreground">{trainee.name}</p>
                      <p className="text-sm text-muted-foreground">{trainee.level}</p>
                    </div>
                  </div>
                  {selectedTrainee === trainee.id && (
                    <Badge variant="primary">Selected</Badge>
                  )}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="w-6 h-6 text-secondary" />
              <h3 className="text-foreground">Select Workout</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {workoutsQuery.isLoading && <p className="text-muted-foreground">Loading workouts...</p>}
              {workoutsQuery.isError && <p role="alert" className="text-destructive">{workoutsQuery.error.message}</p>}
              {workouts.map((workout) => (
                <button
                  key={workout.id}
                  onClick={() => setSelectedWorkout(workout.id)}
                  className={`flex flex-col items-start p-4 rounded-lg border transition-all ${
                    selectedWorkout === workout.id
                      ? 'border-secondary bg-secondary/5 shadow-lg'
                      : 'border-border hover:border-secondary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between w-full mb-2">
                    <h4 className="text-foreground text-left">{workout.name}</h4>
                    {selectedWorkout === workout.id && (
                      <Badge variant="success">✓</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{workout.durationMinutes} mins</span>
                    </div>
                    <Badge variant="primary">{workout.type}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-foreground">Schedule (Optional)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-3 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Time</label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-4 py-3 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <h3 className="text-foreground mb-6">Assignment Summary</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Difficulty Level</label>
                <div className="flex gap-2">
                  {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                        difficulty === level
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trainee:</span>
                  <span className="text-foreground">
                    {selectedTrainee
                      ? trainees.find((t) => t.id === selectedTrainee)?.name
                      : 'Not selected'}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Workout:</span>
                  <span className="text-foreground">
                    {selectedWorkout
                      ? workouts.find((w) => w.id === selectedWorkout)?.name
                      : 'Not selected'}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge variant="primary">{difficulty}</Badge>
                </div>

                {scheduledDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scheduled:</span>
                    <span className="text-foreground">
                      {scheduledDate} {scheduledTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {(!selectedTrainee || !selectedWorkout) && (
              <div className="bg-accent/50 border border-border rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Please select both a trainee and a workout to proceed
                </p>
              </div>
            )}

            <Button
              variant="primary"
              className="w-full"
              onClick={handleAssign}
              disabled={assignWorkout.isPending || !selectedTrainee || !selectedWorkout}
            >
              {assignWorkout.isPending ? 'Assigning...' : 'Assign Workout'}
            </Button>
            {assignWorkout.isError && <p role="alert" className="mt-3 text-sm text-destructive">{assignWorkout.error.message}</p>}
          </Card>
        </div>
      </div>
    </div>
  );
}
