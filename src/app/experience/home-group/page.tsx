import Link from 'next/link'
import Image from 'next/image'

export default function HomeGroupPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">Home Group Workshop</h1>
        <p className="text-lg text-[#4a5568] leading-relaxed mb-8">
          Union and communion in the body of God happens when we gather regularly. Home groups are the heart of the Church of Music—where acoustic artists lead worship in living rooms and home stages, and people come together for fellowship, shared table, and worship. Attend often. Your presence builds the church and invites others in.
        </p>

        <div className="relative rounded-xl overflow-hidden mb-12 aspect-video border-2 border-[#e2e8f0]">
          <Image
            src="/images/home-groups/home-group-communion-gathering.jpg"
            alt="Folk musician performing in a home gathering with people in communion and fellowship"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <p className="text-lg text-[#4a5568] leading-relaxed mb-6">
          Church members bring their own drink and food—passover style, unifying with the body. Workshop alongside artists as spiritual leaders in ceremonies that are 90% music and 10% pecha kucha–style message on how God moves through music. Worship leaders from established churches introduce artists. We host local and touring artists and are partnered with Folk Alliance International.
        </p>
        <p className="text-lg text-[#4a5568] leading-relaxed mb-8">
          Come consistently. Regular attendance deepens community, strengthens the body, and draws more people into worship. The more we gather, the more we grow.
        </p>
        <Link
          href="/next-steps#home-groups"
          className="inline-block bg-[#1b5e3f] text-[#ffffff] font-bold py-3 px-8 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
        >
          Host a Church of Music Home Group
        </Link>
      </div>
    </div>
  )
}
