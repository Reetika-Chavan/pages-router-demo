
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const webhookUrl = process.env.LAUNCH_REVALIDATE_WEBHOOK_URL

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Missing webhook URL in environment variables.' })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }) 
    })

    const resultText = await response.text()

    if (!response.ok) {
      throw new Error(`Launch Automate failed: ${resultText}`)
    }

    return res.status(200).json({
      revalidated: true,
      postId: id,
      triggeredAt: new Date().toISOString(),
      result: resultText
    })
  } catch (error: any) {
    console.error('Revalidation error:', error.message)
    return res.status(500).json({
      error: 'Launch revalidation failed',
      details: error.message
    })
  }
}
