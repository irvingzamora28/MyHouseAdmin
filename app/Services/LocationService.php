<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Support\Facades\Auth;

class LocationService
{
    public function getAllLocations()
    {
        return Location::where('user_id', Auth::id())->with('parent')->with('children')->get();
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

    /**
     * Deletes the given location.
     *
     * @param \App\Models\Location $location The location to be deleted.
     * @return void
     */
    public function deleteLocation(Location $location)
    {
        $location->delete();
    }

    /**
     * Retrieves a list of valid parent locations, excluding the current location and its descendants.
     *
     * @param int|null $locationId The ID of the current location, or null if there is no current location.
     * @return \Illuminate\Database\Eloquent\Collection A collection of valid parent locations.
     */
    public function getValidParentLocations($locationId = null)
    {
        return Location::where('user_id', Auth::id())
            ->when($locationId, function ($query, $locationId) {
                // Exclude the current location and its descendants
                $query->where('id', '!=', $locationId)
                      ->whereNotIn('id', $this->getDescendantIds($locationId));
            })
            ->get();
    }

    /**
     * Recursively retrieves the IDs of all descendant locations for the given location ID.
     *
     * @param int $locationId The ID of the location to retrieve descendants for.
     * @return array An array of all descendant location IDs.
     */
    private function getDescendantIds($locationId)
    {
        $descendants = Location::where('parent_id', $locationId)->pluck('id');
        $allDescendants = $descendants->toArray();

        foreach ($descendants as $descendantId) {
            $allDescendants = array_merge($allDescendants, $this->getDescendantIds($descendantId));
        }

        return $allDescendants;
    }
}
