<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiaDiemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dia_diems', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Ten');
            $table->bigInteger('idParent')->unsigned()->nullable();
            $table->foreign('idParent')->references('id')->on('dia_diems')->onDelete('cascade');
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
        Schema::dropIfExists('dia_diems');
    }
}
