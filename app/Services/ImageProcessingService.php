<?php
// app/Services/ImageProcessingService.php
namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;

class ImageProcessingService
{
    public function processImage(string $imagePath): array
    {
        try {
            // Function to encode the image
            $imageData = base64_encode(file_get_contents($imagePath));
            $mimeType = mime_content_type($imagePath);

            // Construct the data URL
            $dataUrl = 'data:' . $mimeType . ';base64,' . $imageData;

            // Prepare the messages array
            $messages = [
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => 'Analyze this image and provide:
1. A detailed description
2. Key objects identified
3. Any text present in the image
4. The overall context or setting
Please format the response in a structured way.',
                        ],
                        [
                            'type' => 'image_url',
                            'image_url' => [
                                'url' => $dataUrl,
                            ],
                        ],
                    ],
                ],
            ];

            // Call the chat completion API with the image file
            $result = OpenAI::chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => $messages,
                'max_tokens' => 500,
            ]);

            return [
                'analysis' => $result->choices[0]->message->content,
                'processed_at' => now()->toIso8601String(),
            ];
        } catch (\Exception $e) {
            Log::error('Image processing failed', [
                'error' => $e->getMessage(),
                'image_path' => $imagePath,
            ]);

            throw $e;
        }
    }
}
