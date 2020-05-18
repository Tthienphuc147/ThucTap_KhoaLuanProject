export class HoaDonXuat {
    public id: number;
    public NguoiNhan: string;
    public DiaChi: string;
    public DienThoai: number;
    public idTrangThai: number;
    public idUser: number;
    public idDiaDiem: number;
    public LiDo: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        nguoinhan: string,
        diachi: string,
        dienthoai: number,
        idtrangthai: number,
        iduser: number,
        iddiadiem: number,
        lido: string,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.NguoiNhan = nguoinhan;
        this.DiaChi = diachi;
        this.DienThoai = dienthoai;
        this.idTrangThai = idtrangthai;
        this.idUser = iduser;
        this.idDiaDiem = iddiadiem;
        this.LiDo = lido;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
