<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\Chart;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chart>
 */
class ChartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $treatable = $this->faker->randomElement(['Y', 'N']);

        return [
            'patient_id' => Patient::factory(),
            'treatable' => $treatable,
            'prescriptions' => $this->faker->numberBetween(0,10),
            'visit_date'=> $this->faker->dateTimeThisDecade(),
        ];
    }
}
