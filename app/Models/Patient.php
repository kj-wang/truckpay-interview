<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "type",
        "email",
        "address",
        "city",
        "state",
        "postal_code",
    ];

    public function invoices() {
        return $this->hasMany(Invoice::class);
    }

    public function charts() {
        return $this->hasMany(Chart::class);
    }
}
