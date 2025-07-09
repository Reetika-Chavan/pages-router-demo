import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPostById } from '../../../lib/fetchPost'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const post = await fetchPostById(id)
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch post' })
  }
}
