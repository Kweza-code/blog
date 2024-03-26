import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"

const validationSchema = Yup.object({
  title: Yup.string().required("Le titre est obligatoire"),
  content: Yup.string().required("Le contenu est obligatoire"),
})

const Create = () => {
  const router = useRouter()

  const createPostMutation = useMutation({
    mutationFn: (newPost) => apiClient.post("/posts", newPost),
    onSuccess: () => {
      router.push("/")
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Créer un nouveau post</h1>
      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          createPostMutation.mutate(values)
          resetForm()
        }}
      >
        <Form className="space-y-4">
          <FormField
            name="title"
            type="text"
            label="Titre"
            placeholder="Enter the title of your post here"
          />
          <FormField
            name="content"
            as="textarea"
            label="Contenu"
            placeholder="Enter the content of your post here"
            rows="4"
          />
          <SubmitButton
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  )
}

export default Create
