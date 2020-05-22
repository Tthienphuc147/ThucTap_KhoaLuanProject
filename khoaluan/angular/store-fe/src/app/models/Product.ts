export class Product {
    constructor(
        public id: number,
        public TenSanPham: string,
        public Hinh: string,
        public MoTa: string,
        public ThongTin: string,
        public idNSX: number,
        public TenNSX: number,
        public idDanhMuc: number,
        public TenDanhMuc: string,
        public price: number,
        public rate: number,
        public SoLuongTon: number,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
