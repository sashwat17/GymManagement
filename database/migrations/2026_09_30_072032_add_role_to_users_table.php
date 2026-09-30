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
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('trainee');
            }

            if (! Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->nullable();
            }

            if (! Schema::hasColumn('users', 'location')) {
                $table->string('location')->nullable();
            }

            if (! Schema::hasColumn('users', 'height_cm')) {
                $table->unsignedSmallInteger('height_cm')->nullable();
            }

            if (! Schema::hasColumn('users', 'weight_kg')) {
                $table->decimal('weight_kg', 5, 2)->nullable();
            }

            if (! Schema::hasColumn('users', 'fitness_goal')) {
                $table->string('fitness_goal')->nullable();
            }

            if (! Schema::hasColumn('users', 'specialization')) {
                $table->string('specialization')->nullable();
            }

            if (! Schema::hasColumn('users', 'certification')) {
                $table->string('certification')->nullable();
            }

            if (! Schema::hasColumn('users', 'experience_years')) {
                $table->unsignedSmallInteger('experience_years')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $columns = array_filter([
                'role',
                'phone',
                'location',
                'height_cm',
                'weight_kg',
                'fitness_goal',
                'specialization',
                'certification',
                'experience_years',
            ], fn (string $column): bool => Schema::hasColumn('users', $column));

            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }
};
