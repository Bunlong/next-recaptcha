import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { ReCAPTCHAProvider } from 'next-recaptcha';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ReCAPTCHAProvider
        reCAPTCHAKey='[Your recaptcha key]'
        // language='[optional_language]'
        isReCAPTCHANet={false}
        isEnterprise={false}
        script={{
          async: false, // optional, default to false,
          defer: false, // optional, default to false
          appendTo: 'head', // optional, default to 'head', can be 'head' or 'body',
          nonce: undefined // optional, default undefined
        }}
      >
        Hello World
      </ReCAPTCHAProvider>
    </div>
  )
}

export default Home
