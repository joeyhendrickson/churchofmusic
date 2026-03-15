'use client'

import dynamic from 'next/dynamic'

const LocationsMap = dynamic(() => import('@/components/LocationsMap'), { ssr: false })

export default function LocationsMapWrapper() {
  return <LocationsMap />
}
