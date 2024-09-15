<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    // Get all categories for the authenticated user
    public function index()
    {
        $categories = $this->categoryService->getAllCategories();
        return CategoryResource::collection($categories);
    }

    // Get a single category
    public function show($id)
    {
        $category = $this->categoryService->getCategoryById($id);
        return new CategoryResource($category);
    }

    // Store a new category
    public function store(StoreCategoryRequest $request)
    {
        $category = $this->categoryService->storeCategory($request->validated());
        return new CategoryResource($category);
    }

    // Update an existing category
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $updatedCategory = $this->categoryService->updateCategory($category, $request->validated());
        return new CategoryResource($updatedCategory);
    }

    // Delete a category (soft delete)
    public function destroy(Category $category)
    {
        $this->categoryService->deleteCategory($category);
        return response()->json(['message' => 'Category deleted successfully.'], Response::HTTP_OK);
    }
}
