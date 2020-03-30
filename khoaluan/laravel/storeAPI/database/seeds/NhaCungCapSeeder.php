<?php

use Illuminate\Database\Seeder;

class NhaCungCapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
    	DB::table('nha_cung_caps')->truncate();

    	$items = [
    		['Nhà cung cấp 1'],
    		['Nhà cung cấp 2'],
    		['Nhà cung cấp 3'],
            ['Nhà cung cấp 4'],
            ['Nhà cung cấp 5'],
    	];

    	foreach ($items as $item) {
    		App\NhaCungCap::create([
    			'Ten' => $item[0]
    		]);
    	}

    	Schema::enableForeignKeyConstraints();
    }
}
