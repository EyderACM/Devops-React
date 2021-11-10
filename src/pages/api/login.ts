import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from './user'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, email } = await req.body

  try {
    const user = {
      isLoggedIn: true,
      login: 'asdsad',
      username: 'pancho',
    } as User
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
