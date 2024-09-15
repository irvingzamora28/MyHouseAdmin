<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category' => new CategoryResource($this->category),
            'location' => new LocationResource($this->location),
            'value' => $this->value,
            'purchase_date' => $this->purchase_date,
            'warranty_info' => $this->warranty_info,
            // 'tags' => TagResource::collection($this->tags),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
