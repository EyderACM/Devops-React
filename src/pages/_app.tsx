import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
