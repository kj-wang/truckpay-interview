<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkStoreChartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        return $user != null && $user->tokenCan('doctor:create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            '*.patientId' => ['required', 'integer'],
            '*.prescriptions'=> ['required', 'numeric'],
            '*.treatable'=> ['required', Rule::in(['Y', 'N'])],
            '*.visitDate'=> ['required', 'date_format:Y-m-d H:i:s'],
        ];
    }

    function prepareForValidation() {
        $data = [];

        foreach ($this->toArray() as $obj) {
            $obj['patient_id'] = $obj['patientId'] ?? null;
            $obj['visit_date'] = $obj['visitDate'] ?? null;

            $data[] = $obj;
        }

        $this->merge($data);
    }
}
