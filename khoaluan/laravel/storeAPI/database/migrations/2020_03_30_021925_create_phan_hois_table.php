<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhanHoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phan_hois', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('NoiDung');
            $table->bigInteger('idParent')->unsigned()->nullable();
            $table->foreign('idParent')->references('id')->on('phan_hois');
            $table->bigInteger('idUser')->unsigned();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('phan_hois');
    }
}
