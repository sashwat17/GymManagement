<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json($this->items($request->user()));
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
        return response()->json(Notification::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $notification = Notification::where('user_id', $request->user()->id)->findOrFail($id);
        $notification->update(['is_unread' => false]);

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        return response()->json(null, 204);
    }

    public function markAllRead(Request $request): JsonResponse
    {
        Notification::where('user_id', $request->user()->id)->update(['is_unread' => false]);

        return response()->json(null, 204);
    }

    public function trainer(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'trainer', 403);

        return response()->json($this->items($request->user()));
    }

    private function items($user)
    {
        return Notification::where('user_id', $user->id)->latest()->get()->map(fn (Notification $notification) => ['id' => (string) $notification->id, 'type' => $notification->type, 'title' => $notification->title, 'message' => $notification->message, 'createdAt' => $notification->created_at->toISOString(), 'isUnread' => $notification->is_unread]);
    }
}
