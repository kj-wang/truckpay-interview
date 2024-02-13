<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkStoreInvoiceRequest extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        return [
            '*.patientId' => ['required', 'integer'],
            '*.amount'=> ['required', 'numeric'],
            '*.status'=> ['required', Rule::in(['B', 'P', 'V', 'b', 'p', 'v'])],
            '*.billedDate'=> ['required', 'date_format:Y-m-d H:i:s'],
            '*.paidDate'=> ['date_format:Y-m-d H:i:s','nullable']
        ];
    }

    protected function prepareForValidation() {
        $data = [];

        foreach ($this->toArray() as $obj) {
            $obj['patient_id'] = $obj['patientId'] ?? null;
            $obj['billed_date'] = $obj['billedDate'] ?? null;
            $obj['paid_date'] = $obj['paidDate'] ?? null;

            $data[] = $obj;
        }

        $this->merge($data);
    }
}
