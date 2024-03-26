import { useRouter } from "next/router"
import apiClient from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"

const initialValues = {
  title: "",
  content: "",
}

const validationSchema = Yup.object({
  title: Yup.string().required("The title is required"),
  content: Yup.string().required("Content is required"),
})

const EditPostPage = () => {
  const router = useRouter()
  const { postId } = router.query

  const updateMutation = useMutation({
    mutationFn: (postData) => apiClient.patch(`/posts/${postId}`, postData),
    onSuccess: () => router.push("/"),
  })

  const handleSubmit = (values) => {
    updateMutation.mutate(values)
  }

  return (
    <div className="max-w-lg mx-auto my-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <FormField name="title" type="text" label="Title" />
            <FormField
              name="content"
              type="text"
              label="Content"
              as="textarea"
              rows="4"
            />
            <SubmitButton type="submit">Update Post</SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditPostPage
