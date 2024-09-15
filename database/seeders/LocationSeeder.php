<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    public function run()
    {
        Location::create([
            'user_id' => 1, // Assuming a user with ID 1 exists
            'name' => 'Storage Room',
            'description' => 'Main storage room in the house',
            'parent_id' => null
        ]);

        Location::create([
            'user_id' => 1,
            'name' => 'Blue Big Box',
            'description' => 'Box inside the storage room',
            'parent_id' => 1 // Referencing "Storage Room"
        ]);
    }
}
