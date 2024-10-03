<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationTypeResource;
use App\Services\LocationTypeService;
use Illuminate\Http\Request;

class LocationTypeController extends Controller
{
    protected $locationTypeService;

    public function __construct(LocationTypeService $locationTypeService)
    {
        $this->locationTypeService = $locationTypeService;
    }

    // Get all location types
    public function index()
    {
        $locationTypes = $this->locationTypeService->getAllLocationTypes();
        return LocationTypeResource::collection($locationTypes);
        return new LocationTypeResource($locationTypes);
    }
}
