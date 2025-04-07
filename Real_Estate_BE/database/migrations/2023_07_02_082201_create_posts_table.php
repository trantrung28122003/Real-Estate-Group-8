<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('project_id')->nullable();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('set null');

            $table->string('title')->default('title');
            $table->text('description')->nullable();
            $table->string('province')->nullable();
            $table->string('district')->nullable();
            $table->string('ward')->nullable();
            $table->string('street')->nullable();
            $table->string('address')->nullable();
            $table->string('legal_documents')->nullable();
            $table->string('furniture')->nullable();
            $table->integer('bedroom')->nullable();
            $table->integer('toilet')->nullable();
            $table->integer('floor')->nullable();
            $table->integer('size')->nullable();
            $table->unsignedBigInteger('price')->nullable();
            $table->enum('unit',['VND', 'VND/m2', 'Thỏa Thuận'])->nullable();

            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('post_types')->onDelete('cascade');

            $table->tinyInteger('status')->default(0);
            $table->dateTime('published_at')->nullable();
            $table->dateTime('expired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
