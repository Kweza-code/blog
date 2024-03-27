import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "@/web/components/SessionContext"
import { useRouter } from "next/router"

export const getServerSideProps = async () => {
  const data = await apiClient.get("/posts")
  return {
    props: { initialData: data },
  }
}

const IndexPage = ({ initialData }) => {
  const { session } = useSession()
  const router = useRouter()

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

  const handleEditClick = (id) => {
    router.push(`/patch/${id}`)
  }

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteMutation.mutate(postId)
    }
  }

  if (isFetching) return <Loader />

  const posts = refetch.data || initialData

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="list-none space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500 text-sm mt-2">
              Auteur: {post.authorUsername}
            </p>

            {session &&
              (session.role === "admin" || session.id === post.user_id) && (
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
