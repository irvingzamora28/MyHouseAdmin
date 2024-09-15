<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Support\Facades\Auth;

class LocationService
{
    public function getAllLocations()
    {
        return Location::where('user_id', Auth::id())->with('children')->get();
    }

    public function getLocationById($id)
    {
        return Location::where('user_id', Auth::id())->where('id', $id)->with('children')->firstOrFail();
    }

    public function storeLocation(array $data)
    {
        $data['user_id'] = Auth::id(); // Add ownership
        return Location::create($data);
    }

    public function updateLocation(Location $location, array $data)
    {
        $location->update($data);
        return $location;
    }

    public function deleteLocation(Location $location)
    {
        $location->delete();
    }
}
