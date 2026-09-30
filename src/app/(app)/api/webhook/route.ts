import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function handler(req: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Parse the request
    const method = req.method
    const searchParams = Object.fromEntries(req.nextUrl.searchParams)
    const headersList = await headers()
    const headerObj: Record<string, string> = {}
    headersList.forEach((value, key) => {
      headerObj[key] = value
    })

    // Try to parse body
    let bodyData: any = null
    const contentType = headersList.get('content-type') || ''

    // Skip body parsing for methods that typically don't have one, unless content-type is present
    const hasBody = method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS'

    if (hasBody || contentType) {
      if (contentType.includes('application/json')) {
        try {
          bodyData = await req.json()
        } catch (e) {
          bodyData = { error: 'Failed to parse JSON body' }
        }
      } else {
        // For other types, maybe just store as text or empty
        try {
          const text = await req.text()
          if (text) {
            // Try to parse if it mimics json
            try {
              bodyData = JSON.parse(text)
            } catch {
              // keep as string
              bodyData = { raw: text }
            }
          } else {
            bodyData = {}
          }
        } catch (e) {
          bodyData = { error: 'Failed to read body text' }
        }
      }
    } else {
      bodyData = { message: 'No body expected for this method' }
    }

    // Determine source from headers or query param
    let source = 'unknown'
    if (req.nextUrl.searchParams.has('source')) {
      source = req.nextUrl.searchParams.get('source') as string
    } else if (headersList.has('stripe-signature')) {
      source = 'stripe'
    } else if (headersList.has('x-razorpay-signature')) {
      source = 'razorpay'
    } else if (headersList.has('x-github-event')) {
      source = 'github'
    }

    await payload.create({
      collection: 'webhook-logs',
      data: {
        source,
        method,
        headers: headerObj,
        query: searchParams,
        body: bodyData,
      },
    })

    return NextResponse.json(
      { success: true, message: `Webhook received via ${method}` },
      { status: 200 },
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS,
  handler as HEAD,
}
