/* eslint-disable padding-line-between-statements */
import apiClient from "@/web/services/apiClient"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient.get("/posts", { params: { page } })
  return {
    props: { initialData: data },
  }
}

const IndexPage = ({ initialData }) => {
  const posts = initialData || []

  return (
    <div className="container mx-auto px-4">
      {posts.length > 0 ? (
        posts.map(({ id, author, title, content, is_published }) => (
          <article key={id} className="mb-8 p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
            <div className="flex justify-between items-center mt-4">
              <small className="text-gray-600">
                {is_published ? "Published" : "Not Published"}
              </small>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => console.log(`Edit ${id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => console.log(`Delete ${id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  )
}

export default IndexPage
