import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { Stack } from '../lib/contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

type Props = {
  initialTitle: string
  initialQuote: string
}

export default function LivePreviewDemo({ initialTitle, initialQuote }: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [quote, setQuote] = useState(initialQuote)

  useEffect(() => {
    ContentstackLivePreview.onEntryChange(() => {
      fetch('/api/quote')
        .then((res) => res.json())
        .then((data) => {
          if (data?.quote) {
            setQuote(data.quote)
          }
          if (data?.title) {
            setTitle(data.title)
          }
        })
    })
  }, [])

  return (
    <div style={{
      padding: '3rem',
      fontFamily: 'Georgia, serif',
      background: '#f4f4f4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        {title}
      </h1>
      <blockquote style={{
        fontSize: '1.75rem',
        fontStyle: 'italic',
        color: '#555',
        borderLeft: '5px solid #888',
        padding: '1rem 2rem',
        background: '#fff',
        maxWidth: '700px',
        lineHeight: '1.6',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}>
        {quote}
      </blockquote>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const Query = Stack.ContentType('quote').Query()
  const result = await Query.toJSON().find()
  const entry = result[0][0]

  return {
    props: {
      initialTitle: entry?.title || 'Live Preview Demo',
      initialQuote: entry?.bookquote || '',
    },
    revalidate: 10,
  }
}
