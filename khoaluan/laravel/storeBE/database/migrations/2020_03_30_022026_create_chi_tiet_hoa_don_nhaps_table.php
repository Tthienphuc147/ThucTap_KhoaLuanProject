<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChiTietHoaDonNhapsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chi_tiet_hoa_don_nhaps', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('SoLuong');
            $table->double('GiaNhap')->default(0);
            $table->double('GiaBan')->default(0);
            $table->bigInteger('idHDN')->unsigned();
            $table->foreign('idHDN')->references('id')->on('hoa_don_nhaps')->onDelete('cascade');
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
        Schema::dropIfExists('chi_tiet_hoa_don_nhaps');
    }
}
