export class DanhMuc {
    constructor(
        public id: number,
        public Ten: string,
        public idParent: number,
        public Hinh: string,
        public created_at: Date,
        public updated_at: Date,
        public NameParent: string
    ) {}
}
