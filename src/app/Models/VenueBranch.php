<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class VenueBranch extends Model
{
    protected $fillable = [
        'venue_id',
        'name',
        'slug',
        'address',
        'phone',
        'payment_provider',
        'payment_public_key',
        'payment_secret_key',
        'fee_percent',
        'working_hours',
        'qr_token',
        'is_active'
    ];
    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'branch_employees', 'branch_id', 'user_id')
            ->withPivot([
                'position',
                'is_active',
                'joined_at',
                'left_at'
            ])
            ->withTimestamps();
    }

    public function employeeApplications(): HasMany
    {
        return $this->hasMany(EmployeeApplication::class, 'branch_id');
    }

    public function tips(): HasMany
    {
        return $this->hasMany(Tip::class);
    }

    protected static function booted(): void
    {
        static::creating(function ($branch) {
            if (empty($branch->qr_token)) {
                $branch->qr_token = Str::uuid()->toString();
            }
        });
    }

}
