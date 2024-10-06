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
            'within' => new LocationResource($this->whenLoaded('parent')),
            'children' => LocationResource::collection($this->whenLoaded('children')),
            'location_type' => $this->locationType,
            'location_type_id' => $this->location_type_id,
        ];
    }
}
