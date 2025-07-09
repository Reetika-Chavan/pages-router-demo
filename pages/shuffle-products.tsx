import { GetServerSideProps } from 'next'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  randomNum: number
}

type ShuffleProps = {
  product: Product
}

export const getServerSideProps: GetServerSideProps<ShuffleProps> = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()

  const randomIndex = Math.floor(Math.random() * data.length)
  const randomProduct = data[randomIndex]

  const randomNum = Math.floor(Math.random() * 1000) + 1

  const product: Product = {
    id: randomProduct.id,
    title: randomProduct.title,
    price: randomProduct.price,
    description: randomProduct.description,
    category: randomProduct.category,
    image: randomProduct.image,
    randomNum,
  }

  return {
    props: {
      product,
    },
  }
}

export default function ShuffleProducts({ product }: ShuffleProps) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Random Product
      </h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', maxWidth: '500px' }}>
        <img src={product.image} alt={product.title} style={{ width: '100%', marginBottom: '1rem' }} />
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Title:</strong> {product.title}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Random Number:</strong> {product.randomNum}</p>
      </div>
    </div>
  )
}
