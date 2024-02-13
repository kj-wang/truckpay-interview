<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            "id"=> $this->id,
            'patientId'=> $this->patient_id,
            'treatable'=> $this->treatable,
            'prescriptions'=> $this->prescriptions,
            'visitDate'=> $this->visit_date,
        ];
    }
}
