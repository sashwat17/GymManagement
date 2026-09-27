<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trainee_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('membership_tier')->default('Free');
            $table->decimal('height', 5, 2)->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->unsignedTinyInteger('age')->nullable();
            $table->string('fitness_goal')->nullable();
            $table->string('subscription_status')->default('active');
            $table->unsignedInteger('subscription_days_remaining')->default(30);
            $table->unsignedInteger('subscription_total_days')->default(30);
            $table->date('subscription_renews_on')->nullable();
            $table->unsignedInteger('total_workouts')->default(0);
            $table->unsignedInteger('calories_burned')->default(0);
            $table->unsignedInteger('hours_trained')->default(0);
            $table->unsignedTinyInteger('attendance_rate')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainee_profiles');
    }
};
