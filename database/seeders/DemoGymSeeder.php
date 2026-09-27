<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\TraineeProfile;
use App\Models\TrainerProfile;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Database\Seeder;

class DemoGymSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainer = User::updateOrCreate(['email' => 'trainer@example.com'], ['name' => 'Demo Trainer', 'password' => 'password123', 'role' => 'trainer', 'phone' => '555-0101', 'location' => 'New York', 'avatar_emoji' => '🏋️']);
        $trainerProfile = TrainerProfile::updateOrCreate(['user_id' => $trainer->id], ['title' => 'Strength & Conditioning Coach', 'bio' => ['Helping members build sustainable strength.', 'Certified for performance-focused training.'], 'specializations' => ['Strength Training', 'HIIT'], 'years_experience' => 8, 'average_rating' => 4.8, 'is_verified' => true, 'tier' => 'Elite']);
        $trainerProfile->certifications()->updateOrCreate(['name' => 'Certified Personal Trainer'], ['issuer' => 'NASM', 'issued_year' => 2020, 'valid_until_year' => 2027, 'status' => 'Active']);

        $trainee = User::updateOrCreate(['email' => 'trainee@example.com'], ['name' => 'Demo Trainee', 'password' => 'password123', 'role' => 'trainee', 'phone' => '555-0102', 'location' => 'New York', 'avatar_emoji' => '💪']);
        TraineeProfile::updateOrCreate(['user_id' => $trainee->id], ['membership_tier' => 'Premium', 'height' => 178, 'weight' => 76, 'age' => 28, 'fitness_goal' => 'Build strength', 'subscription_status' => 'active', 'subscription_days_remaining' => 24, 'subscription_total_days' => 30, 'subscription_renews_on' => now()->addDays(24), 'total_workouts' => 18, 'calories_burned' => 5400, 'hours_trained' => 24, 'attendance_rate' => 86]);

        $workout = Workout::updateOrCreate(['trainer_id' => $trainer->id, 'name' => 'Full Body Foundation'], ['description' => 'A balanced session covering the major movement patterns.', 'difficulty' => 'Beginner', 'type' => 'Full Body', 'rating' => 4.8, 'duration_minutes' => 45, 'calories' => 320]);
        Notification::updateOrCreate(['user_id' => $trainee->id, 'title' => 'Workout reminder'], ['role' => 'trainee', 'type' => 'workout_reminder', 'message' => 'Your Full Body Foundation session is ready.', 'is_unread' => true]);
        Notification::updateOrCreate(['user_id' => $trainer->id, 'title' => 'New trainee activity'], ['role' => 'trainer', 'type' => 'activity', 'message' => 'Demo Trainee completed a workout.', 'is_unread' => true]);

        $workout->assignments()->updateOrCreate(['trainee_id' => $trainee->id], ['difficulty' => 'Medium', 'scheduled_date' => now()->addDay()->toDateString(), 'scheduled_time' => '08:00', 'status' => 'scheduled']);
    }
}
