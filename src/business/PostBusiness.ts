import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto"
import { DeletePostInputDTO } from "../dtos/post/deletePost.dto"
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPost.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post, PostDB } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager,
        private likeDislikeDatabase: LikeDislikeDatabase
    ) { }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { token, content } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const id = this.idGenerator.generate()

        const newPost = new Post(
            id,
            payload.id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPostDB: PostDB = newPost.postToDBModel()
        await this.postDatabase.insertPost(newPostDB)

        const output: CreatePostOutputDTO = {
            content: content
        }

        return output
    }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token inválido")
        }

        const postsDB = await this.postDatabase.findPosts()

        const posts: GetPostsOutputDTO = postsDB.map((postDB) => {
            const post = new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            )
            return post.postToBusinessModel(postDB.creator_id, postDB.creatorName)
        })

        const output = posts

        return output
    }

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
        const { id, token, content } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new NotFoundError("Post com essa id não existe")
        }

        if (payload.id !== postDB.creator_id) {
            throw new BadRequestError("Somente quem criou o post pode editá-la")
        }

        const post = new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        )

        post.setContent(content)

        const updatedPostDB = post.postToDBModel()
        await this.postDatabase.updatedPost(updatedPostDB)

        const output: EditPostOutputDTO = {
            content: content
        }

        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
        const { token, id } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido")
        }

        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new NotFoundError("Post com essa id não existe")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== postDB.creator_id) {
                throw new BadRequestError("Somente quem criou o post pode editá-la")
            }
        }

        await this.postDatabase.deletePostById(id)

    }



}