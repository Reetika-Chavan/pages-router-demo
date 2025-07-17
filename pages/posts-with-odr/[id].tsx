import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { fetchPostById } from '../../lib/fetchPost'

type Post = {
  userId: number
  id: number
  title: string
  body: string
  timestamp: string
}

type Props = {
  post: Post
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params as { id: string }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${id}`)
  if (!res.ok) {
    return { notFound: true }
  }

  const post = await res.json()

  context.res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=40, stale-while-revalidate'
  )

  return {
    props: {
      post,
    },
  }
}


export default function PostWithODR({ post }: Props) {
  const router = useRouter()
  if (router.isFallback) return <p>Loading...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📄 Post #{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p style={{ marginTop: '1rem', color: 'gray' }}>
        <strong>Timestamp:</strong> {post.timestamp}
      </p>
    </div>
  )
}
