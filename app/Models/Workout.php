<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    protected $fillable = ['trainer_id', 'name', 'description', 'difficulty', 'type', 'rating', 'duration_minutes', 'calories', 'image_url'];

    protected function casts(): array
    {
        return ['rating' => 'float'];
    }

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }

    public function assignments()
    {
        return $this->hasMany(WorkoutAssignment::class);
    }
}
