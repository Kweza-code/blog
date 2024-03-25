import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
const handle = mw({
  GET: [
    async ({ models: { PostModel }, req, res }) => {
      const posts = await PostModel.query().withGraphFetched("comments")
      res.status(200).json(posts)
    },
  ],
  POST: [
    auth,
    async ({ session, models: { PostModel }, req, res }) => {
      try {
        const userId = session.id
        console.log("trigger")
        const postData = {
          ...req.body,
          user_id: userId,
        }

        const newPost = await PostModel.query().insertGraph(postData)
        res.status(201).json(newPost)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Something wrong with the server" })
      }
    },
  ],
})

export default handle
