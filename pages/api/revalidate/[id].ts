import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  try {
    // Revalidate the page at /posts-with-odr/[id]
    await res.revalidate(`/posts-with-odr/${id}`)
    return res.status(200).json({ revalidated: true, id })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: err })
  }
}
