import { Model } from "objection"

class Comment extends Model {
  static get tableName() {
    return "comments"
  }

  static get relationMappings() {
    const User = require("./User")
    const Post = require("./Post")

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "comments.post_id",
          to: "posts.id",
        },
      },
    }
  }
}

export default Comment
