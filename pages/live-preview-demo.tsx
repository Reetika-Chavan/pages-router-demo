import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { Stack } from '../lib/contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

type Props = {
  initialQuote: string
}

export default function LivePreviewDemo({ initialQuote }: Props) {
  const [quote, setQuote] = useState(initialQuote)

  useEffect(() => {
    ContentstackLivePreview.onEntryChange(() => {
      fetch('/api/quote')
        .then((res) => res.json())
        .then((data) => {
          if (data?.quote) {
            setQuote(data.quote)
          }
        })
    })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎤 Live Preview Demo</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{quote}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const Query = Stack.ContentType('quote').Query()
  const result = await Query.toJSON().find()
  const entry = result[0][0]

  return {
    props: {
      initialQuote: entry?.line || '',
    },
    revalidate: 10,
  }
}
