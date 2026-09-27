<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrainerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json([]);
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
    public function show(string $id): JsonResponse
    {
        return response()->json($this->profile(User::with(['trainerProfile.certifications'])->findOrFail($id)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer' && $request->user()->id === (int) $id, 403);
        $data = $request->validate(['fullName' => ['sometimes', 'string', 'max:255'], 'phone' => ['sometimes', 'string', 'max:50'], 'location' => ['sometimes', 'string', 'max:255'], 'title' => ['sometimes', 'string', 'max:255'], 'bio' => ['sometimes', 'array'], 'specializations' => ['sometimes', 'array']]);
        $user = $request->user();
        $user->update(array_filter(['name' => $data['fullName'] ?? null, 'phone' => $data['phone'] ?? null, 'location' => $data['location'] ?? null], fn ($value) => $value !== null));
        $user->trainerProfile()->updateOrCreate([], array_filter(['title' => $data['title'] ?? null, 'bio' => $data['bio'] ?? null, 'specializations' => $data['specializations'] ?? null], fn ($value) => $value !== null));

        return response()->json($this->profile($user->fresh()->load('trainerProfile.certifications')));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        return response()->json(null, 204);
    }

    public function me(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);

        return response()->json($this->profile($request->user()->load('trainerProfile.certifications')));
    }

    public function updateMe(Request $request): JsonResponse
    {
        return $this->update($request, (string) $request->user()->id);
    }

    public function dashboard(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);
        $trainees = User::where('role', 'trainee')->with('traineeProfile')->get();

        return response()->json(['totalTrainees' => $trainees->count(), 'totalTraineesDeltaThisMonth' => 0, 'activeTrainees' => $trainees->where('traineeProfile.attendance_rate', '>', 0)->count(), 'activeRate' => $trainees->count() ? 100 : 0, 'workoutsAssignedThisWeek' => 0, 'todaysSessions' => 0, 'todaysSessionsCompleted' => 0, 'weeklySessions' => collect(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])->map(fn ($day) => ['day' => $day, 'sessions' => 0, 'completionRate' => 0])->values(), 'averageCompletionRate' => 0, 'recentActivity' => []]);
    }

    private function profile(User $user): array
    {
        $profile = $user->trainerProfile;

        return ['id' => (string) $user->id, 'fullName' => $user->name, 'email' => $user->email, 'phone' => $user->phone ?? '', 'location' => $user->location ?? '', 'title' => $profile?->title ?? 'Personal Trainer', 'bio' => $profile?->bio ?? [], 'specializations' => $profile?->specializations ?? [], 'yearsExperience' => $profile?->years_experience ?? 0, 'averageRating' => (float) ($profile?->average_rating ?? 0), 'isVerified' => (bool) ($profile?->is_verified ?? false), 'tier' => $profile?->tier ?? 'Standard', 'certifications' => $profile?->certifications?->map(fn ($cert) => ['id' => (string) $cert->id, 'name' => $cert->name, 'issuer' => $cert->issuer, 'issuedYear' => $cert->issued_year, 'validUntilYear' => $cert->valid_until_year, 'status' => $cert->status])->values() ?? []];
    }
}
