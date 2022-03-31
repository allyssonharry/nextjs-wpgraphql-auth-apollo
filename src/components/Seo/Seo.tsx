import Head from 'next/head'

interface SEOProps {
  title: string
  description?: string
}

export default function SEO(prop: SEOProps) {
  return (
    <Head>
      <title>{prop.title}</title>
    </Head>
  )
}
