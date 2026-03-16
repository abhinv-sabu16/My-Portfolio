import { NextResponse } from 'next/server'
import db from '@/lib/firebase'
import { sendContactEmail } from '@/lib/mailer'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Save to Firebase
    const docRef = await db.collection('contacts').add({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    })

    console.log('Contact saved with id:', docRef.id)

    // Send email notification
    await sendContactEmail({ name, email, message })

    console.log('Email sent successfully')

    return NextResponse.json({
      success: true,
      message: 'Message received!',
      id: docRef.id,
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    )
  }
}