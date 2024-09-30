<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/categories', [CategoryController::class, 'index'])->middleware(['auth', 'verified'])->name('categories.index');
Route::post('/categories', [CategoryController::class, 'store'])->middleware(['auth', 'verified'])->name('categories.store');
Route::put('/categories/{category}', [CategoryController::class, 'update'])->middleware(['auth', 'verified'])->name('categories.update');
Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->middleware(['auth', 'verified'])->name('categories.destroy');

Route::get('/locations', [LocationController::class, 'index'])->middleware(['auth', 'verified'])->name('locations.index');
Route::get('/locations/parent-locations', [LocationController::class, 'getValidParentLocations'])->middleware(['auth', 'verified'])->name('locations.parent-locations');
Route::post('/locations', [LocationController::class, 'store'])->middleware(['auth', 'verified'])->name('locations.store');
Route::put('/locations/{location}', [LocationController::class, 'update'])->middleware(['auth', 'verified'])->name('locations.update');
Route::delete('/locations/{location}', [LocationController::class, 'destroy'])->middleware(['auth', 'verified'])->name('locations.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
