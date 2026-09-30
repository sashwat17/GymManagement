<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    if ($request->user()) {
        return to_route('dashboard');
    }

    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        if ($request->user()->role === 'trainer') {
            return to_route('trainer.dashboard');
        }

        return Inertia::render('gym/index', ['section' => 'dashboard']);
    })->name('dashboard');

    Route::middleware('role:trainee')->group(function () {
        Route::get('workouts', fn () => Inertia::render('gym/index', ['section' => 'workouts']))->name('workouts');
        Route::get('profile', fn () => Inertia::render('gym/index', ['section' => 'profile']))->name('gym.profile');
        Route::get('notifications', fn () => Inertia::render('gym/index', ['section' => 'notifications']))->name('notifications');
    });

    Route::prefix('trainer')->name('trainer.')->middleware('role:trainer')->group(function () {
        Route::get('/', fn () => Inertia::render('gym/index', ['section' => 'trainer-dashboard']))->name('dashboard');
        Route::get('trainees', fn () => Inertia::render('gym/index', ['section' => 'trainees']))->name('trainees');
        Route::get('assign', fn () => Inertia::render('gym/index', ['section' => 'assignment']))->name('assign');
        Route::get('workouts', fn () => Inertia::render('gym/index', ['section' => 'trainer-workouts']))->name('workouts');
        Route::get('profile', fn () => Inertia::render('gym/index', ['section' => 'trainer-profile']))->name('profile');
        Route::get('notifications', fn () => Inertia::render('gym/index', ['section' => 'trainer-notifications']))->name('notifications');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
