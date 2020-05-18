export class Sanpham {
    public id: number;
    public TenSanPham: string;
    public Hinh: string;
    public MoTa: string;
    public ThongTin: string;
    public idNSX: number;
    public idDanhMuc: number;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        TenSanPham: string,
        Hinh: string,
        MoTa: string,
        ThongTin: string,
        idNSX: number,
        idDanhMuc: number,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.TenSanPham = TenSanPham;
        this.Hinh = Hinh;
        this.MoTa = MoTa;
        this.ThongTin = ThongTin;
        this.idNSX = idNSX;
        this.idDanhMuc = idDanhMuc;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
