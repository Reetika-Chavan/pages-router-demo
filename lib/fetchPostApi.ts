export async function fetchPostApi(id: string) {
  const isBuildTime = typeof window === 'undefined' && process.env.NEXT_PHASE === 'phase-production-build'

  const baseUrl = isBuildTime
    ? 'http://localhost:3000' 
    : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/posts/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id} via API`)
  }

  return res.json()
}
