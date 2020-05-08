export class ChiTietHoaDonXuat {
    public id: number;
    public SoLuong: number;
    public DonGia: number;
    public MaDotNhap: number;
    public idHDX: number;
    public idSanPham: number;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        soluong: number,
        dongia: number,
        madotnhap: number,
        idhdx: number,
        idsanpham: number,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.SoLuong = soluong;
        this.DonGia = dongia;
        this.MaDotNhap = madotnhap;
        this.idHDX = idhdx;
        this.idSanPham = idsanpham;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
