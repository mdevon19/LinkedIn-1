import { Category } from "./category";

/**
 * This model represents a Post in our app
 */
export class Post{
    id: number;
    desc: String;
    postCat: Category;
}