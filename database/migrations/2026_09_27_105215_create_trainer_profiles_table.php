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
        Schema::create('trainer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('title')->default('Personal Trainer');
            $table->json('bio')->nullable();
            $table->json('specializations')->nullable();
            $table->unsignedSmallInteger('years_experience')->default(0);
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->boolean('is_verified')->default(false);
            $table->string('tier')->default('Standard');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainer_profiles');
    }
};
