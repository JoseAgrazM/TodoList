import { v4 as uuidv4 } from "uuid";

export class Todo {

    constructor(description){
        this.id = uuidv4();
        this.description = description;
        this.createAt = new Date();
        this.done = false

    }
}