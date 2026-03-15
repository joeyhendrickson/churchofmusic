'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import 'leaflet/dist/leaflet.css'

const COLUMBUS_CENTER: [number, number] = [39.96, -82.99]
const MAP_ZOOM = 10

const LOCATIONS = [
  { id: 'westerville', name: 'Westerville', coords: [40.1262, -82.9291] as [number, number] },
  { id: 'grove-city', name: 'Grove City', coords: [39.8812, -83.093] as [number, number] },
  { id: 'downtown-columbus', name: 'Downtown Columbus', coords: [39.9612, -82.9988] as [number, number] },
  { id: 'dublin', name: 'Dublin', coords: [40.0992, -83.1141] as [number, number] },
  { id: 'new-albany', name: 'New Albany', coords: [40.0817, -82.8088] as [number, number] },
]

function createStarIcon() {
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1b5e3f" width="32" height="32" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); cursor: pointer;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    className: 'star-marker !border-0 !bg-transparent cursor-pointer',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

export default function LocationsMap() {
  const router = useRouter()
  const starIcon = createStarIcon()

  return (
    <div className="w-full rounded-xl overflow-hidden border-2 border-[#e2e8f0] [&_.leaflet-marker-icon]:cursor-pointer">
      <MapContainer
        center={COLUMBUS_CENTER}
        zoom={MAP_ZOOM}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {LOCATIONS.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={starIcon}
            eventHandlers={{
              click: () => router.push('/give#member'),
            }}
          >
            <Popup>
              <div className="text-center min-w-[140px]">
                <p className="font-semibold text-[#1a1a1a] mb-2">{loc.name}</p>
                <p className="text-sm text-[#4a5568] mb-3">Church of Music Home Group</p>
                <Link
                  href="/give#member"
                  className="inline-block bg-[#1b5e3f] text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-[#144d32] transition-colors"
                >
                  Become a Member
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
