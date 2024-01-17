import { Model } from "objection"
import BaseModel from "./BaseModel"
import UserModel from "./UserModel"
import PostModel from "./PostModel"

class CommentModel extends BaseModel {
  static get tableName() {
    return "comments"
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: "comments.post_id",
          to: "posts.id",
        },
      },
    }
  }
}

export default CommentModel
