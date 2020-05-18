export class Quyen {
    public id: number;
    public Ten: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, ten: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.Ten = ten;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}