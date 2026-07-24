<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class EmployeeApplication extends Model
{
    protected $fillable = [
        'user_id',
        'branch_id',
        'status',
        'comment',
        'reviewed_by',
        'reviewed_at'
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }



    public function branch(): BelongsTo
    {
        return $this->belongsTo(VenueBranch::class, 'branch_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
