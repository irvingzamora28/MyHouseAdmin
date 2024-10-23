<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->getAllCategories();
        return CategoryResource::collection($categories);
    }

    public function display()
    {
        $categories = $this->categoryService->getAllCategories();
        return Inertia::render('Categories', [
            'categories' => CategoryResource::collection($categories)->toArray(request()),
        ]);
    }

    // Get a single category
    public function show($id)
    {
        $category = $this->categoryService->getCategoryById($id);
        return new CategoryResource($category);
    }

    // Store a new category
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $category = $this->categoryService->storeCategory($request->validated());

        // Use Inertia redirect with a flash message if necessary
        return redirect()->route('categories.display')->with('success', 'Category created successfully.');
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $updatedCategory = $this->categoryService->updateCategory($category, $request->validated());

        // Use Inertia redirect with a flash message if necessary
        return redirect()->route('categories.display')->with('success', 'Category updated successfully.');
    }

    // Delete a category (soft delete)
    public function destroy(Category $category)
    {
        $this->categoryService->deleteCategory($category);
        return redirect()->route('categories.display')->with('success', 'Category deleted successfully.');
    }
}
