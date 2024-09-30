<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use App\Services\LocationService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class LocationController extends Controller
{
    protected $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    // Get all locations for the authenticated user
    public function index()
    {
        $locations = $this->locationService->getAllLocations();

        return Inertia::render('Locations', [
            'locations' => $locations,
        ]);
    }

    public function getValidParentLocations(Request $request)
    {
        $locationId = $request->input('locationId');
        $parentLocations = $this->locationService->getValidParentLocations($locationId);

        return response()->json($parentLocations);
    }

    // Get a single location
    public function show($id)
    {
        $location = $this->locationService->getLocationById($id);
        return new LocationResource($location);
    }

    // Store a new location
    public function store(StoreLocationRequest $request)
    {
        $location = $this->locationService->storeLocation($request->validated());
        return redirect()->route('locations.index')->with('success', 'Category created successfully.');
    }

    // Update an existing location
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $updatedLocation = $this->locationService->updateLocation($location, $request->validated());
        return redirect()->route('locations.index')->with('success', 'Location updated successfully.');
    }

    // Delete a location (soft delete)
    public function destroy(Location $location)
    {
        $this->locationService->deleteLocation($location);
        return redirect()->route('locations.index')->with('success', 'Location deleted successfully.');
    }
}
