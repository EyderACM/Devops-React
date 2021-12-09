import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import paths from 'routes/paths'
import { useForm, Controller } from 'react-hook-form'
import { withIronSessionSsr } from 'iron-session/next'
import withUserSession from 'utils/serverSide/withUserSession'
import { sessionOptions } from 'lib/session'
import router, { useRouter } from 'next/router'

export default function SignIn() {
  const router = useRouter()
  const { control, handleSubmit, reset } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const result = await fetch('/api/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const login = await fetch('/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    router.push(paths.general.dashboard)
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          alignItems: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          ¿Deseas crear una cuenta?
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <Controller
            name="username"
            control={control}
            key="username"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="text"
                autoComplete="text"
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            key="password"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="Contraseña"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear cuenta
          </Button>
          <Grid container>
            <Grid item>
              <Link href={`${paths.general.login}`}>
                {'Tienes una cuenta? Inicia sesióasdfafsafdsan'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export const getServerSideProps = withIronSessionSsr(
  withUserSession,
  sessionOptions,
)
