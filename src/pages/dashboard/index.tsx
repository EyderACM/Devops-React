import * as React from 'react'
import Grid from '@mui/material/Grid'
import { withIronSessionSsr } from 'iron-session/next'
import withoutUserSession from 'utils/serverSide/withoutUserSession'
import { sessionOptions } from 'lib/session'
import DashboardWrapper from 'components/molecules/DashboardWrapper'

function Dashboard() {
  return (
    <DashboardWrapper>
      <Grid
        alignItems="center"
        container
        height="100%"
        justifyContent="center"
        spacing={4}
        xs={12}
        width="100vw"
      >
        Bienvenido al sistema
      </Grid>
    </DashboardWrapper>
  )
}

export default Dashboard

export const getServerSideProps = withIronSessionSsr(
  withoutUserSession,
  sessionOptions,
)
