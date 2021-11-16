import { GetServerSidePropsContext } from 'next'
import { User } from 'pages/api/user'
import paths from 'routes/paths'

async function withUserSession({ req, res }: GetServerSidePropsContext) {
  const user = req.session.user
  console.log(user)
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: paths.general.dashboard,
      },
      props: {
        user,
      },
    }
  }
  return {
    props: {
      user: { isLoggedIn: false, login: '', username: '' } as User,
    },
  }
}

export default withUserSession
