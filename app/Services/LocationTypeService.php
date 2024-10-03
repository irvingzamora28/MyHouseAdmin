<?php

namespace App\Services;

use App\Models\LocationType;

class LocationTypeService
{
    public function getAllLocationTypes()
    {
        return LocationType::all(['id', 'name', 'icon_package', 'icon_name']);
    }
}
