import { FormControl } from "@angular/forms";

export interface User {
    id: number,
    username: string,
    identifier: string,
    password: string
}

export class UserAuth implements User {
    constructor(
        public id:  number,
        public username: string,
        public identifier: string,
        public password: string
        ) {}
}