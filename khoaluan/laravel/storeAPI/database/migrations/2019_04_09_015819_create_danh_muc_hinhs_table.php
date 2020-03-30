<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDanhMucHinhsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('danh_muc_hinhs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('Hinh')->nullable();
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
        Schema::dropIfExists('danh_muc_hinhs');
    }
}
