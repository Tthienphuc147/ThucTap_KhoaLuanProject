<?php

use Illuminate\Database\Seeder;

class DanhMucSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Schema::disableForeignKeyConstraints();
    	DB::table('danh_mucs')->truncate();

      $danhmucs = [
        ["id"=>"1","Ten"=>"Điện thoại","idParent"=>null,"Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-09-06 00:56:02"],
        ["id"=>"2","Ten"=>"Điện gia dụng","idParent"=>null,"Hinh"=>"fas fa-tv","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-09-06 00:51:39"],
        ["id"=>"3","Ten"=>"Điện lạnh","idParent"=>null,"Hinh"=>"fas fa-blender","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-09-06 00:53:01"],
        ["id"=>"4","Ten"=>"Kỹ thuật số","idParent"=>null,"Hinh"=>"fa fa-camera-retro","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"5","Ten"=>"Laptop","idParent"=>null,"Hinh"=>"fa fa-laptop","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"6","Ten"=>"Thiết bị văn phòng","idParent"=>null,"Hinh"=>"fas fa-book","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-09-06 00:54:17"],
        ["id"=>"7","Ten"=>"Tai nghe","idParent"=>null,"Hinh"=>"fas fa-headphones","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-09-06 00:46:47"],
        ["id"=>"8","Ten"=>"Phụ kiện","idParent"=>null,"Hinh"=>"far fa-keyboard","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-09-06 00:49:45"],
        ["id"=>"9","Ten"=>"Bếp ga","idParent"=>"2","Hinh"=>"fa fa-mobile","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"10","Ten"=>"Bếp điện","idParent"=>"2","Hinh"=>"fa fa-mobile","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"11","Ten"=>"Nồi cơm điện","idParent"=>"2","Hinh"=>"fa fa-mobile","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"12","Ten"=>"Máy lọc nước","idParent"=>"2","Hinh"=>"fa fa-mobile","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"13","Ten"=>"Quạt điện","idParent"=>"2","Hinh"=>"fa fa-mobile","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"14","Ten"=>"Samsung","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"15","Ten"=>"Iphone","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"16","Ten"=>"Asus","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"17","Ten"=>"Nokia","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-08-26 10:21:45"],
        ["id"=>"18","Ten"=>"Xiaomi","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"19","Ten"=>"Oppo","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"20","Ten"=>"LG","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"21","Ten"=>"Sony","idParent"=>"1","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"22","Ten"=>"Samsung A","idParent"=>"14","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"23","Ten"=>"Samsung J","idParent"=>"14","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"24","Ten"=>"Samsung S","idParent"=>"14","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"25","Ten"=>"Samsung Note","idParent"=>"14","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"26","Ten"=>"Iphone X","idParent"=>"15","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"27","Ten"=>"Iphone 8","idParent"=>"15","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"28","Ten"=>"Iphone 7","idParent"=>"15","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"29","Ten"=>"Iphone 6","idParent"=>"15","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"30","Ten"=>"Iphone 5","idParent"=>"15","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"31","Ten"=>"Iphone 4","idParent"=>"15","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"32","Ten"=>"Asus 4","idParent"=>"16","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"33","Ten"=>"Asus 3","idParent"=>"16","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"34","Ten"=>"Asus 2","idParent"=>"16","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"35","Ten"=>"Asus 1","idParent"=>"16","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"36","Ten"=>"Nokia Lumia 1020","idParent"=>"17","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"37","Ten"=>"Nokia Lumia 930","idParent"=>"17","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"38","Ten"=>"Nokia Lumia 630","idParent"=>"17","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"39","Ten"=>"Nokia 1080","idParent"=>"17","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"40","Ten"=>"Xiaomi Redmi","idParent"=>"18","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"41","Ten"=>"Xiaomi Redmi Note","idParent"=>"18","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"42","Ten"=>"Xiaomi MI","idParent"=>"18","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"43","Ten"=>"Sony Xperia","idParent"=>"21","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"44","Ten"=>"Quạt Điện Media","idParent"=>"13","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"45","Ten"=>"Quạt Điện Panasonic","idParent"=>"13","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"46","Ten"=>"Quạt Điện Mitsubishi","idParent"=>"13","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"47","Ten"=>"Quạt Điện Asia","idParent"=>"13","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"48","Ten"=>"Quạt Điện Komasu","idParent"=>"13","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"49","Ten"=>"Quạt Điện Sunhouse","idParent"=>"13","Hinh"=>"fas fa-mobile-alt","created_at"=>"2019-04-29 03:32:54","updated_at"=>"2019-04-29 03:32:54"],
        ["id"=>"50","Ten"=>"Quat dien Samsung","idParent"=>"13","Hinh"=>"far fa-trash","created_at"=>"2019-04-29 04:29:16","updated_at"=>"2019-04-29 04:34:20"],
        ["id"=>"51","Ten"=>"Điều hòa, máy lạnh","idParent"=>"3","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:55:14","updated_at"=>"2019-04-30 15:55:14"],
        ["id"=>"52","Ten"=>"Tủ lạnh","idParent"=>"3","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:55:32","updated_at"=>"2019-04-30 15:55:32"],
        ["id"=>"53","Ten"=>"Máy giặt","idParent"=>"3","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:55:50","updated_at"=>"2019-04-30 15:55:50"],
        ["id"=>"54","Ten"=>"Điều hòa Panasonic","idParent"=>"51","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:57:37","updated_at"=>"2019-04-30 15:57:37"],
        ["id"=>"55","Ten"=>"Điều hòa Samsung","idParent"=>"51","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:58:07","updated_at"=>"2019-04-30 15:58:07"],
        ["id"=>"56","Ten"=>"Tủ lạnh Samsung","idParent"=>"52","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:58:27","updated_at"=>"2019-04-30 15:58:27"],
        ["id"=>"57","Ten"=>"Tủ lạnh Hatachi","idParent"=>"52","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 15:59:14","updated_at"=>"2019-04-30 15:59:14"],
        ["id"=>"58","Ten"=>"Máy ảnh DSRL","idParent"=>"4","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 16:00:17","updated_at"=>"2019-04-30 16:00:17"],
        ["id"=>"59","Ten"=>"Máy ảnh thường","idParent"=>"4","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 16:00:28","updated_at"=>"2019-04-30 16:00:28"],
        ["id"=>"60","Ten"=>"Tivi","idParent"=>"4","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 16:00:34","updated_at"=>"2019-04-30 16:00:34"],
        ["id"=>"61","Ten"=>"Tivi Samsung","idParent"=>"60","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 16:01:02","updated_at"=>"2019-04-30 16:01:02"],
        ["id"=>"62","Ten"=>"Tivi Panasonic","idParent"=>"60","Hinh"=>"far fa-trash","created_at"=>"2019-04-30 16:01:30","updated_at"=>"2019-04-30 16:01:30"],
        ["id"=>"63","Ten"=>"Tủ lạnh BeKo","idParent"=>"52","Hinh"=>"far fa-trash","created_at"=>"2019-06-01 17:29:37","updated_at"=>"2019-06-01 17:29:37"],
        ["id"=>"64","Ten"=>"Tủ lạnh LG","idParent"=>"52","Hinh"=>"far fa-trash","created_at"=>"2019-06-01 17:29:53","updated_at"=>"2019-06-01 17:29:53"],
        ["id"=>"65","Ten"=>"Máy giặt BeKo","idParent"=>"53","Hinh"=>"far fa-trash","created_at"=>"2019-06-01 17:32:49","updated_at"=>"2019-06-01 17:32:49"],
        ["id"=>"66","Ten"=>"Máy giặt SamSung","idParent"=>"53","Hinh"=>"far fa-trash","created_at"=>"2019-06-01 17:34:46","updated_at"=>"2019-06-01 17:34:46"],
        ["id"=>"67","Ten"=>"Máy giặt Aqua","idParent"=>"53","Hinh"=>"far fa-trash","created_at"=>"2019-06-01 17:35:02","updated_at"=>"2019-06-01 17:35:02"],
        ["id"=>"68","Ten"=>"Tivi LG","idParent"=>"60","Hinh"=>"far fa-trash","created_at"=>"2019-06-01 17:40:47","updated_at"=>"2019-06-01 17:40:47"]

      ];

      foreach ($danhmucs as $danhmuc) {
        App\DanhMuc::create([
         'Ten' => $danhmuc['Ten'],
         'Hinh'=>$danhmuc['Hinh'],
         'idParent'=>$danhmuc['idParent']

       ]);
      }
      Schema::enableForeignKeyConstraints();
    }
  }
