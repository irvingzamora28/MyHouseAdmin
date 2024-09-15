<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryService
{
    public function getAllCategories()
    {
        return Category::where('user_id', Auth::id())->get();
    }

    public function getCategoryById($id)
    {
        return Category::where('user_id', Auth::id())->where('id', $id)->firstOrFail();
    }

    public function storeCategory(array $data)
    {
        $data['user_id'] = Auth::id(); // Add ownership
        return Category::create($data);
    }

    public function updateCategory(Category $category, array $data)
    {
        $category->update($data);
        return $category;
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();
    }
}
