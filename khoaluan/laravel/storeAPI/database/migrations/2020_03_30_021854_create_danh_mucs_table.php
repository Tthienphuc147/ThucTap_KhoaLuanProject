<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDanhMucsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('danh_mucs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Ten');
            $table->bigInteger('idParent')->unsigned()->nullable();
            $table->foreign('idParent')->references('id')->on('danh_mucs');
            $table->string('Hinh')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('danh_mucs');
    }
}
