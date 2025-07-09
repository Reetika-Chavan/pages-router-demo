export async function fetchPostById(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch post with ID ${id}`)
  }

  const post = await res.json()

  return {
    ...post,
    timestamp: new Date().toISOString(),
  }
}
