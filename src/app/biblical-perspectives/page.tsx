import Link from 'next/link'
import { biblicalPosts } from '@/lib/biblicalPerspectives'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const metadata = {
  title: 'Biblical Perspectives | Church of Music',
  description: 'Reflections on scripture, music, and how the Holy Spirit works through all genres to draw people closer to God.',
}

export default async function BiblicalPerspectivesPage() {
  let artistPerspectives: any[] = []
  try {
    const { data } = await supabase
      .from('artist_perspectives')
      .select('id, title, excerpt, artists(id, name)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
    artistPerspectives = data ?? []
  } catch {
    artistPerspectives = []
  }

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="perspectives-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="perspectives-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Biblical Perspectives
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            We reflect on scripture and the ways the Holy Spirit moves through music—all genres, all cultures—to captivate, connect, unify, and draw people closer to God. Each post begins with biblical text and explores how God works through human experience, nature, and music to bring healing, community, and meaning. Artist perspectives share personal stories from our spiritual leaders.
          </p>

          {artistPerspectives.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">From Our Artists</h2>
              <ul className="space-y-8 mb-12" role="list">
                {artistPerspectives.map((p: any) => {
                  const artist = p.artists as { id: string; name: string } | null
                  return (
                    <li key={p.id}>
                      <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0] hover:border-[#1b5e3f] transition-colors">
                        <Link href={`/biblical-perspectives/artist/${p.id}`} className="block group">
                          <p className="text-sm text-[#1b5e3f] font-semibold mb-2">Written By {artist?.name ?? 'Artist'}</p>
                          <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4 group-hover:text-[#1b5e3f] transition-colors">
                            {p.title}
                          </h2>
                          <p className="text-[#4a5568] leading-relaxed mb-4">{p.excerpt}</p>
                          <span className="inline-block text-[#1b5e3f] font-semibold group-hover:underline">
                            Read more →
                          </span>
                        </Link>
                      </article>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Scripture & Music</h2>
          <ul className="space-y-8" role="list">
            {biblicalPosts.map((post) => (
              <li key={post.slug}>
                <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0] hover:border-[#1b5e3f] transition-colors">
                  <Link href={`/biblical-perspectives/${post.slug}`} className="block group">
                    <p className="text-sm text-[#1b5e3f] font-semibold mb-2">{post.reference}</p>
                    <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4 group-hover:text-[#1b5e3f] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#4a5568] leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="inline-block text-[#1b5e3f] font-semibold group-hover:underline">
                      Read more →
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
