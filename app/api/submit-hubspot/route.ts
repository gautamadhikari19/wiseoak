import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const stepNumber = data.stepNumber
    delete data.stepNumber

    // Get credentials from environment variables (server-side only)
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
    const formIdStep1 = process.env.HUBSPOT_FORM_ID_STEP1
    const formIdStep2 = process.env.HUBSPOT_FORM_ID_STEP2

    if (!portalId || !formIdStep1 || !formIdStep2) {
      console.error('Missing HubSpot configuration')
      return NextResponse.json({ success: false, error: 'Configuration error' }, { status: 500 })
    }

    // Determine which form ID to use based on step
    const formId = stepNumber === 1 ? formIdStep1 : formIdStep2

    // Create HubSpot submission payload
    const fields = Object.keys(data).map((key) => ({
      name: key,
      value: data[key],
    }))

    const hubspotBody = {
      fields,
      context: {
        pageUri: request.headers.get('referer') || 'https://wiseoak.edu.sg',
        pageName: 'Admission Form',
      },
    }

    // Submit to HubSpot
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotBody),
    })

    if (!response.ok) {
      console.error('HubSpot API error:', response.status, await response.text())
      return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
