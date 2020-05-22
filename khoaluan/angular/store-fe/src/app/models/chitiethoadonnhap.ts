export class ChiTietHoaDonNhap {
    public id: number;
    public SoLuong: number;
    public GiaNhap: number;
    public GiaBan: number;
    public idHDN: number;
    public idSanPham: number;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        soluong: number,
        gianhap: number,
        giaban: number,
        idhdn: number,
        idsanpham: number,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.SoLuong = soluong;
        this.GiaNhap = gianhap;
        this.GiaBan = giaban;
        this.idHDN = idhdn;
        this.idSanPham = idsanpham;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
