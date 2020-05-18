export class KhuyenMai {
    public id: number;
    public Ten: string;
    public MoTa: string;
    public NgayBD: Date;
    public NgayKT: Date;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        Ten: string,
        MoTa: string,
        NgayBD: Date,
        NgayKT: Date,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.Ten = Ten;
        this.MoTa = MoTa;
        this.NgayBD = NgayBD;
        this.NgayKT = NgayKT;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
