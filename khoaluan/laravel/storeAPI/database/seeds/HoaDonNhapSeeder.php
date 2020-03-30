<?php

use Illuminate\Database\Seeder;

class HoaDonNhapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$hoa_don_nhaps = array(
    		array('id' => '1','idUser' => '2','NgayNhap' => '2019-04-26 18:14:27','idNCC' => '1','created_at' => '2019-04-25 18:14:27','updated_at' => '2019-04-26 05:15:51'),
    		array('id' => '2','idUser' => '2','NgayNhap' => '2019-04-26 18:18:33','idNCC' => '1','created_at' => '2019-04-25 18:18:33','updated_at' => '2019-04-25 18:33:40'),
    		array('id' => '3','idUser' => '2','NgayNhap' => '2019-04-26 01:59:37','idNCC' => '5','created_at' => '2019-04-26 01:59:37','updated_at' => '2019-04-26 02:37:24'),
    		array('id' => '4','idUser' => '2','NgayNhap' => '2019-04-26 04:17:08','idNCC' => '3','created_at' => '2019-04-26 04:17:08','updated_at' => '2019-04-26 04:17:45'),
    		array('id' => '5','idUser' => '2','NgayNhap' => '2019-04-26 04:21:33','idNCC' => '1','created_at' => '2019-04-26 04:21:33','updated_at' => '2019-04-26 04:22:07'),
    		array('id' => '6','idUser' => '2','NgayNhap' => '2019-04-26 04:21:40','idNCC' => '1','created_at' => '2019-04-26 04:21:40','updated_at' => '2019-04-26 04:23:13'),
    		array('id' => '7','idUser' => '2','NgayNhap' => '2019-04-27 07:46:47','idNCC' => '4','created_at' => '2019-04-26 07:45:45','updated_at' => '2019-05-08 08:29:30'),
    		array('id' => '8','idUser' => '2','NgayNhap' => '2019-05-08 00:00:00','idNCC' => '2','created_at' => '2019-05-01 00:00:00','updated_at' => '2019-05-08 08:24:23'),
    		array('id' => '10','idUser' => '2','NgayNhap' => '2019-05-09 09:25:22','idNCC' => '1','created_at' => '2019-05-08 09:25:22','updated_at' => '2019-05-08 09:25:43'),
    		array('id' => '11','idUser' => '2','NgayNhap' => '2019-05-10 09:27:58','idNCC' => '1','created_at' => '2019-05-08 09:27:58','updated_at' => '2019-05-08 09:28:18'),
    		array('id' => '24','idUser' => '5','NgayNhap' => '2019-08-15 02:13:35','idNCC' => '2','created_at' => '2019-08-14 02:13:35','updated_at' => '2019-08-14 02:21:15'),
    		array('id' => '25','idUser' => '4','NgayNhap' => '2019-08-25 11:47:00','idNCC' => '4','created_at' => '2019-08-25 11:47:00','updated_at' => '2019-08-25 11:47:00'),
    		array('id' => '26','idUser' => '4','NgayNhap' => '2001-01-02 12:02:02','idNCC' => '2','created_at' => '2019-08-25 12:02:02','updated_at' => '2019-08-25 12:02:02'),
    		array('id' => '27','idUser' => '4','NgayNhap' => '2001-01-02 12:02:08','idNCC' => '3','created_at' => '2019-08-25 12:02:08','updated_at' => '2019-08-25 12:02:08'),
    		array('id' => '28','idUser' => '4','NgayNhap' => '2019-08-28 09:50:28','idNCC' => '2','created_at' => '2019-08-28 09:50:28','updated_at' => '2019-08-28 09:50:28'),
    		array('id' => '29','idUser' => '4','NgayNhap' => '2019-08-31 10:13:44','idNCC' => '5','created_at' => '2019-08-31 10:13:44','updated_at' => '2019-08-31 10:13:44'),
    		array('id' => '30','idUser' => '4','NgayNhap' => '2019-09-05 18:47:36','idNCC' => '4','created_at' => '2019-09-05 18:47:36','updated_at' => '2019-09-05 18:47:36'),
    		array('id' => '31','idUser' => '4','NgayNhap' => '2019-09-06 15:16:07','idNCC' => '3','created_at' => '2019-09-06 15:16:07','updated_at' => '2019-09-06 15:16:07'),
    		array('id' => '32','idUser' => '4','NgayNhap' => '2019-09-10 10:35:18','idNCC' => '3','created_at' => '2019-09-10 10:35:18','updated_at' => '2019-09-10 10:35:18')
    	);
    	Schema::disableForeignKeyConstraints();
    	DB::table('hoa_don_nhaps')->truncate();
    	foreach ($hoa_don_nhaps as $item) {
    		App\HoaDonNhap::create([
    			'idUser' => $item['idUser'],
    			'NgayNhap' => $item['NgayNhap'],
    			'idNCC' => $item['idNCC']
    		]);
    	}

    	Schema::enableForeignKeyConstraints();
    }
}
