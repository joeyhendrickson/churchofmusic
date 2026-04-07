import Image from 'next/image'
import Link from 'next/link'

export default function MomentumPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Current Series: Momentum</h1>
        <p className="text-lg text-[#4a5568] leading-relaxed mb-8">
          Our current worship series explores how God moves through music to create momentum in faith, community, and spiritual revival. Join us at a home group or online to experience worship that is 90% music and 10% pecha kucha–style message—with spiritual leaders and artists as spiritual leaders leading us into encounter with God. Come expectant for what God will do.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] border-2 border-[#e2e8f0]">
            <Image
              src="/images/momentum/momentum-house-concert-band.jpg"
              alt="2–3 piece band performing acoustic and piano-driven music at a Tiny Desk style house concert"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] border-2 border-[#e2e8f0]">
            <Image
              src="/images/momentum/momentum-piano-acoustic-house.jpg"
              alt="Pianist and acoustic guitarist performing for home group audience at house concert"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] border-2 border-[#e2e8f0]">
            <Image
              src="/images/momentum/momentum-house-concert-3.jpg"
              alt="Singer with acoustic guitar and upright bass at house concert"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] border-2 border-[#e2e8f0]">
            <Image
              src="/images/momentum/momentum-house-concert-4.jpg"
              alt="Small acoustic band with piano and guitar performing at home for audience"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>

        <p className="text-lg text-[#4a5568] leading-relaxed mb-2">
          Check our <Link href="/locations" className="text-[#1b5e3f] font-semibold hover:underline">Locations</Link> page for home groups near you.
        </p>
      </div>
    </div>
  )
}
