<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('branch_employees', function (Blueprint $table) {
            $table->id();

            $table->foreignId('branch_id')->constrained('venue_branches')->cascadeOnDelete();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->enum('position', [
                'waiter',
                'barista',
                'bartender',
                'cashier',
                'administrator',
                'cook',
                'other',
            ]);

            $table->date('joined_at')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamp('left_at')->nullable();

            $table->unique(['user_id', 'branch_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branch_employees');
    }
};
