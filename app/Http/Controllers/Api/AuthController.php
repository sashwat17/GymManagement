<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\Certification;
use App\Models\TraineeProfile;
use App\Models\TrainerProfile;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->string('email'))->first();

        if (! $user || ! Hash::check($request->string('password'), $user->password) || $user->role !== $request->string('role')) {
            return response()->json(['message' => 'The provided credentials are invalid.'], 422);
        }

        return response()->json(['user' => $this->userPayload($user), 'token' => $user->createToken('frontend')->plainTextToken]);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->string('fullName'),
            'email' => $request->string('email'),
            'password' => Hash::make($request->string('password')),
            'role' => $request->string('role'),
            'phone' => $request->string('phone'),
            'location' => $request->string('location'),
            'avatar_emoji' => $request->string('role') === 'trainer' ? '🏋️' : '💪',
        ]);

        if ($user->role === 'trainer') {
            $profile = TrainerProfile::create([
                'user_id' => $user->id,
                'specializations' => $request->filled('specialization') ? [$request->string('specialization')] : [],
                'years_experience' => (int) $request->input('experience', 0),
            ]);

            if ($request->filled('certification')) {
                Certification::create(['trainer_profile_id' => $profile->id, 'name' => $request->string('certification'), 'issuer' => 'User supplied', 'issued_year' => now()->year, 'valid_until_year' => now()->year + 1]);
            }
        } else {
            TraineeProfile::create(['user_id' => $user->id, 'subscription_renews_on' => now()->addDays(30)]);
        }

        return response()->json(['user' => $this->userPayload($user->fresh()), 'token' => $user->createToken('frontend')->plainTextToken], 201);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($this->userPayload($request->user()));
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out.']);
    }

    private function userPayload(User $user): array
    {
        return ['id' => (string) $user->id, 'fullName' => $user->name, 'email' => $user->email, 'role' => $user->role, 'avatarEmoji' => $user->avatar_emoji];
    }
}
