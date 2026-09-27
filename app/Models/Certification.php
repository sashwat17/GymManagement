<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = ['trainer_profile_id', 'name', 'issuer', 'issued_year', 'valid_until_year', 'status'];

    public function trainerProfile()
    {
        return $this->belongsTo(TrainerProfile::class);
    }
}
