import sharp from 'sharp'

try {
  console.log('Sharp version:', sharp.versions.sharp)
  console.log('Sharp initialized successfully')
} catch (err) {
  console.error('Sharp failed:', err)
}
