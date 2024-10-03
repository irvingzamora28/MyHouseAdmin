<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'icon_name', 'icon_package'];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}
