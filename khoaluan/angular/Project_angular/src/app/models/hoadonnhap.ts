export class HoaDonNhap {
    public id: number;
    public idUser: number;
    public NgayNhap: number;
    public idNCC: number;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, iduser: number, ngaynhap: number, idncc: number, created_at: Date, updated_at: Date) {
        this.id = id;
        this.idUser = iduser;
        this.NgayNhap = ngaynhap;
        this.idNCC = idncc;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
