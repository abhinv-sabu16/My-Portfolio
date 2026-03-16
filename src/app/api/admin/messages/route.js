import { NextResponse } from 'next/server'
import db from '@/lib/firebase'

export async function GET() {
  try {
    const snapshot = await db
      .collection('contacts')
      .orderBy('createdAt', 'desc')
      .get()

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ messages })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}