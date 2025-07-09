import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const revalidateUrl = `${process.env.NEXT_PUBLIC_LAUNCH_URL}/.launch/revalidate`

  try {
    const launchResponse = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
     
      },
      body: JSON.stringify({
        paths: [`/posts-with-odr/${id}`],
        prefix: false
      })
    })

    const responseData = await launchResponse.json()

    if (!launchResponse.ok) {
      throw new Error(responseData.message || 'Failed to revalidate')
    }

    return res.status(200).json({
      revalidated: true,
      postId: id,
      triggeredAt: new Date().toISOString(),
      result: responseData
    })
  } catch (error: any) {
    console.error('Launch revalidation error:', error.message)
    return res.status(500).json({
      error: 'Launch revalidation failed',
      details: error.message
    })
  }
}
