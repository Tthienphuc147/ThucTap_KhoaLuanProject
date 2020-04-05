<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(QuyenSeeder::class);
        $this->call(DanhMucSeeder::class);
        $this->call(NhaCungCapSeeder::class);
        $this->call(NhaSanXuatSeeder::class);
        $this->call(DiaDiemSeeder::class);
        $this->call(TrangThaiSeeder::class);
        $this->call(KhuyenMaiSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(SanPhamBanMuaSeeder::class);
        $this->call(DanhMucHinhSeeder::class);
        $this->call(ChiTietKhuyenMaiSeeder::class);
        $this->call(HoaDonNhapSeeder::class);
        $this->call(HoaDonXuatSeeder::class);
        $this->call(ChiTietHoaDonNhapSeeder::class);
        $this->call(ChiTietHoaDonXuatSeeder::class);
        
    }
}
