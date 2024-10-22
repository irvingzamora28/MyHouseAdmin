<?php

namespace App\Services;

use App\Models\Item;
use Illuminate\Support\Facades\Auth;

class ItemService
{
    // Retrieve all items for the authenticated user
    public function getAllItems()
    {
        return Item::where('user_id', Auth::id())->with(['category', 'location', 'tags'])->get();
    }

    // Retrieve a single item by ID
    public function getItemById($id)
    {
        return Item::where('user_id', Auth::id())->where('id', $id)->with(['category', 'location', 'tags'])->firstOrFail();
    }

    // Store a new item
    public function storeItem(array $data)
    {
        $data['user_id'] = Auth::id();
        return Item::create($data);
    }

    // Update an existing item
    public function updateItem(Item $item, array $data)
    {
        $item->update($data);
        return $item;
    }

    // Delete an item (Soft delete)
    public function deleteItem(Item $item)
    {
        $item->delete();
    }
}
