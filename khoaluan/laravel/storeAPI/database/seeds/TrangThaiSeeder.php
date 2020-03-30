<?php

use Illuminate\Database\Seeder;

class TrangThaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Schema::disableForeignKeyConstraints();
    	DB::table('trang_thais')->truncate();

    	$trangthai = [
    		['Chưa xử lý'],
    		['Đã đóng gói'],
    		['Đang giao hàng'],
            ['Đã giao hàng'],
            ['Đã hủy'],
    	];

    	foreach ($trangthai as $item) {
    		App\TrangThai::create([
    			'Ten' => $item[0]
    		]);
    	}

    	Schema::enableForeignKeyConstraints();
    }
}
