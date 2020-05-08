export class DanhMucHinh {
    public id: number;
    public Hinh: string;
    public idSanPham: number;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, Hinh: string, idSanPham: number, created_at: Date, updated_at: Date) {
        this.id = id;
        this.Hinh = Hinh;
        this.idSanPham = idSanPham;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
