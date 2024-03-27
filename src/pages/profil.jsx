import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { useSession } from "@/web/components/SessionContext"
import { useRouter } from "next/router"

const validationSchema = Yup.object({
  username: Yup.string().required("Le nom d'utilisateur est obligatoire"),
})

const Profile = () => {
  const { session } = useSession()
  const router = useRouter()
  console.log(session.userId)
  console.log(session.username)
  const updateUsernameMutation = useMutation({
    mutationFn: (username) =>
      apiClient.patch(`/users/${session.userId}`, username),
    onSuccess: () => {},
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">
        Changer le nom d'utilisateur
      </h1>
      <Formik
        initialValues={{ username: session.username || "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          updateUsernameMutation.mutate({ username: values.username })
          setSubmitting(false)
        }}
      >
        <Form className="space-y-4">
          <FormField
            name="username"
            type="text"
            label="Nouveau nom d'utilisateur"
            placeholder="Entrez votre nouveau nom d'utilisateur"
          />
          <SubmitButton type="submit">Mettre à jour</SubmitButton>
        </Form>
      </Formik>
    </div>
  )
}

export default Profile
