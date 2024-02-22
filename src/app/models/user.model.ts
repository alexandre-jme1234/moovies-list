export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    role: string
}

export interface UserStored {
    identifier: string,
    username: string,
    password: string,
    profil_img: string
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