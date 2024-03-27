import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"



const handle = mw({
  GET: [
    async ({
      models: { PostModel },
      req: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("[comments]")
        .throwIfNotFound()
      res.send(post)
    },
  ],

  PATCH: [
    auth,
    async ({ session, models: { PostModel }, req, res }) => {
      const { postId } = req.query
      const { id: userId, role } = session

      try {
        const post = await PostModel.query().findById(postId)
        if (!post) {
          return res.status(404).json({ error: "Post not found" })
        }
        if (role !== "admin" && post.user_id !== userId) {
          return res.status(403).json({ error: "Not authorized" })
        }
        const updatedPost = await PostModel.query().patchAndFetchById(
          postId,
          req.body,
        )
        res.status(200).json(updatedPost)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
      }
    },
  ],

  DELETE: [
    auth,
    async ({ session, models: { PostModel }, req, res }) => {
      const { postId } = req.query
      const { id: userId, role } = session

      try {
        const post = await PostModel.query().findById(postId)

        if (role !== "admin" && post.user_id !== userId) {
          return res
            .status(HTTP_ERRORS.NOT_FOUND)
            .json({ error: "Delete not possible" })
        }

        await PostModel.query().deleteById(postId)
        res.status(204).send()
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
      }
    },
  ],
})

export default handle
