<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSanPhamBanMuasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('san_pham_ban_muas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('TenSanPham');
            $table->longText('Hinh')->nullable();
            $table->longText('MoTa')->nullable();
            $table->longText('ThongTin')->nullable();
            $table->bigInteger('idNSX')->unsigned();
            $table->foreign('idNSX')->references('id')->on('nha_san_xuats')->onDelete('cascade');
            $table->bigInteger('idDanhMuc')->unsigned();
            $table->foreign('idDanhMuc')->references('id')->on('danh_mucs')->onDelete('cascade');
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
        Schema::dropIfExists('san_pham_ban_muas');
    }
}
