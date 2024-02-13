<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    use HasFactory;

    protected $fillable = [
        "patient_id",
        "treatable",
        "prescriptions",
        "visit_date"
    ];

    public function patient() {
        return $this->belongsTo(Patient::class);
    }
}
