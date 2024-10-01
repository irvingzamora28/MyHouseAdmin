<?php

namespace App\Http\Requests;

use App\Models\Location;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreLocationRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'parent_id' => [
                'nullable',
                'exists:locations,id',
                function ($attribute, $value, $fail) {
                    if (!is_null($value)) {
                        // Check if the parent location belongs to the current user
                        if (!Location::where('id', $value)->where('user_id', Auth::id())->exists()) {
                            $fail('The selected parent location does not belong to the authenticated user.');
                        }
                    }
                },
            ],
            'description' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'A location name is required.',
            'parent_id.exists' => 'The selected parent location does not exist.',
        ];
    }
}
