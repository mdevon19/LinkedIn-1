import { Category } from "./category";
import { Post } from "./post";

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    userCats: Category[];
    appliedPosts: Post[];
    userPosts: Post[];
}