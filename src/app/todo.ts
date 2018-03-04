export class Todo {
    id: number;
    text: string;
    status: string;

    constructor(id: number, text: string, status: string) {
        this.id = id;
        this.text = text;
        this.status = status;
    }
}