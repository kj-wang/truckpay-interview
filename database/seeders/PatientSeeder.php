<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Patient::factory()
            ->count(25)
            ->hasInvoices(10)
            ->create();

        Patient::factory()
            ->count(100)
            ->hasInvoices(5)
            ->create();

        Patient::factory()
            ->count(100)
            ->hasInvoices(3)
            ->create();

        Patient::factory()
            ->count(5)
            ->create();
    }
}
