export class DiaDiem {
    public id: number;
    public Ten: number;
    public idParent: any;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, ten: number, idparent: any, created_at: Date, updated_at: Date) {
        this.id = id;
        this.Ten = ten;
        this.idParent = idparent;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
