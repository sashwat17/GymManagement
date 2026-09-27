import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Star, Filter, Clock, Flame } from 'lucide-react';
import { useWorkouts } from '../hooks/useWorkouts';
import type { DifficultyLevel } from '../types/workout';

export function Workouts() {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('All');
  const [selectedRating, setSelectedRating] = React.useState<number>(0);
  const workoutsQuery = useWorkouts({
    difficulty: selectedDifficulty === 'All' ? undefined : selectedDifficulty as DifficultyLevel,
    minRating: selectedRating || undefined,
  });
  const workouts = workoutsQuery.data ?? [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Workout Programs</h1>
          <p className="text-muted-foreground">Choose your next challenge</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-foreground">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Difficulty Level</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedDifficulty === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Minimum Rating</label>
            <div className="flex flex-wrap gap-2">
              {[0, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1 ${
                    selectedRating === rating
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+`}
                  {rating > 0 && <Star className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutsQuery.isLoading && <p className="text-muted-foreground">Loading workouts...</p>}
        {workoutsQuery.isError && <p role="alert" className="text-destructive">{workoutsQuery.error.message}</p>}
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <div
              className="relative h-40 rounded-lg mb-4 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: workout.imageUrl ? `url(${workout.imageUrl})` : undefined }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d3d3d]/70 to-transparent" />
              <Badge
                variant={getDifficultyColor(workout.difficulty)}
                className="absolute top-3 right-3"
              >
                {workout.difficulty}
              </Badge>
            </div>

            <h3 className="text-foreground mb-2">{workout.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">with {workout.trainer.name}</p>

            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-[#d4a574]" style={{ color: '#d4a574' }} />
              <span className="text-sm text-foreground">{workout.rating}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {workout.durationMinutes} mins
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-secondary" />
                {workout.calories} kcal
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Start Workout
            </Button>
          </Card>
        ))}
      </div>

      {!workoutsQuery.isLoading && !workoutsQuery.isError && workouts.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No workouts found matching your filters.</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setSelectedDifficulty('All');
                setSelectedRating(0);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
