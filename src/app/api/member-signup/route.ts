import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, preferredLocation, monthlyAmount } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Optionally send notification email to church admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const locationLabel =
        preferredLocation && preferredLocation !== ''
          ? preferredLocation.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
          : 'Not specified'
      const amountLabel =
        monthlyAmount && monthlyAmount !== ''
          ? monthlyAmount === 'custom'
            ? 'Custom (at checkout)'
            : `$${monthlyAmount}/month`
          : 'Not specified'

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Church Member Signup: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1b5e3f;">New Member Signup</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Preferred Location:</strong> ${locationLabel}</p>
            <p><strong>Monthly Amount:</strong> ${amountLabel}</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Member signup error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process signup' },
      { status: 500 }
    )
  }
}
