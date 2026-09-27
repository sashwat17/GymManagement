<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainerProfile extends Model
{
    protected $fillable = ['user_id', 'title', 'bio', 'specializations', 'years_experience', 'average_rating', 'is_verified', 'tier'];

    protected function casts(): array
    {
        return ['bio' => 'array', 'specializations' => 'array', 'average_rating' => 'float', 'is_verified' => 'boolean'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }
}
