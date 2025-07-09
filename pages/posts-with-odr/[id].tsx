// pages/posts-with-odr/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next'
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id } = context.params as { id: string }
  try {
    const post = await fetchPostById(id)
    return {
      props: {
        post,
      },
    }
  } catch {
    return {
      notFound: true,
    }
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
