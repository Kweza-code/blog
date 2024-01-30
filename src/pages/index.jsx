/* eslint-disable padded-blocks */
/* eslint-disable no-alert */
/* eslint-disable padding-line-between-statements */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"

export const getServerSideProps = async () => {
  let data = []

  try {
    const response = await apiClient.get("/posts")
    data = response.data || []
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error)
  }

  return {
    props: { initialData: data },
  }
}

const IndexPage = ({ initialData }) => {
  const queryClient = useQueryClient()

  const deletePost = useMutation(
    (postId) => apiClient.delete(`/posts/${postId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"])
      },
    },
  )

  const handleDelete = (postId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deletePost.mutate(postId)
    }
  }

  return (
    <div className="container mx-auto px-4">
      {initialData.length > 0 ? (
        initialData.map(({ id, title, content }) => (
          <article key={id} className="mb-8 p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))
      ) : (
        <p>Aucun post à afficher.</p>
      )}
    </div>
  )
}

export default IndexPage
