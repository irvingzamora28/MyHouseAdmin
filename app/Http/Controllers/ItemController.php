<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Services\ItemService;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    protected $itemService;

    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    // Get all items for the authenticated user
    public function index()
    {
        $items = $this->itemService->getAllItems();
        return ItemResource::collection($items);
    }

    // Get a single item
    public function show($id)
    {
        $item = $this->itemService->getItemById($id);
        return new ItemResource($item);
    }

    // Store a new item
    public function store(StoreItemRequest $request)
    {
        $item = $this->itemService->storeItem($request->validated());
        return new ItemResource($item);
    }

    // Update an existing item
    public function update(UpdateItemRequest $request, Item $item)
    {
        $updatedItem = $this->itemService->updateItem($item, $request->validated());
        return new ItemResource($updatedItem);
    }

    // Delete an item (Soft delete)
    public function destroy(Item $item)
    {
        $this->itemService->deleteItem($item);
        return response()->json(['message' => 'Item deleted successfully.'], Response::HTTP_OK);
    }
}
