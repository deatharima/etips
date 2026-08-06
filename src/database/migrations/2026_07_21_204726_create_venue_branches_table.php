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
        Schema::create('venue_branches', function (Blueprint $table) {
            $table->id();

            $table->foreignId('venue_id')->constrained()->cascadeOnDelete();

            $table->string('name');
            $table->string('slug');
            $table->unique([
                'venue_id',
                'slug',
            ]);

            $table->string('address');
            $table->string('phone')->nullable();

            $table->text('working_hours')->nullable();

            $table->enum('payment_provider', ['kaspi', 'halyk', 'jusan', 'freedom']);
            $table->string('payment_public_key')->nullable();
            $table->string('payment_secret_key')->nullable();

            $table->decimal('fee_percent', 5, 2)->default(5.00);

            $table->string('qr_token')->unique()->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venue_branches');
    }
};
