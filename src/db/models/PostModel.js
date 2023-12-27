import { Model } from "objection"

class Post extends Model {
  static get tableName() {
    return "posts"
  }

  static get relationMappings() {
    const User = require("./User")
    const Comment = require("./Comment")

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.user_id",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
    }
  }
}

export default Post
