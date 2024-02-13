<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class InvoicesFilter extends ApiFilter {
    protected $safeParms = [
        'patient_id' => ['eq'],
        'amount'=> ['eq', 'lt', 'gt', 'lte', 'gte'],
        'status'=> ['eq', 'ne'],
        'billed_date'=> ['eq', 'lt', 'gt', 'lte', 'gte'],
        'paid_date'=> ['eq', 'lt', 'gt', 'lte', 'gte'],
    ];

    protected $columnMap = [
        'postalCode'=> 'postal_code',
        'billedDate' => 'billed_date',
        'patientId' => 'patient_id'
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