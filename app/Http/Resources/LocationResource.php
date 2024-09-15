<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'children' => LocationResource::collection($this->children),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
