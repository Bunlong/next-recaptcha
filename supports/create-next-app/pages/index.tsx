import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { ReCAPTCHAProvider, ReCAPTCHA } from 'next-recaptcha';

const Home: NextPage = () => {
  const handleVerify = (token: string) => {
    console.log(token);
  }

  return (
    <div className={styles.container}>
      <ReCAPTCHAProvider
        reCAPTCHAKey=''
        // language='[optional_language]'
        isReCAPTCHANet={false}
        isEnterprise={false}
        script={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <ReCAPTCHA onVerify={(token: string) => handleVerify(token)} />
      </ReCAPTCHAProvider>
    </div>
  )
}

export default Home
