<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $profileRules = $this->user()->role === 'trainer'
            ? [
                'specialization' => ['nullable', 'string', 'max:255'],
                'certification' => ['nullable', 'string', 'max:255'],
                'experience_years' => ['nullable', 'integer', 'between:0,60'],
            ]
            : [
                'height_cm' => ['nullable', 'integer', 'between:100,250'],
                'weight_kg' => ['nullable', 'numeric', 'between:30,350'],
                'fitness_goal' => ['nullable', 'string', 'max:255'],
            ];

        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['nullable', 'string', 'max:40'],
            'location' => ['nullable', 'string', 'max:255'],
        ] + $profileRules;
    }
}
