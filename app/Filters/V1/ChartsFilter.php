<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ChartsFilter extends ApiFilter {
    protected $safeParms = [
        'patient_id' => ['eq'],
        'prescriptions'=> ['eq', 'lt', 'gt', 'lte', 'gte'],
        'treatable'=> ['eq', 'ne'],
        'paid_date'=> ['eq', 'lt', 'gt', 'lte', 'gte'],
    ];

    protected $columnMap = [
        'patientId' => 'patient_id',
        'postalCode'=> 'postal_code',
    ];

    protected $operatorMap = [
        'eq'=> '=',
        'lt'=> '<',
        'lte'=> '<=',
        'gt'=> '>',
        'gte'=> '>=',
        'ne' => '!='
    ];

}