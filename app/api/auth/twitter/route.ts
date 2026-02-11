import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Implement X OAuth 2.0 redirect
  
  const clientId = process.env.TWITTER_CLIENT_ID
  const redirectUri = process.env.TWITTER_REDIRECT_URI || 'http://localhost:3000/api/auth/twitter/callback'
  
  if (!clientId) {
    return NextResponse.json(
      { error: 'Twitter OAuth not configured. Add TWITTER_CLIENT_ID to .env.local' },
      { status: 500 }
    )
  }

  // OAuth 2.0 with PKCE
  const state = generateRandomString(32)
  const codeVerifier = generateRandomString(64)
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  // Store state and verifier in session/cookie
  // For production, use a proper session store
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'tweet.read users.read follows.read offline.access',
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`

  return NextResponse.json({ url: authUrl })
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}
