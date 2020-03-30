<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChiTietKhuyenMaisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chi_tiet_khuyen_mais', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('TiLe');
            $table->bigInteger('idKhuyenMai')->unsigned();
            $table->foreign('idKhuyenMai')->references('id')->on('khuyen_mais')->onDelete('cascade');
            $table->bigInteger('idSanPham')->unsigned();
            $table->foreign('idSanPham')->references('id')->on('san_pham_ban_muas')->onDelete('cascade');
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
        Schema::dropIfExists('chi_tiet_khuyen_mais');
    }
}
