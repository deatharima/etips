<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Venue extends Model
{
    protected $fillable = [
        'owner_id',
        'name',
        'slug',
        'description',
        'phone',
        'email',
        'website',
        'logo',
        'cover',
        'is_active',
    ];

    public function branches(): HasMany
    {
        return $this->hasMany(VenueBranch::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
