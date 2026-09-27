import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Star, Filter, Clock, Flame } from 'lucide-react';
import { Workout } from '../types/workout';

const workouts: Workout[] = [
  {
    id: 1,
    name: 'Full Body HIIT',
    trainer: 'Sarah Johnson',
    difficulty: 'Advanced',
    rating: 4.8,
    duration: '45 mins',
    calories: '450 kcal',
    image: 'https://images.unsplash.com/photo-1734630341082-0fec0e10126c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwd29ya291dCUyMGRhcmt8ZW58MXx8fHwxNzc1MDYwMTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 2,
    name: 'Upper Body Strength',
    trainer: 'Mike Chen',
    difficulty: 'Intermediate',
    rating: 4.6,
    duration: '50 mins',
    calories: '380 kcal',
    image: 'https://images.unsplash.com/photo-1693214674451-d6bd02e642d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxneW0lMjBmaXRuZXNzJTIwd29ya291dCUyMGRhcmt8ZW58MXx8fHwxNzc1MDYwMTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 3,
    name: 'Core & Abs Blast',
    trainer: 'Emma Davis',
    difficulty: 'Beginner',
    rating: 4.9,
    duration: '30 mins',
    calories: '220 kcal',
    image: 'https://images.unsplash.com/photo-1628935291759-bbaf33a66dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxneW0lMjBmaXRuZXNzJTIwd29ya291dCUyMGRhcmt8ZW58MXx8fHwxNzc1MDYwMTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 4,
    name: 'Leg Day Power',
    trainer: 'John Smith',
    difficulty: 'Advanced',
    rating: 4.7,
    duration: '60 mins',
    calories: '520 kcal',
    image: 'https://images.unsplash.com/photo-1693214674477-1159bddf1598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxneW0lMjBmaXRuZXNzJTIwd29ya291dCUyMGRhcmt8ZW58MXx8fHwxNzc1MDYwMTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 5,
    name: 'Cardio Conditioning',
    trainer: 'Lisa Anderson',
    difficulty: 'Intermediate',
    rating: 4.5,
    duration: '40 mins',
    calories: '400 kcal',
    image: 'https://images.unsplash.com/photo-1603665409265-bdc00027c217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxneW0lMjBmaXRuZXNzJTIwd29ya291dCUyMGRhcmt8ZW58MXx8fHwxNzc1MDYwMTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 6,
    name: 'Yoga Flow',
    trainer: 'Rachel Green',
    difficulty: 'Beginner',
    rating: 5.0,
    duration: '35 mins',
    calories: '180 kcal',
    image: 'https://images.unsplash.com/photo-1626337920103-ae64b9c688e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxneW0lMjBmaXRuZXNzJTIwd29ya291dCUyMGRhcmt8ZW58MXx8fHwxNzc1MDYwMTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

export function Workouts() {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('All');
  const [selectedRating, setSelectedRating] = React.useState<number>(0);

  const filteredWorkouts = workouts.filter((workout) => {
    const difficultyMatch = selectedDifficulty === 'All' || workout.difficulty === selectedDifficulty;
    const ratingMatch = selectedRating === 0 || workout.rating >= selectedRating;
    return difficultyMatch && ratingMatch;
  });

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
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id}>
            <div
              className="relative h-40 rounded-lg mb-4 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${workout.image})` }}
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
            <p className="text-sm text-muted-foreground mb-3">with {workout.trainer}</p>

            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-[#d4a574]" style={{ color: '#d4a574' }} />
              <span className="text-sm text-foreground">{workout.rating}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {workout.duration}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-secondary" />
                {workout.calories}
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Start Workout
            </Button>
          </Card>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
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
