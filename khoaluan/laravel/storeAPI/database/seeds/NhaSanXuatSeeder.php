<?php

use Illuminate\Database\Seeder;

class NhaSanXuatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('nha_san_xuats')->truncate();

        $nhasxs = [
          ['Samsung'],
          ['Sony'],
          ['Xiaomi'],
          ['Apple'],
          ['Midea'],
          ['Panasonic'],
          ['Mitsubishi'],
          ['Asia'],
          ['Komasu'],
          ['Sunhouse'],
      ];
      $nhasx2=[
        ["id"=>"1","Ten"=>"Samsung","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"2","Ten"=>"Sony","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"3","Ten"=>"Xiaomi","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"4","Ten"=>"Apple","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"5","Ten"=>"Midea","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"6","Ten"=>"Panasonic","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"7","Ten"=>"Mitsubishi","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"8","Ten"=>"Asia","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"9","Ten"=>"Komasu","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"10","Ten"=>"Sunhouse","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"11","Ten"=>"Hatachi","created_at"=>"2019-04-30 16:09:19","updated_at"=>"2019-04-30 16:09:19"],
        ["id"=>"12","Ten"=>"BeKo","created_at"=>"2019-06-01 17:27:36","updated_at"=>"2019-06-01 17:27:36"],
        ["id"=>"13","Ten"=>"LG","created_at"=>"2019-06-01 17:30:31","updated_at"=>"2019-06-01 17:30:31"],
        ["id"=>"14","Ten"=>"AQua","created_at"=>"2019-06-01 17:35:21","updated_at"=>"2019-06-01 17:35:21"]
    ];


    foreach ($nhasx2 as $nhasx) {
      App\NhaSanXuat::create([
         'Ten' => $nhasx["Ten"]
     ]);
  }
  Schema::enableForeignKeyConstraints();
}
}
