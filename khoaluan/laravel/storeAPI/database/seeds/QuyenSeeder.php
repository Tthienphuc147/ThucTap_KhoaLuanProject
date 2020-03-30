<?php

use Illuminate\Database\Seeder;

class QuyenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Schema::disableForeignKeyConstraints();
    	DB::table('quyens')->truncate();

    	$quyens = [
    		['Admin'],
    		['Nhân Viên'],
    		['Khách hàng'],
    	];

    	foreach ($quyens as $quyen) {
    		App\Quyen::create([
    			'Ten' => $quyen[0]
    		]);
    	}

    	Schema::enableForeignKeyConstraints();
    }
}
