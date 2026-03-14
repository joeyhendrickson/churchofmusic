import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

export default async function ArtistPerspectivePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: perspective, error } = await supabase
    .from('artist_perspectives')
    .select('id, title, excerpt, body, artists(id, name)')
    .eq('id', id)
    .eq('status', 'approved')
    .single()

  if (error || !perspective) notFound()

  const artist = perspective.artists as { id: string; name: string } | null
  const artistName = artist?.name ?? 'Artist'

  return (
    <div className="min-h-screen">
      <article className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="post-title">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/biblical-perspectives"
            className="text-[#1b5e3f] font-semibold hover:underline mb-8 inline-block"
          >
            ← All Perspectives
          </Link>
          <header className="mb-12">
            <p className="text-sm text-[#1b5e3f] font-semibold mb-2">
              Written By {artistName}
            </p>
            <h1 id="post-title" className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              {perspective.title}
            </h1>
            <p className="text-[#4a5568] text-lg">{perspective.excerpt}</p>
          </header>
          <div className="prose-p:mb-4 prose-p:leading-relaxed">
            {perspective.body && formatBody(perspective.body)}
          </div>
          <p className="mt-8 text-[#4a5568] text-sm">
            Written By <Link href={artist ? `/artist/${artist.id}` : '#'} className="text-[#1b5e3f] font-semibold hover:underline">{artistName}</Link>
          </p>
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
