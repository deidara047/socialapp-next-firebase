import '../styles/globals.css'
import '../styles/popper.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootswatch/dist/litera/bootstrap.min.css'
import MainLayout from '../layout/MainLayout'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from '../redux/store'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { addUser } from '../redux/reducers/usersSlice'

config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(addUser(user))
      }
    });

    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    return () => unsubscribeAuth();
  },[]);

  return (<Provider store={store}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </Provider>)
}
