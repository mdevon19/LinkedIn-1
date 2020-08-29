import { Category } from "./category";
import { Post } from "./post";

/**
 * This model represents a user in our app
 */
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