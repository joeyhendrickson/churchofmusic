'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

interface Artist {
  id: string
  name: string
  bio: string
  image_url: string
}

export default function ArtistsAsLeadersSection() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArtists() {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select('id, name, bio, image_url')
          .eq('status', 'approved')
          .order('name')

        if (error) {
          console.error('Error fetching artists:', error.message)
        } else {
          setArtists(data || [])
        }
      } catch (err) {
        console.error('Error fetching artists:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArtists()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 bg-[#ffffff]" aria-labelledby="artists-heading">
        <div className="container mx-auto max-w-4xl">
          <h2 id="artists-heading" className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center">
            Artists as Spiritual Leaders
          </h2>
          <p className="text-center text-[#4a5568]">Loading artists...</p>
        </div>
      </section>
    )
  }

  if (artists.length === 0) {
    return null
  }

  return (
    <section id="artists" className="py-16 md:py-24 px-4 bg-[#ffffff] scroll-mt-24" aria-labelledby="artists-heading">
      <div className="container mx-auto max-w-5xl">
        <h2 id="artists-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 text-center">
          Artists as Spiritual Leaders
        </h2>
        <p className="text-[#4a5568] text-lg text-center max-w-2xl mx-auto mb-12">
          We acknowledge artists as spiritual leaders in our community—called and gifted to lead worship, present their spiritual journeys, and create space for encounter with God through music. Explore their music, stream songs, leave feedback, and support their ministry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="group block bg-[#f7f7f5] rounded-xl overflow-hidden border-2 border-transparent hover:border-[#1b5e3f] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={artist.image_url}
                  alt={artist.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-[#ffffff] w-full">
                  <h3 className="text-xl md:text-2xl font-bold">{artist.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#4a5568] text-sm line-clamp-2 mb-4">{artist.bio}</p>
                <span className="inline-block text-[#1b5e3f] font-semibold group-hover:underline">
                  Stream music, support & provide feedback →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
