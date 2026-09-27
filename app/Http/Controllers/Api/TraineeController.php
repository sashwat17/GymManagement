<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TraineeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);
        $query = User::where('role', 'trainee')->with('traineeProfile');
        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->string('search').'%');
        }
        if ($request->filled('level')) {
            $query->whereHas('traineeProfile', fn ($profile) => $profile->where('fitness_goal', $request->string('level')));
        }

        return response()->json($query->get()->map(fn (User $user) => $this->summary($user)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Not supported.'], 405);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);

        return response()->json($this->summary(User::where('role', 'trainee')->with('traineeProfile')->findOrFail($id)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        abort_unless($request->user()->id === (int) $id, 403);
        $profile = $request->user()->traineeProfile()->firstOrFail();
        $data = $request->validate(['height' => ['sometimes', 'numeric', 'min:1'], 'weight' => ['sometimes', 'numeric', 'min:1'], 'age' => ['sometimes', 'integer', 'min:1', 'max:120'], 'fitnessGoal' => ['sometimes', 'string', 'max:255']]);
        $profile->update(array_filter(['height' => $data['height'] ?? null, 'weight' => $data['weight'] ?? null, 'age' => $data['age'] ?? null, 'fitness_goal' => $data['fitnessGoal'] ?? null], fn ($value) => $value !== null));

        return response()->json($this->profilePayload($request->user()->fresh()->load('traineeProfile')));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        return response()->json(null, 204);
    }

    public function options(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);

        return response()->json(User::where('role', 'trainee')->with('traineeProfile')->get()->map(fn (User $user) => ['id' => (string) $user->id, 'name' => $user->name, 'level' => $this->level($user)]));
    }

    public function me(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainee', 403);

        return response()->json($this->profilePayload($request->user()->load('traineeProfile')));
    }

    private function summary(User $user): array
    {
        $profile = $user->traineeProfile;

        return ['id' => (string) $user->id, 'name' => $user->name, 'avatarEmoji' => $user->avatar_emoji ?? '💪', 'level' => $this->level($user), 'progress' => $profile?->attendance_rate ?? 0, 'lastActivityLabel' => 'Recently', 'workoutsCompleted' => $profile?->total_workouts ?? 0, 'totalWorkouts' => $profile?->total_workouts ?? 0];
    }

    private function level(User $user): string
    {
        return match (true) {
            ($user->traineeProfile?->total_workouts ?? 0) >= 20 => 'Advanced', ($user->traineeProfile?->total_workouts ?? 0) >= 5 => 'Intermediate', default => 'Beginner'
        };
    }

    private function profilePayload(User $user): array
    {
        $profile = $user->traineeProfile;

        return ['id' => (string) $user->id, 'fullName' => $user->name, 'email' => $user->email, 'avatarEmoji' => $user->avatar_emoji, 'membershipTier' => $profile->membership_tier, 'height' => (float) $profile->height, 'weight' => (float) $profile->weight, 'age' => (int) $profile->age, 'fitnessGoal' => $profile->fitness_goal ?? '', 'subscription' => ['status' => $profile->subscription_status, 'daysRemaining' => $profile->subscription_days_remaining, 'totalDays' => $profile->subscription_total_days, 'renewsOn' => $profile->subscription_renews_on?->toDateString()], 'stats' => ['totalWorkouts' => $profile->total_workouts, 'caloriesBurned' => $profile->calories_burned, 'hoursTrained' => $profile->hours_trained, 'attendanceRate' => $profile->attendance_rate]];
    }
}
