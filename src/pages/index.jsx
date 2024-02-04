import { formatDateTimeShort } from "@/utils/formatters"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const getServerSideProps = async () => {
  const data = await apiClient.get("/posts")
  return {
    props: { initialData: data },
  }
}

const IndexPage = ({ initialData }) => {
  const { isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient.get("/posts"),
    initialData,
    enabled: !!initialData,
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => apiClient.delete(`/posts/${postId}`),
    onSuccess: () => {
      refetch()
    },
  })

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteMutation.mutate(postId)
    }
  }

  if (isFetching) return <Loader />

  const posts = refetch.data || initialData

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="list-disc space-y-4">
        {posts.map(({ id, title, content }) => (
          <li key={id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-700">{content}</p>

            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
