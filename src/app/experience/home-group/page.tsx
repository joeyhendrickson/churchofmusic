import Link from 'next/link'

export default function HomeGroupPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Home Group Workshop</h1>
        <p className="text-lg text-[#4a5568] leading-relaxed mb-6">
          Home groups are the heart of the Church of Music. Church members attend, bring their own drink, and workshop alongside artists in worship ceremonies that are 90% music and 10% pecha kucha–style sermons from spiritual leaders who speak to how God works through the modality of music.
        </p>
        <p className="text-lg text-[#4a5568] leading-relaxed mb-8">
          Worship leaders and spiritual leaders from established churches introduce artists at each home group. We host local and touring artists and are partnered with Folk Alliance International.
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
