export class Todo {
    id: number;
    text: string;
    status: string;

    constructor(text: string, status: string, id?: number) {
        this.id = id ? id : null;
        this.text = text;
        this.status = status;
    }
}