import { Layout } from '../components/Layout'
import { SEO } from '../components/Seo'

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page Not Found" />
      <h1>Página não encontrada :(</h1>
    </Layout>
  )
}
