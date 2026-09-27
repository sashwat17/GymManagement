<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(RefreshDatabase::class);

test('trainees can register and use the frontend API', function () {
    /** @var TestCase $this */
    $registration = $this->postJson('/api/auth/register', [
        'fullName' => 'Trainee User',
        'email' => 'trainee@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'phone' => '555-0100',
        'location' => 'New York',
        'role' => 'trainee',
    ]);

    $registration->assertCreated()->assertJsonPath('user.role', 'trainee')->assertJsonStructure(['user', 'token']);

    $token = $registration->json('token');

    $this->withHeader('Authorization', 'Bearer '.$token)
        ->getJson('/api/auth/me')
        ->assertOk()
        ->assertJsonPath('email', 'trainee@example.com');
});

test('trainers can create workouts and assign them to trainees', function () {
    /** @var TestCase $this */
    $trainer = User::factory()->create(['role' => 'trainer']);
    $trainee = User::factory()->create(['role' => 'trainee']);
    $trainer->trainerProfile()->create();
    $trainee->traineeProfile()->create();

    $token = $trainer->createToken('test')->plainTextToken;
    $headers = ['Authorization' => 'Bearer '.$token];

    $workout = $this->withHeaders($headers)->postJson('/api/workouts', [
        'name' => 'Morning Strength',
        'description' => 'A full body strength session.',
        'difficulty' => 'Beginner',
        'type' => 'Strength',
        'durationMinutes' => 45,
        'calories' => 300,
    ]);

    $workout->assertCreated()->assertJsonPath('name', 'Morning Strength');

    $this->withHeaders($headers)->postJson('/api/workout-assignments', [
        'traineeId' => (string) $trainee->id,
        'workoutId' => $workout->json('id'),
        'difficulty' => 'Medium',
        'scheduledDate' => '2026-10-01',
        'scheduledTime' => '08:30',
    ])->assertCreated()->assertJsonPath('status', 'scheduled');

    $this->withHeaders($headers)->getJson('/api/workouts')->assertOk()->assertJsonCount(1);
});
