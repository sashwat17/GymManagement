import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Calendar, Clock, Dumbbell, User, AlertCircle } from 'lucide-react';

export function WorkoutAssignment() {
  const [selectedTrainee, setSelectedTrainee] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const trainees = [
    { id: '1', name: 'Alex Johnson', level: 'Intermediate' },
    { id: '2', name: 'Michelle Davis', level: 'Beginner' },
    { id: '3', name: 'Robert Chen', level: 'Advanced' },
    { id: '4', name: 'Emily Watson', level: 'Intermediate' },
    { id: '5', name: 'David Park', level: 'Beginner' },
  ];

  const workouts = [
    { id: '1', name: 'Upper Body Strength', duration: '45 mins', type: 'Strength' },
    { id: '2', name: 'HIIT Cardio Blast', duration: '30 mins', type: 'Cardio' },
    { id: '3', name: 'Core & Abs Burner', duration: '20 mins', type: 'Core' },
    { id: '4', name: 'Full Body Circuit', duration: '60 mins', type: 'Full Body' },
    { id: '5', name: 'Leg Day Power', duration: '50 mins', type: 'Strength' },
    { id: '6', name: 'Yoga Flow', duration: '40 mins', type: 'Flexibility' },
  ];

  const handleAssign = () => {
    if (!selectedTrainee || !selectedWorkout) {
      alert('Please select both a trainee and a workout');
      return;
    }
    alert('Workout assigned successfully!');
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
                      <span>{workout.duration}</span>
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
                  {['Easy', 'Medium', 'Hard'].map((level) => (
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
            >
              Assign Workout
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
