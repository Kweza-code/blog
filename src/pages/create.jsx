import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"

const Create = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const createPostMutation = useMutation({
    mutationFn: (newPost) => apiClient.post("/posts", newPost),
    onSuccess: () => {
      router.push("/")
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    createPostMutation.mutate({
      title,
      content,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Créer un nouveau post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Titre
          </label>
          <input
            id="title"
            type="text"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Contenu
          </label>
          <textarea
            id="content"
            required
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer
        </button>
      </form>
    </div>
  )
}

export default Create
