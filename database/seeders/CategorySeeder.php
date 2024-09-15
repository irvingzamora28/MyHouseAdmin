<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create([
            'user_id' => 1,
            'name' => 'Electronics'
        ]);

        Category::create([
            'user_id' => 1,
            'name' => 'Furniture'
        ]);
    }
}
