<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDanhGiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('danh_gias', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('Diem')->default(5);
            $table->string('NoiDung')->nullable();
            $table->bigInteger('idSanPham')->unsigned();
            $table->foreign('idSanPham')->references('id')->on('san_pham_ban_muas')->onDelete('cascade');
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
        Schema::dropIfExists('danh_gias');
    }
}
