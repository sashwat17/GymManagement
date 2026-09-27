import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Dumbbell, Star, Edit, Trash2, Plus, Clock } from 'lucide-react';

interface Workout {
  id: number;
  name: string;
  difficulty: string;
  duration: string;
  type: string;
  rating: number;
  assignedTo: number;
  description: string;
}

const workouts: Workout[] = [
  {
    id: 1,
    name: 'Upper Body Strength',
    difficulty: 'Intermediate',
    duration: '45 mins',
    type: 'Strength',
    rating: 4.8,
    assignedTo: 12,
    description: 'Focus on chest, back, shoulders, and arms',
  },
  {
    id: 2,
    name: 'HIIT Cardio Blast',
    difficulty: 'Advanced',
    duration: '30 mins',
    type: 'Cardio',
    rating: 4.9,
    assignedTo: 18,
    description: 'High-intensity interval training for maximum calorie burn',
  },
  {
    id: 3,
    name: 'Core & Abs Burner',
    difficulty: 'Beginner',
    duration: '20 mins',
    type: 'Core',
    rating: 4.6,
    assignedTo: 15,
    description: 'Strengthen your core with targeted exercises',
  },
  {
    id: 4,
    name: 'Full Body Circuit',
    difficulty: 'Intermediate',
    duration: '60 mins',
    type: 'Full Body',
    rating: 4.7,
    assignedTo: 10,
    description: 'Complete workout targeting all major muscle groups',
  },
  {
    id: 5,
    name: 'Leg Day Power',
    difficulty: 'Advanced',
    duration: '50 mins',
    type: 'Strength',
    rating: 4.5,
    assignedTo: 8,
    description: 'Build lower body strength and power',
  },
  {
    id: 6,
    name: 'Yoga Flow',
    difficulty: 'Beginner',
    duration: '40 mins',
    type: 'Flexibility',
    rating: 4.8,
    assignedTo: 20,
    description: 'Gentle yoga flow for flexibility and relaxation',
  },
];

export function WorkoutManagement() {
  const [selectedType, setSelectedType] = React.useState('All');

  const filteredWorkouts = workouts.filter(
    (workout) => selectedType === 'All' || workout.type === selectedType
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'primary';
      default:
        return 'primary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Workout Management</h1>
          <p className="text-muted-foreground">Create and manage your workout programs</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create Workout</span>
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Strength', 'Cardio', 'Core', 'Full Body', 'Flexibility'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1">{workout.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm text-foreground">{workout.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{workout.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Difficulty:</span>
                <Badge variant={getDifficultyColor(workout.difficulty)}>
                  {workout.difficulty}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="primary">{workout.type}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <div className="flex items-center gap-1 text-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{workout.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="text-foreground">{workout.assignedTo} trainees</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
              <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workouts found for this category</p>
        </div>
      )}
    </div>
  );
}
