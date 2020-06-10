<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

	public function run()
	{	
		Schema::disableForeignKeyConstraints();
		DB::table('users')->truncate();

		$users = array(
			array('id' => '1','Ten' => 'nhan vien','DienThoai' => '090510101010','email' => 'nhanvien1@gmail.com','email_verified_at' => NULL,'DiaChi' => 'bui tan dien','password' => '$2y$10$vfjWRraDDmHsMYM8Pv3X.OY9PQ.ZazE8Humx8PKr0U2pu.algsK.G','Hinh' => '0mK3_baner2.png','remember_token' => 'AOGiCotN5HyAag2KUAFsIsUgVDyt98n4WRvfn8ByV6HGSus588kuhORkjs6v','idQuyen' => '2','idDiaDiem' => '12','status' => '0','created_at' => '2019-04-25 18:12:18','updated_at' => '2019-09-14 10:37:09')
			,
			array('id' => '2','Ten' => 'nhan vien 2','DienThoai' => 'null','email' => 'nhanvien2@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$JitXUsqlIKfWgmluaDg.Eu2BoGoYWtVNupO5w1V42Fh0sPBQ2VyH6','Hinh' => 'i4cp_doi-tra.jpg','remember_token' => '3CVY7BqXgm47LkzrvkM9rD0sM9zJT4qj6J6jsh6geWozNwYZB3vmqVmVyEyF','idQuyen' => '1','idDiaDiem' => '12','status' => '0','created_at' => '2019-04-25 18:14:11','updated_at' => '2019-08-21 16:09:36'),
			array('id' => '3','Ten' => 'lê văn hoàng 5','DienThoai' => '90537283','email' => 'khachhang@gmail.com','email_verified_at' => '2019-04-26 04:50:39','DiaChi' => '225 Trần Cao Vân','password' => '$2y$10$V5WxMt.0HVn9e1r98UcUoO6ts8G6RjWemaJB9u1qb3jVoYC5xQaKG','Hinh' => 'aRDc_c287e30e-23a9-47e7-bd68-70280835a2e8.png','remember_token' => 'nW6XRQ5A9aSJZZtF1pvl4ldvuIFsJLrdLIx0PiB6KhqlRbKxWcyEtWSO6q4W','idQuyen' => '3','idDiaDiem' => '12','status' => '1','created_at' => '2019-04-26 04:47:57','updated_at' => '2019-08-31 11:03:40'),
			array('id' => '4','Ten' => 'Admin 1','DienThoai' => '0905555777','email' => 'admin@gmail.com','email_verified_at' => '2019-04-26 11:39:17','DiaChi' => '15 Lê Duẩn','password' => '$2y$10$voiAkjA.0KrS/.aBE8y9uuS5WE49PK7vgdMrHyuiIZEsRNoRaDM0y','Hinh' => 'pk9R_bao-mat.jpg','remember_token' => '6gIltph4DoTstDO5xpKkIacrxlY3iUDjJhzWzCHY7WF3NwJnQ2AvNPVREw5r','idQuyen' => '1','idDiaDiem' => '12','status' => '0','created_at' => '2019-04-26 11:38:37','updated_at' => '2019-09-12 08:22:47'),
			array('id' => '5','Ten' => 'Nhan vien so 3','DienThoai' => 'null','email' => 'nhanvien3@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$cibaIqhc.X5dzOpzQEYiOu/hbZnZwGmUxIRnoPgBMYK0KZWZhldSW','Hinh' => 'null','remember_token' => NULL,'idQuyen' => '2','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-05-31 02:43:36','updated_at' => '2019-08-06 16:46:51'),
			array('id' => '6','Ten' => 'Lưu An','DienThoai' => '90537283','email' => 'khachhang4@gmail.com','email_verified_at' => '2019-06-01 17:16:09','DiaChi' => 'Hoảng hoa tham','password' => '$2y$10$NI3wMij5pJKKNMW.yNPbju2n1ZF3PqYHp2mP3ePySzTTcAMOquI.W','Hinh' => 'nv8r_15594094861808455155095152816166.jpg','remember_token' => 'drjeAIgt7JFsY0mmYmzklf07OCGHN7661nln7FDNfBAOY55EFqOdhFjUOYrf','idQuyen' => '3','idDiaDiem' => '13','status' => '0','created_at' => '2019-06-01 16:21:06','updated_at' => '2019-08-21 16:15:22'),
			array('id' => '7','Ten' => '123456','DienThoai' => '090550399','email' => 'khachhang2@gmail.com','email_verified_at' => NULL,'DiaChi' => 'Le Dai Hanh','password' => '$2y$10$qI0Qab.SosH.WLny78Sb1OpBhPzqYB5.J04dy5aIzwO5GsIt04asy','Hinh' => 'SVug_1-80e7f3aa-a076-4fca-b132-1be424b13f0b.jpg','remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => '29','status' => '0','created_at' => '2019-09-01 01:05:15','updated_at' => '2019-09-01 01:11:57'),
			array('id' => '11','Ten' => 'le an','DienThoai' => NULL,'email' => 'khachhang3@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$Vt4ZLVQVTD1.qRfqX3vJAOpdSGUr/6B5CvW.dn5U6aagbahlJY4My','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:29:48','updated_at' => '2019-09-01 01:29:48'),
			array('id' => '12','Ten' => 'le b','DienThoai' => NULL,'email' => 'khachhang5@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$NIjmZhIg.Zl1ga2FdkPqVOz6S1xYnWgru2KjZTp8AgLjnbDqBH80e','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:31:25','updated_at' => '2019-09-01 01:31:25'),
			array('id' => '13','Ten' => '123456','DienThoai' => NULL,'email' => 'khachhang6@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$O3m/1GSI1nS1mc/9H0C3eu0Rsbu5UPsuuzOgAURtVe6ey2w7M.GB2','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:32:59','updated_at' => '2019-09-01 01:32:59'),
			array('id' => '14','Ten' => '123456','DienThoai' => NULL,'email' => 'khachhang7@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$eOf1OFRq3KRe8m6arEjIPO328Vtr7TxWSpdgQiwX5lSr.Pvkt3fwW','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:35:08','updated_at' => '2019-09-01 01:35:08'),
			array('id' => '15','Ten' => 'gdfgdf','DienThoai' => NULL,'email' => 'khachhang8@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$OPDI76byuqdxnebPhzZCTuoZY7DH02bt7WesTGSu9oZ2RHHEobG2K','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:37:31','updated_at' => '2019-09-01 01:37:31'),
			array('id' => '16','Ten' => 'gfgdfg','DienThoai' => NULL,'email' => 'khachhang9@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$6CN5nPG1GIoKGicKNGSaDe0xg8skW3xhytri/sSMkq5NEoSpz8qGW','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:39:55','updated_at' => '2019-09-01 01:39:55'),
			array('id' => '17','Ten' => '123456','DienThoai' => NULL,'email' => 'khachhang10','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$MeYc4.RsCdQCozKh7EHw1OL.c1WgXUfesSXPSzL.6qdBZJZ7MjoSm','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:40:39','updated_at' => '2019-09-01 01:40:39'),
			array('id' => '18','Ten' => 'gdfjhgdkjfg','DienThoai' => NULL,'email' => 'khachhang1','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$f6O1cfjaY2jtQ7nWYIa5/.KW5J1I04aipICe1FFMxwXuLS3I/28lu','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-01 01:43:19','updated_at' => '2019-09-01 01:43:19'),
			array('id' => '19','Ten' => 'Trần Sanh','DienThoai' => NULL,'email' => 'khach1@gmail.com','email_verified_at' => NULL,'DiaChi' => NULL,'password' => '$2y$10$Hw/VFZAJIbdO26G2FgZTUOhZTiWNGVh/4t/8uOn.XaIavr3v/9FK2','Hinh' => NULL,'remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => NULL,'status' => '0','created_at' => '2019-09-04 22:10:51','updated_at' => '2019-09-04 22:10:51'),
			array('id' => '20','Ten' => 'Lê Bá','DienThoai' => '09058181811','email' => 'khach2@gmail.com','email_verified_at' => NULL,'DiaChi' => '45 Lê Hoàn','password' => '$2y$10$IfuiNJ98AGpgwS23xL03jemincWvYKK0mxnAVZ/8EY274zF3CMtKC','Hinh' => 'S2Na_bao-hanh.jpg','remember_token' => NULL,'idQuyen' => '3','idDiaDiem' => '26','status' => '0','created_at' => '2019-09-04 22:12:22','updated_at' => '2019-09-04 22:14:04')

		);
foreach ($users as $item) {
	App\User::create([
		'Ten' => $item['Ten'],
		'DienThoai'=>$item['DienThoai'],
		'email'=>$item['email'],
		'DiaChi'=>$item['DiaChi'],
		'password'=>$item['password'],
		'idQuyen'	=>$item['idQuyen'],
		'idDiaDiem' =>$item['idDiaDiem'],
		'status'=>$item['status'],

	]);
}

Schema::enableForeignKeyConstraints();
}
}
