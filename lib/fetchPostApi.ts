export async function fetchPostApi(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/posts/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id} via API`)
  }

  return res.json()
}
