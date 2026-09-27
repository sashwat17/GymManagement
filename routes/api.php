<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\TraineeController;
use App\Http\Controllers\Api\TrainerController;
use App\Http\Controllers\Api\WorkoutController;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::get('workouts/activity', [WorkoutController::class, 'activity']);
    Route::post('workout-assignments', [WorkoutController::class, 'assign']);
    Route::apiResource('workouts', WorkoutController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::get('trainees/options', [TraineeController::class, 'options']);
    Route::get('trainees/me', [TraineeController::class, 'me']);
    Route::apiResource('trainees', TraineeController::class)->only(['index', 'show', 'update']);

    Route::get('trainer/me', [TrainerController::class, 'me']);
    Route::put('trainer/me', [TrainerController::class, 'updateMe']);
    Route::get('trainer/dashboard', [TrainerController::class, 'dashboard']);
    Route::get('trainer/notifications', [NotificationController::class, 'trainer']);

    Route::get('notifications', [NotificationController::class, 'index']);
    Route::patch('notifications/{notification}', [NotificationController::class, 'update']);
    Route::post('notifications/mark-all-read', [NotificationController::class, 'markAllRead']);
});
