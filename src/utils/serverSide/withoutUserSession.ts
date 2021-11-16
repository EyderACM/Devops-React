import { GetServerSidePropsContext } from 'next'
import { User } from 'pages/api/user'
import paths from 'routes/paths'

async function withoutUserSession({ req, res }: GetServerSidePropsContext) {
  const user = req.session.user

  if (user === undefined) {
    res.setHeader('location', paths.general.login)
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { isLoggedIn: false, login: '', username: '' } as User,
      },
    }
  }

  return {
    props: { user: req.session.user },
  }
}

export default withoutUserSession
