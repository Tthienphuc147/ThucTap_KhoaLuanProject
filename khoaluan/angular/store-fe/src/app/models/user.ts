export class User {
    public id: number;
    public Ten: string;
    public DienThoai: string;
    public email: string;
    public email_verified_at: string;
    public DiaChi: number;
    public password: number;
    public Hinh: number;
    public remember_token: string;
    public idQuyen: number;
    public idDiaDiem: number;
    public status: boolean;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        Ten: string,
        DienThoai: string,
        email: string,
        email_verified_at: string,
        DiaChi: number,
        password: number,
        Hinh: number,
        remember_token: string,
        idQuyen: number,
        idDiaDiem: number,
        status: boolean,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.Ten = Ten;
        this.DienThoai = DienThoai;
        this.email = email;
        this.email_verified_at = email_verified_at;
        this.DiaChi = DiaChi;
        this.password = password;
        this.Hinh = Hinh;
        this.remember_token = remember_token;
        this.idQuyen = idQuyen;
        this.idDiaDiem = idDiaDiem;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
