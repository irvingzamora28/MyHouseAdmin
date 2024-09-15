<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Http\Response;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    // Get all tags
    public function index()
    {
        $tags = $this->tagService->getAllTags();
        return TagResource::collection($tags);
    }

    // Get a single tag
    public function show($id)
    {
        $tag = $this->tagService->getTagById($id);
        return new TagResource($tag);
    }

    // Store a new tag
    public function store(StoreTagRequest $request)
    {
        $tag = $this->tagService->storeTag($request->validated());
        return new TagResource($tag);
    }

    // Update an existing tag
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $updatedTag = $this->tagService->updateTag($tag, $request->validated());
        return new TagResource($updatedTag);
    }

    // Delete a tag
    public function destroy(Tag $tag)
    {
        $this->tagService->deleteTag($tag);
        return response()->json(['message' => 'Tag deleted successfully.'], Response::HTTP_OK);
    }
}
