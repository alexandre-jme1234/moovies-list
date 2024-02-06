export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    role: string
}



export class UserAuth implements User {
    constructor(
        public id:  number,
        public username: string,
        public email: string,
        public password: string,
        public role: string = "1"
        ) {}
}