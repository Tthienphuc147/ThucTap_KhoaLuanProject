<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChiTietHoaDonXuatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chi_tiet_hoa_don_xuats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('SoLuong')->default(0);
            $table->double('DonGia')->default(0);
            $table->integer('MaDotNhap')->nullable();
            $table->bigInteger('idHDX')->unsigned();
            $table->foreign('idHDX')->references('id')->on('hoa_don_xuats')->onDelete('cascade');
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
        Schema::dropIfExists('chi_tiet_hoa_don_xuats');
    }
}
