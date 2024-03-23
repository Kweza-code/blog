import { useState } from "react"

const Create = () => {
  // État pour gérer les entrées du formulaire
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Gère la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Préparation des données à envoyer
    const postData = {
      title,
      content,
    }

    try {
      // Envoie les données à l'API et attend la réponse
      const response = await fetch("/api/path-to-your-post-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.status}`)
      }

      const result = await response.json()
      console.log(result)

      // Réinitialise le formulaire ou redirige l'utilisateur comme nécessaire
      setTitle("")
      setContent("")
      alert("Post créé avec succès !")
    } catch (error) {
      console.error("Échec de la création du post", error)
      alert("Échec de la création du post")
    }
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Contenu:</label>
          <br />
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  )
}

export default Create
