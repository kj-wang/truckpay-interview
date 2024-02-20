<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Http\Resources\V1\PatientResource;
use App\Http\Resources\V1\PatientCollection;
use Illuminate\Http\Request;
use App\Filters\V1\PatientsFilter;
use App\Http\Requests\V1\DeletePatientRequest;
use App\Http\Requests\V1\StorePatientRequest;
use App\Http\Requests\V1\UpdatePatientRequest;



class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new PatientsFilter();
        $filterItems = $filter->transform($request);

        $includeInvoices = $request->query('includeInvoices');
        $includeCharts = $request->query('includeCharts');


        $patients = Patient::where($filterItems);
        
        if ($includeInvoices) {
            $patients = $patients->with('invoices');
        } elseif ($includeCharts) {
            $patients = $patients->with('charts');
        } elseif ($includeCharts && $includeCharts) {
            $patients = $patients->with('charts')->with('invoices');
        }

        return new PatientCollection($patients->paginate()->appends($request->query()));

    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        return new PatientResource(Patient::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        $includeInvoices = request()->query('includeInvoices');
        $includeCharts = request()->query('includeCharts');

        if ($includeInvoices) {
            return new PatientResource($patient->loadMissing('invoices'));
        } elseif ($includeCharts) {
            return new PatientResource($patient->loadMissing('charts'));
        }

        return new PatientResource($patient);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeletePatientRequest $request, Patient $patient)
    {
        $id = $patient->id;
        $patient = Patient::findOrFail($id);

        $patient->delete();
    }
}
