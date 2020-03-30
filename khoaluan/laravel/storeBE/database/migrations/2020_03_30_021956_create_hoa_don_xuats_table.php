<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHoaDonXuatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hoa_don_xuats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('NguoiNhan');
            $table->string('DiaChi');
            $table->string('DienThoai');
             $table->bigInteger('idTrangThai')->unsigned()->nullable();
            $table->foreign('idTrangThai')->references('id')->on('trang_thais')->onDelete('cascade');
            $table->string('LiDo')->nullable();
            $table->bigInteger('idUser')->unsigned()->nullable();
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('idDiaDiem')->unsigned();
            $table->foreign('idDiaDiem')->references('id')->on('dia_diems')->onDelete('cascade');
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
        Schema::dropIfExists('hoa_don_xuats');
    }
}
