<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutAssignment extends Model
{
    protected $fillable = ['trainee_id', 'workout_id', 'difficulty', 'scheduled_date', 'scheduled_time', 'status'];

    protected function casts(): array
    {
        return ['scheduled_date' => 'date', 'scheduled_time' => 'datetime:H:i'];
    }

    public function trainee()
    {
        return $this->belongsTo(User::class, 'trainee_id');
    }

    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }
}
