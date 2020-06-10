<?php

use Illuminate\Database\Seeder;

class KhuyenMaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
    	DB::table('khuyen_mais')->truncate();

    	$khuyenmai = [
    		['thang 4','khuyen mai trong thang 4','2019/04/01','2019/04/25'],
    		['thang 5','khuyen mai trong thang 5','2019/05/01','2019/05/25'],
    		
         

    	];

    	foreach ($khuyenmai as $km) {
    		App\KhuyenMai::create([
    			'Ten'=>$km[0],
    			'MoTa'=>$km[1],
    			'NgayBD'=>$km[2],
    			'NgayKT'=>$km[3]
    		]);
    	}
    	Schema::enableForeignKeyConstraints();
    }
}
