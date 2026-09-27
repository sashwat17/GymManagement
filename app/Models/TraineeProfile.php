<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TraineeProfile extends Model
{
    protected $fillable = ['user_id', 'membership_tier', 'height', 'weight', 'age', 'fitness_goal', 'subscription_status', 'subscription_days_remaining', 'subscription_total_days', 'subscription_renews_on', 'total_workouts', 'calories_burned', 'hours_trained', 'attendance_rate'];

    protected function casts(): array
    {
        return ['height' => 'float', 'weight' => 'float', 'subscription_renews_on' => 'date'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
