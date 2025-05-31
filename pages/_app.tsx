import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import '../css/styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="color-mode"
      enableSystem={false}
      defaultTheme="light"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
