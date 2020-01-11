import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

function App ({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
