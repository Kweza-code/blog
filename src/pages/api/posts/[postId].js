import mw from "@/api/mw"

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
  POST: [
    async ({ models: { PostModel }, req: { body }, res }) => {
      const newPost = await PostModel.query().insertGraph(body)
      res.status(201).send(newPost)
    },
  ],
  PATCH: [
    async ({
      models: { PostModel },
      req: {
        body,
        query: { postId },
      },
      res,
    }) => {
      const updatedPost = await PostModel.query()
        .patchAndFetchById(postId, body)
        .throwIfNotFound()
      res.send(updatedPost)
    },
  ],
  DELETE: [
    async ({
      models: { PostModel },
      req: {
        query: { postId },
      },
      res,
    }) => {
      await PostModel.query().deleteById(postId)
      res.status(204).send()
    },
  ],
})

export default handle
