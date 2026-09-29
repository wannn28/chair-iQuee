export type ChairColor = {
  name: string
  hex: string
}

export const CHAIR_COLORS: ChairColor[] = [
  { name: 'Putih', hex: '#F4F1EA' },
  { name: 'Hitam', hex: '#1A1A1A' },
  { name: 'Abu', hex: '#8C8882' },
  { name: 'Navy', hex: '#1E3A5F' },
  { name: 'Hijau', hex: '#3F5C4B' },
]

export const DEFAULT_COLOR = CHAIR_COLORS[0]
