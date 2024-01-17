import { Model } from "objection"
import BaseModel from "./BaseModel"
import UserModel from "./UserModel"
import CommentModel from "./CommentModel"

class PostModel extends BaseModel {
  static get tableName() {
    return "posts"
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.user_id",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
    }
  }
}

export default PostModel
