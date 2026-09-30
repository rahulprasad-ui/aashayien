import { NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function GET() {
  const secret = process.env.PAYLOAD_SECRET || 'secret-key'

  // Generate random alphanumeric string
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing chars like I, 1, O, 0
  let text = ''
  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  // Generate SVG
  const width = 150
  const height = 50
  const backgroundColor = '#f3f4f6' // gray-100

  // Create noise dots
  let noise = ''
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const r = Math.random() * 2 // radius
    const color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.5)`
    noise += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" />`
  }

  // Create noise lines
  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * width
    const y1 = Math.random() * height
    const x2 = Math.random() * width
    const y2 = Math.random() * height
    const stroke = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.3)`
    noise += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2" />`
  }

  // Create text paths/elements
  let svgText = ''
  const fontSize = 28
  // Calculate spacing to center text
  const spacing = (width - 40) / text.length

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const x = 20 + i * spacing
    const y = 35 + (Math.random() - 0.5) * 10
    const rotate = (Math.random() - 0.5) * 30
    const color = '#374151' // gray-700

    svgText += `<text x="${x}" y="${y}" font-family="monospace" font-size="${fontSize}" font-weight="bold" fill="${color}" transform="rotate(${rotate}, ${x}, ${y})">${char}</text>`
  }

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      ${noise}
      ${svgText}
    </svg>
  `

  const image = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

  // Hash the answer (case insensitive)
  const hash = crypto.createHmac('sha256', secret).update(text.toUpperCase()).digest('hex')

  return NextResponse.json({
    image,
    hash,
  })
}
