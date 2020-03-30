<?php

use Illuminate\Database\Seeder;

class ChiTietKhuyenMaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
    	DB::table('chi_tiet_khuyen_mais')->truncate();

    	$khuyenmai = [
    		[0.2,1,1],
    		[0.2,1,2],
    		[0.2,1,3],
    		
         

    	];

    	foreach ($khuyenmai as $km) {
    		App\ChiTietKhuyenMai::create([
    			'TiLe'=>$km[0],
    			'idKhuyenMai'=>$km[1],
    			'idSanPham'=>$km[2],
    		
    		]);
    	}
    	Schema::enableForeignKeyConstraints();
    }
}
