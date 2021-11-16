import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from './user'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  try {
    const user = await fetch('http://0.0.0.0:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const rawUser = await user.json()
    const finalUser = {
      username,
      isLoggedIn: true,
      login: rawUser.token,
    } as User
    req.session.user = finalUser
    await req.session.save()
    res.json(finalUser)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
