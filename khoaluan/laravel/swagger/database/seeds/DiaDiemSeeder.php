<?php

use Illuminate\Database\Seeder;

class DiaDiemSeeder extends Seeder
{
  
    public function run()
    {
    	Schema::disableForeignKeyConstraints();
    	DB::table('dia_diems')->truncate();
        $dia_diems = array(
            array('id' => '1','Ten' => 'Đà Nẵng','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '2','Ten' => 'Hồ Chí Minh','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '3','Ten' => 'Hà Nội','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '4','Ten' => 'Nha Trang','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '5','Ten' => 'Vũng Tàu','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '6','Ten' => 'Thanh Hóa','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '7','Ten' => 'Bình Định','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '8','Ten' => 'Quy Nhơn','idParent' => NULL,'created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '9','Ten' => 'Thanh Khê','idParent' => '1','created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '10','Ten' => 'Hải Châu','idParent' => '1','created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '11','Ten' => 'Sơn Trà','idParent' => '1','created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '12','Ten' => 'Xuân Hà','idParent' => '9','created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '13','Ten' => 'Thạch Gián','idParent' => '9','created_at' => '2019-04-29 03:32:54','updated_at' => '2019-04-29 03:32:54'),
            array('id' => '14','Ten' => 'Ba Đình','idParent' => '3','created_at' => '2019-06-01 23:38:15','updated_at' => '2019-06-01 23:39:56'),
            array('id' => '15','Ten' => 'Hoàn Kiếm','idParent' => '3','created_at' => '2019-06-01 23:38:30','updated_at' => '2019-06-01 23:39:29'),
            array('id' => '16','Ten' => 'Tây Hồ','idParent' => '3','created_at' => '2019-06-01 23:38:57','updated_at' => '2019-06-01 23:38:57'),
            array('id' => '17','Ten' => 'Long Biên','idParent' => '3','created_at' => '2019-06-01 23:39:07','updated_at' => '2019-06-01 23:39:07'),
            array('id' => '18','Ten' => 'Cầu Giấy','idParent' => '3','created_at' => '2019-06-01 23:39:14','updated_at' => '2019-06-01 23:39:14'),
            array('id' => '19','Ten' => 'Kim Mã','idParent' => '14','created_at' => '2019-06-01 23:43:35','updated_at' => '2019-06-01 23:43:35'),
            array('id' => '20','Ten' => 'Liễu Giai','idParent' => '14','created_at' => '2019-06-01 23:43:46','updated_at' => '2019-06-01 23:43:46'),
            array('id' => '21','Ten' => 'Mai Dịch','idParent' => '18','created_at' => '2019-06-01 23:44:16','updated_at' => '2019-06-01 23:44:16'),
            array('id' => '22','Ten' => 'Dịch Vọng','idParent' => '18','created_at' => '2019-06-01 23:44:27','updated_at' => '2019-06-01 23:44:27'),
            array('id' => '23','Ten' => 'Quận 1','idParent' => '2','created_at' => '2019-06-01 23:45:38','updated_at' => '2019-06-01 23:45:38'),
            array('id' => '24','Ten' => 'Quận 12','idParent' => '2','created_at' => '2019-06-01 23:45:44','updated_at' => '2019-06-01 23:45:44'),
            array('id' => '25','Ten' => 'Bình Thạnh','idParent' => '2','created_at' => '2019-06-01 23:45:52','updated_at' => '2019-06-01 23:45:52'),
            array('id' => '26','Ten' => 'Phường 1','idParent' => '25','created_at' => '2019-06-01 23:46:25','updated_at' => '2019-06-01 23:46:25'),
            array('id' => '27','Ten' => 'Phường 2','idParent' => '25','created_at' => '2019-06-01 23:46:33','updated_at' => '2019-06-01 23:46:33'),
            array('id' => '28','Ten' => 'Phường 3','idParent' => '25','created_at' => '2019-06-01 23:46:48','updated_at' => '2019-06-01 23:46:48'),
            array('id' => '29','Ten' => 'Bến Thành','idParent' => '23','created_at' => '2019-06-01 23:47:28','updated_at' => '2019-06-01 23:47:28'),
            array('id' => '30','Ten' => 'Cầu Kho','idParent' => '23','created_at' => '2019-06-01 23:47:46','updated_at' => '2019-06-01 23:47:46'),
            array('id' => '31','Ten' => 'Cầu Ông Lãnh','idParent' => '23','created_at' => '2019-06-01 23:47:59','updated_at' => '2019-06-01 23:47:59')
        );
foreach ($dia_diems as $item) {
  App\DiaDiem::create([
     'Ten'=>$item['Ten'],
     'idParent'=>$item['idParent'],
 ]);
}
Schema::enableForeignKeyConstraints();
}
}
