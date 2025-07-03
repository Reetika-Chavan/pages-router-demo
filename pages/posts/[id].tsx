// pages/posts/[id].tsx

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

type PostPageProps = {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [1, 2, 3, 4, 5].map((id) => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (context) => {
  const { id } = context.params as { id: string }

  try {
    const post = await fetchPostById(id)

    return {
      props: {
        post,
      },
      revalidate: 10,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>📝 Post #{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p style={{ marginTop: '1rem', color: 'gray' }}>
        <strong>Timestamp:</strong> {post.timestamp}
      </p>
    </div>
  )
}
