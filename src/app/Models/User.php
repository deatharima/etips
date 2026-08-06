<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'first_name',
    'last_name',
    'phone',
    'birth_date',
    'avatar_path',
    'role',
    'email',
    'password',
    'employee_qr_token',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    public function venues(): HasMany
    {
        return $this->hasMany(Venue::class, 'owner_id');
    }

    public function employeeApplications(): HasMany
    {
        return $this->hasMany(EmployeeApplication::class);
    }

    public function reviewedApplications(): HasMany
    {
        return $this->hasMany(EmployeeApplication::class, 'reviewed_by');
    }

    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(
            VenueBranch::class,
            'branch_employees',
            'user_id',
            'branch_id'
        )
            ->withPivot([
                'position',
                'is_active',
                'joined_at',
                'left_at',
            ])
            ->withTimestamps();
    }

    public function tips(): HasMany
    {
        return $this->hasMany(Tip::class);
    }
}
