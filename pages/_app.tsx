import '../styles/globals.css'
import '../styles/popper.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootswatch/dist/litera/bootstrap.min.css'
import MainLayout from '../layout/MainLayout'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useEffect } from 'react'

config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  },[])
  return <>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </>
}
