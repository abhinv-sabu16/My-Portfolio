import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Option 1: Save to MongoDB (if configured)
    if (process.env.MONGODB_URI) {
      try {
        const { MongoClient } = await import('mongodb')
        const client = new MongoClient(process.env.MONGODB_URI)
        await client.connect()
        const db = client.db(process.env.MONGODB_DB || 'portfolio')
        await db.collection('contacts').insertOne({
          name,
          email,
          message,
          createdAt: new Date(),
          read: false,
        })
        await client.close()
      } catch (dbErr) {
        console.error('MongoDB error:', dbErr)
        // Continue even if DB fails — log the message
      }
    }

    // Option 2: Send email via nodemailer (configure separately)
    // You can add nodemailer here if needed

    console.log('Contact form submission:', { name, email, message, timestamp: new Date().toISOString() })

    return NextResponse.json({ success: true, message: 'Message received!' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
