import type { NextApiRequest, NextApiResponse } from 'next'
import { Stack } from '../../lib/contentstack'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const Query = Stack.ContentType('quote').Query()
    const response = await Query.toJSON().find()
    const entry = response?.[0]?.[0]

    if (!entry) {
      return res.status(404).json({ title: null, quote: null })
    }

    res.status(200).json({
      title: entry.title || 'Untitled',
      quote: entry.bookquote || 'No quote available',
    })
  } catch (err) {
    console.error('API Error:', err)
    res.status(500).json({ title: null, quote: null })
  }
}
