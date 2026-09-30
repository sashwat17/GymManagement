<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('trainee dashboard is served as an inertia page', function () {
    $this->actingAs(User::factory()->create())
        ->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('gym/index')
            ->where('section', 'dashboard'));
});

test('trainees cannot access trainer pages', function () {
    $this->actingAs(User::factory()->create())
        ->get('/trainer')
        ->assertForbidden();
});

test('provisioned trainers can access the trainer dashboard', function () {
    $trainer = User::factory()->create(['role' => 'trainer']);

    $this->actingAs($trainer)
        ->get('/trainer')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('gym/index')
            ->where('section', 'trainer-dashboard'));
});

test('registration creates a trainee account when the trainee role is selected', function () {
    $this->post('/register', [
        'name' => 'New Member',
        'email' => 'new-member@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'trainee',
    ])->assertRedirect('/dashboard');

    expect(User::where('email', 'new-member@example.com')->value('role'))->toBe('trainee');
});

test('registration creates a trainer account when the trainer role is selected', function () {
    $this->post('/register', [
        'name' => 'New Coach',
        'email' => 'new-coach@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'trainer',
        'specialization' => 'Strength and conditioning',
        'certification' => 'Certified personal trainer',
        'experience_years' => 6,
    ])->assertRedirect('/dashboard');

    $trainer = User::where('email', 'new-coach@example.com')->firstOrFail();

    expect($trainer->role)->toBe('trainer')
        ->and($trainer->specialization)->toBe('Strength and conditioning')
        ->and($trainer->certification)->toBe('Certified personal trainer')
        ->and($trainer->experience_years)->toBe(6);
});

test('trainees can update their profile and fitness details', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->patch('/settings/profile', [
        'name' => $user->name,
        'email' => $user->email,
        'phone' => '555-0100',
        'location' => 'Downtown',
        'height_cm' => 172,
        'weight_kg' => 68.5,
        'fitness_goal' => 'Build strength',
    ])->assertRedirect();

    $user->refresh();

    expect($user->phone)->toBe('555-0100')
        ->and($user->height_cm)->toBe(172)
        ->and((float) $user->weight_kg)->toBe(68.5)
        ->and($user->fitness_goal)->toBe('Build strength');
});
