<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Ten')->nullable();
            $table->string('DienThoai')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('DiaChi')->nullable();
            $table->string('password');
            $table->longText('Hinh')->nullable();
            $table->rememberToken();
            $table->bigInteger('idQuyen')->unsigned()->default('3');
            $table->foreign('idQuyen')->references('id')->on('quyens')->onDelete('cascade');
            $table->bigInteger('idDiaDiem')->unsigned()->nullable();
            $table->foreign('idDiaDiem')->references('id')->on('dia_diems')->onDelete('cascade');
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('users');
    }
}
