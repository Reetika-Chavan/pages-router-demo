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

    console.log(`Regenerating page for Post ID: ${id} at ${post.timestamp}`)

    return {
      props: {
        post,
      },
      revalidate: 10,
    }
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error)
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
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#555',
        }}
      >
        <strong>Timestamp:</strong> {post.timestamp}
        <br />
      </div>
    </div>
  )
}
