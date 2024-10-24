<?php

// app/Http/Controllers/ImageProcessingController.php
namespace App\Http\Controllers;

use App\Http\Requests\UploadImageRequest;
use App\Services\ImageProcessingService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageProcessingController extends Controller
{
    protected $imageProcessingService;

    public function __construct(ImageProcessingService $imageProcessingService)
    {
        $this->imageProcessingService = $imageProcessingService;
    }

    public function store(UploadImageRequest $request)
    {
        $request->validate([
            'image' => ['nullable'], // 10MB max
        ]);

        try {
            $imagePath = $request->file('image')->store('temp', 'public');
            $fullPath = Storage::disk('public')->path($imagePath);

            $result = $this->imageProcessingService->processImage($fullPath);

            return response()->json([
                'message' => 'Image processed successfully',
                'result' => $result,
            ]);
        } catch (\Exception $e) {
            report($e); // Log the error

            return response()->json([
                'message' => 'Failed to process image',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred',
            ], 500);
        } finally {
            // Cleanup temporary file
            if (isset($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }
    }
}
