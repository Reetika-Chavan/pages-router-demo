import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }

  try {
    await res.revalidate(`/posts-with-odr/${id}`)

    return res.status(200).json({
      revalidated: true,
      postId: id,
      triggeredAt: new Date().toISOString(),
    })
  } catch (err) {
    return res.status(500).json({ error: 'Revalidation failed' })
  }
}
