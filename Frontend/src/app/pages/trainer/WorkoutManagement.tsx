import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Dumbbell, Star, Edit, Trash2, Plus, Clock } from 'lucide-react';
import { useCreateWorkout, useDeleteWorkout, useUpdateWorkout, useWorkouts } from '../../hooks/useWorkouts';
import type { CreateWorkoutPayload, Workout, WorkoutType, DifficultyLevel } from '../../types/workout';

export function WorkoutManagement() {
  const [selectedType, setSelectedType] = React.useState('All');
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<CreateWorkoutPayload>({
    name: '',
    description: '',
    difficulty: 'Beginner',
    type: 'Strength',
    durationMinutes: 30,
    calories: 200,
  });
  const workoutsQuery = useWorkouts({ type: selectedType === 'All' ? undefined : selectedType as WorkoutType });
  const createWorkout = useCreateWorkout();
  const updateWorkout = useUpdateWorkout();
  const deleteWorkout = useDeleteWorkout();
  const workouts = workoutsQuery.data ?? [];
  const mutationError = createWorkout.error ?? updateWorkout.error ?? deleteWorkout.error;

  const startCreate = () => {
    setEditingId(null);
    setDraft({ name: '', description: '', difficulty: 'Beginner', type: 'Strength', durationMinutes: 30, calories: 200 });
    setIsFormOpen(true);
  };

  const startEdit = (workout: Workout) => {
    setEditingId(workout.id);
    setDraft({
      name: workout.name,
      description: workout.description,
      difficulty: workout.difficulty,
      type: workout.type,
      durationMinutes: workout.durationMinutes,
      calories: workout.calories,
      imageUrl: workout.imageUrl,
    });
    setIsFormOpen(true);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateWorkout.mutateAsync({ id: editingId, payload: draft });
      } else {
        await createWorkout.mutateAsync(draft);
      }
      setIsFormOpen(false);
    } catch {
      // Mutation errors are shown with the form.
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this workout?')) return;
    try {
      await deleteWorkout.mutateAsync(id);
    } catch {
      // Mutation errors are shown above the list.
    }
  };

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
        <Button variant="primary" className="flex items-center gap-2" onClick={startCreate}>
          <Plus className="w-4 h-4" />
          <span>Create Workout</span>
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
            <h2 className="md:col-span-2 text-foreground">{editingId ? 'Edit Workout' : 'Create Workout'}</h2>
            <label className="text-sm text-muted-foreground">Name
              <input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground" />
            </label>
            <label className="text-sm text-muted-foreground">Difficulty
              <select value={draft.difficulty} onChange={(event) => setDraft({ ...draft, difficulty: event.target.value as DifficultyLevel })} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label className="text-sm text-muted-foreground">Type
              <select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as WorkoutType })} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                {['Strength', 'Cardio', 'Core', 'Full Body', 'Flexibility'].map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label className="text-sm text-muted-foreground">Duration (minutes)
              <input required type="number" min="1" value={draft.durationMinutes} onChange={(event) => setDraft({ ...draft, durationMinutes: Number(event.target.value) })} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground" />
            </label>
            <label className="text-sm text-muted-foreground">Calories
              <input required type="number" min="0" value={draft.calories} onChange={(event) => setDraft({ ...draft, calories: Number(event.target.value) })} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground" />
            </label>
            <label className="md:col-span-2 text-sm text-muted-foreground">Description
              <textarea required value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="mt-1 w-full min-h-20 px-3 py-2 bg-input border border-border rounded-lg text-foreground" />
            </label>
            <label className="md:col-span-2 text-sm text-muted-foreground">Image URL (optional)
              <input type="url" value={draft.imageUrl ?? ''} onChange={(event) => setDraft({ ...draft, imageUrl: event.target.value })} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground" />
            </label>
            {mutationError && <p role="alert" className="md:col-span-2 text-sm text-destructive">{mutationError.message}</p>}
            <div className="md:col-span-2 flex gap-3">
              <Button type="submit" disabled={createWorkout.isPending || updateWorkout.isPending}>
                {createWorkout.isPending || updateWorkout.isPending ? 'Saving...' : 'Save Workout'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

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

      {workoutsQuery.isLoading && <p className="text-muted-foreground">Loading workouts...</p>}
      {workoutsQuery.isError && <p role="alert" className="text-destructive">{workoutsQuery.error.message}</p>}
      {mutationError && !isFormOpen && <p role="alert" className="text-destructive">{mutationError.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
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
                  <span>{workout.durationMinutes} mins</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="text-foreground">{workout.assignedToCount} trainees</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2" onClick={() => startEdit(workout)}>
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Button>
              <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2" onClick={() => handleDelete(workout.id)} disabled={deleteWorkout.isPending}>
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!workoutsQuery.isLoading && !workoutsQuery.isError && workouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workouts found for this category</p>
        </div>
      )}
    </div>
  );
}
