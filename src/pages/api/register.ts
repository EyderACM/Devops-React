import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  try {
    const user = await fetch(`http://${process.env.NEXT_PUBLIC_DEVOPS_API_HOST}:8080/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const rawData = await user.json()
    res.json(rawData)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
