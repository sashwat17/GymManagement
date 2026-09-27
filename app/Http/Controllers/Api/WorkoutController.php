<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use App\Models\WorkoutAssignment;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Workout::query()->with('trainer')->withCount('assignments');
        foreach (['difficulty', 'type'] as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->string($filter));
            }
        }
        if ($request->filled('minRating')) {
            $query->where('rating', '>=', $request->float('minRating'));
        }

        return response()->json($query->latest()->get()->map(fn (Workout $workout) => $this->payload($workout)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);
        $data = $request->validate($this->rules());
        $workout = $request->user()->workouts()->create($this->workoutData($data));

        return response()->json($this->payload($workout->load('trainer')), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        return response()->json($this->payload(Workout::with('trainer')->findOrFail($id)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);
        $workout = Workout::where('trainer_id', $request->user()->id)->findOrFail($id);
        $workout->update($this->workoutData($request->validate($this->rules(true))));

        return response()->json($this->payload($workout->fresh()->load('trainer')));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);
        Workout::where('trainer_id', $request->user()->id)->findOrFail($id)->delete();

        return response()->json(null, 204);
    }

    public function activity(Request $request): JsonResponse
    {
        $counts = WorkoutAssignment::where('trainee_id', $request->user()->id)->whereNotNull('scheduled_date')->get()->groupBy(fn ($assignment) => $assignment->scheduled_date->format('D'));

        return response()->json(collect(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])->map(fn ($day) => ['day' => $day, 'workouts' => $counts->get($day, collect())->count()])->values());
    }

    public function assign(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);
        $data = $request->validate(['traineeId' => ['required', 'exists:users,id'], 'workoutId' => ['required', 'exists:workouts,id'], 'difficulty' => ['required', 'in:Easy,Medium,Hard'], 'scheduledDate' => ['nullable', 'date'], 'scheduledTime' => ['nullable', 'date_format:H:i']]);
        $assignment = WorkoutAssignment::create(['trainee_id' => $data['traineeId'], 'workout_id' => $data['workoutId'], 'difficulty' => $data['difficulty'], 'scheduled_date' => $data['scheduledDate'] ?? null, 'scheduled_time' => $data['scheduledTime'] ?? null, 'status' => isset($data['scheduledDate']) ? 'scheduled' : 'pending']);

        return response()->json($this->assignmentPayload($assignment), 201);
    }

    private function rules(bool $sometimes = false): array
    {
        $prefix = $sometimes ? 'sometimes|' : '';

        return ['name' => [$prefix.'required', 'string', 'max:255'], 'description' => [$prefix.'required', 'string'], 'difficulty' => [$prefix.'required', Rule::in(['Beginner', 'Intermediate', 'Advanced'])], 'type' => [$prefix.'required', Rule::in(['Strength', 'Cardio', 'Core', 'Full Body', 'Flexibility'])], 'durationMinutes' => [$prefix.'required', 'integer', 'min:1'], 'calories' => [$prefix.'required', 'integer', 'min:0'], 'imageUrl' => [$prefix.'nullable', 'url']];
    }

    private function payload(Workout $workout): array
    {
        return ['id' => (string) $workout->id, 'name' => $workout->name, 'description' => $workout->description, 'trainer' => ['id' => (string) $workout->trainer->id, 'name' => $workout->trainer->name], 'difficulty' => $workout->difficulty, 'type' => $workout->type, 'rating' => (float) $workout->rating, 'durationMinutes' => $workout->duration_minutes, 'calories' => $workout->calories, 'imageUrl' => $workout->image_url ?? '', 'assignedToCount' => $workout->assignments_count ?? $workout->assignments()->count()];
    }

    private function assignmentPayload(WorkoutAssignment $assignment): array
    {
        return ['id' => (string) $assignment->id, 'traineeId' => (string) $assignment->trainee_id, 'workoutId' => (string) $assignment->workout_id, 'difficulty' => $assignment->difficulty, 'scheduledDate' => $assignment->scheduled_date ? Carbon::parse($assignment->scheduled_date)->format('Y-m-d') : null, 'scheduledTime' => $assignment->scheduled_time ? Carbon::parse($assignment->scheduled_time)->format('H:i') : null, 'status' => $assignment->status];
    }

    private function workoutData(array $data): array
    {
        return ['name' => $data['name'], 'description' => $data['description'], 'difficulty' => $data['difficulty'], 'type' => $data['type'], 'duration_minutes' => $data['durationMinutes'], 'calories' => $data['calories'], 'image_url' => $data['imageUrl'] ?? null];
    }
}
