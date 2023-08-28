import { PostDB, PostModelDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

    public findPosts = async (): Promise<PostModelDB[]> => {
        const postsDB: PostModelDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.id as creatorId",
                "users.name as creatorName"
            )
            .innerJoin("users", "users.id", "posts.creator_id")

        return postsDB
    }

    public async findPostById(id: string): Promise<PostDB | undefined> {
        const [postDB] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({id})
        
        return postDB as PostDB | undefined
    } 

    public async insertPost(newPostDB: PostDB): Promise<void>{
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }

    public async updatedPost(newPostDB: PostDB): Promise<void>{
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(newPostDB)
            .where({ id: newPostDB.id})
    }

    public async deletePostById(id: string): Promise<void>{
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({id})
    }
}