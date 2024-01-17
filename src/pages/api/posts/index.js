/* eslint-disable no-unused-vars */
import mw from "@/api/mw"

const handle = mw({
  GET: [
    async ({ models: { PostModel }, req, res }) => {
      const posts = await PostModel.query().withGraphFetched("comments")
      res.status(200).json(posts)
    },
  ],
})

export default handle
