<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;

class ItemSeeder extends Seeder
{
    public function run()
    {
        Item::create([
            'user_id' => 1,
            'name' => 'Laptop',
            'description' => 'MacBook Pro',
            'category_id' => 1, // Electronics
            'location_id' => 2, // Blue Big Box
            'value' => 1500.00,
            'purchase_date' => '2022-01-15',
            'warranty_info' => '1 year warranty'
        ]);

        Item::create([
            'user_id' => 1,
            'name' => 'Office Chair',
            'description' => 'Ergonomic chair',
            'category_id' => 2, // Furniture
            'location_id' => 1, // Storage Room
            'value' => 300.00,
            'purchase_date' => '2021-05-22'
        ]);
    }
}
