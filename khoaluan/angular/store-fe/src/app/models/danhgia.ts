export class DanhGia {
    constructor(
        public id: number,
        public Diem: number,
        public NoiDung: string,
        public idUser: number,
        public TenSanPham: string,
        public TenUser: string,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
