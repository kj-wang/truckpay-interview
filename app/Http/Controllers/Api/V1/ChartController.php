<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\V1\ChartsFilter;
use App\Http\Requests\V1\StoreChartRequest;
use App\Http\Requests\UpdateChartRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ChartCollection;
use App\Http\Resources\V1\ChartResource;

use App\Models\Chart;
use Illuminate\Http\Request;

use Illuminate\Support\Arr;
use App\Http\Requests\V1\BulkStoreChartRequest;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ChartsFilter();
        $queryItems = $filter->transform($request);

        if (count($queryItems) == 0) {
            return new ChartCollection(Chart::paginate());
        } else {
            $Charts = Chart::where($queryItems)->paginate();
            return new ChartCollection($Charts->appends($request->query()));
        }

    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChartRequest $request)
    {
        return new ChartResource(Chart::create($request->all()));
    }

    public function bulkStore(BulkStoreChartRequest $request) {
        $bulk = collect($request->all())->map(function ($arr, $key) {
            return Arr::except($arr, ['patientId', 'visitDate']);
        });

        Chart::insert($bulk->toArray());
    }

    /**
     * Display the specified resource.
     */
    public function show(Chart $Chart)
    {
        return new ChartResource($Chart);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chart $Chart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChartRequest $request, Chart $Chart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chart $Chart)
    {
        //
    }
}
