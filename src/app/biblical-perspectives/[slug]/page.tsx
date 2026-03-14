import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/biblicalPerspectives'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Biblical Perspectives | Church of Music' }
  return {
    title: `${post.title} | Biblical Perspectives`,
    description: post.excerpt,
  }
}

function formatBody(body: string) {
  return body.split('\n\n').map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g)
    const rendered = parts.map((part, j) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={j} className="text-[#1a1a1a] font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    )
    const isSubhead = para.startsWith('**') && para.indexOf('**', 2) < 20
    return (
      <p
        key={i}
        className={`leading-relaxed mb-4 ${isSubhead ? 'text-[#1a1a1a] font-semibold mt-6 mb-2' : 'text-[#4a5568]'}`}
      >
        {rendered}
      </p>
    )
  })
}

export default async function BiblicalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen">
      <article className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="post-title">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/biblical-perspectives"
            className="text-[#1b5e3f] font-semibold hover:underline mb-8 inline-block"
          >
            ← All Biblical Perspectives
          </Link>
          <header className="mb-12">
            <p className="text-sm text-[#1b5e3f] font-semibold mb-2">{post.reference}</p>
            <h1 id="post-title" className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              {post.title}
            </h1>
            <p className="text-[#4a5568] text-lg">{post.excerpt}</p>
          </header>

          <blockquote className="pl-6 border-l-4 border-[#1b5e3f] text-[#4a5568] italic mb-12 bg-[#ffffff] p-6 rounded-r-lg border border-[#e2e8f0]">
            {post.scripture.split('\n').map((line, i) => (
              <p key={i} className="mb-2 last:mb-0">
                {line}
              </p>
            ))}
            <cite className="block mt-4 not-italic text-sm text-[#1b5e3f] font-semibold">
              — {post.reference}
            </cite>
          </blockquote>

          <div className="prose-p:mb-4 prose-p:leading-relaxed prose-p:text-[#4a5568]">
            {formatBody(post.body)}
          </div>

          <Link
            href="/biblical-perspectives"
            className="inline-block mt-12 text-[#1b5e3f] font-semibold hover:underline"
          >
            ← Back to Biblical Perspectives
          </Link>
        </div>
      </article>
    </div>
  )
}
