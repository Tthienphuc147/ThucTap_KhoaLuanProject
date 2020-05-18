
export class ChiTietKhuyenMai {
    public id: number;
    public TiLe: number;
    public idKhuyenMai: number;
    public idSanPham: number;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        Tile: number,
        idKhuyenMai: number,
        idSanPham: number,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.TiLe = Tile;
        this.idKhuyenMai = idKhuyenMai;
        this.idSanPham = idSanPham;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
