<?php

namespace App\Http\Requests\V1;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            'email'=> 'required|email|unique:users,email',
            'password'=> [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ],
        ];
    }
}
