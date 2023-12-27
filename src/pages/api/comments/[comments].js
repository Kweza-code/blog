import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { idValidator, commentTextValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async ({
      models: { CommentModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      const comments = await CommentModel.query().where({ postId })
      res.send(comments)
    },
  ],
  POST: [
    validate({
      body: {
        postId: idValidator,
        text: commentTextValidator,
      },
    }),
    async ({ models: { CommentModel }, input: { body }, res }) => {
      const newComment = await CommentModel.query().insert(body)
      res.status(201).send(newComment)
    },
  ],
  DELETE: [
    validate({
      query: {
        commentId: idValidator,
      },
    }),
    async ({
      models: { CommentModel },
      input: {
        query: { commentId },
      },
      res,
    }) => {
      await CommentModel.query().deleteById(commentId)
      res.status(204).send()
    },
  ],
})

export default handle
