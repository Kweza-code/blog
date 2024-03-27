import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator,
        password: passwordValidator,
        username: usernameValidator,
      },
    }),
    async ({
      input: {
        body: { email, password, username },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        username,
        email,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
  PATCH: [
    auth,
    validate({
      body: {
        email: emailValidator.optional(),
        username: usernameValidator.optional(),
      },
    }),
    async ({ session, input: { body }, models: { UserModel }, res }) => {
      const userId = session.userId

      const user = await UserModel.query().findById(userId)
      if (!user) {
        return res.status(404).send({ error: "User not found" })
      }

      const updatedUser = await UserModel.query().patchAndFetchById(
        userId,
        body,
      )

      res.send({ result: updatedUser })
    },
  ],
})

export default handle
