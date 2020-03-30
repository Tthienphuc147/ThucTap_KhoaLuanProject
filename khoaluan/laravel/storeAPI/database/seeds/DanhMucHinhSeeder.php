<?php

use Illuminate\Database\Seeder;

class DanhMucHinhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Schema::disableForeignKeyConstraints();
    	DB::table('danh_muc_hinhs')->truncate();

    	$danh_muc_hinhs = [[13,"fMY9jbX8SXQbowkgtszpKdYPmeDXKEtte33bhrDz.jpeg",1,"2019-09-19 10:03:38","2019-09-19 10:03:38"],[14,"LJCXYOIC5CgEYaMVXeoCowqiKeBkEcHr2i0eH3ZA.jpeg",1,"2019-09-19 10:03:44","2019-09-19 10:03:44"],[15,"03A0gLGfoLkvtQRsexj5bBgOsAo0aOTHQPWNhiWq.jpeg",1,"2019-09-19 10:03:47","2019-09-19 10:03:47"],[16,"86lxbfyPK13njHbfcJMM4h5IhFnadVC4Yc5QDB2u.jpeg",1,"2019-09-19 10:03:52","2019-09-19 10:03:52"],[17,"O7uyqPeukHObrIDa09yeBBPWnAkRtSGll3SQQ5Cq.jpeg",1,"2019-09-19 10:03:58","2019-09-19 10:03:58"],[18,"NUpghA8fmDJyylOGDQufQxn9ltuf6m2PkTOsLr15.jpeg",29,"2019-09-19 10:04:41","2019-09-19 10:04:41"],[19,"c7ZwMBO5uppab5YnWVqJ2XIcqNh7GaVkH4DtLfDA.jpeg",29,"2019-09-19 10:04:50","2019-09-19 10:04:50"],[20,"R9b5aZMJOeCFTqRB44vMAI5jY361lLdofevsivPQ.jpeg",19,"2019-09-19 10:06:13","2019-09-19 10:06:13"],[21,"1QsJCi6OoVLZlU1Sfl8xHNXuXmRYOg5HzOUnZACO.jpeg",29,"2019-09-19 10:06:48","2019-09-19 10:06:48"],[22,"FQMWVelI1iZlwvzUhBavS2DhdJAyTPpVrq0QOx2f.jpeg",29,"2019-09-19 10:06:55","2019-09-19 10:06:55"],[27,"0q3eGG9RDvwBfoDvs1Pk1krSqUrVGBjQVIA9Xdxw.jpeg",29,"2019-09-19 13:28:28","2019-09-19 13:28:28"]];

    	foreach ($danh_muc_hinhs as $danhmuc) {
    		App\DanhMucHinh::create([
    			'idSanPham' => $danhmuc[2],
    			'Hinh'=>$danhmuc[1]
    		]);
    	}
    	Schema::enableForeignKeyConstraints();
    }
}
