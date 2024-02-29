export interface Comment {
    // id: string;
    identifier: string;
    title: string;
    comment_body: string;
    id_moovie: string;
}

export interface CommentTest extends Comment {
    like: number;
    img_moovie: string;
    img_profil: string
}

