<?php

namespace App\Http\Requests;

use App\Models\Location;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class GetValidParentLocationsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // For now, let's allow all authorized users to access this route
        return Auth::check();
    }

    public function rules()
    {
        return [
            'locationId' => [
                'nullable',
                'integer',
                function ($attribute, $value, $fail) {
                    if (!Location::where('id', $value)->where('user_id', Auth::id())->exists()) {
                        $fail('The location does not belong to the authenticated user.');
                    }
                }
            ]

        ];
    }

    public function messages()
    {
        return [
            'locationId.integer' => 'The location ID must be a valid integer.',
            'locationId.exists' => 'The specified location does not exist.',
        ];
    }
}
