# next-recaptcha

reCAPTCHA for your next React app.

## đ§ Install

next-recaptcha is available on npm. It can be installed with the following command:

```
npm install next-recaptcha --save
```

next-recaptcha is available on yarn as well. It can be installed with the following command:

```
yarn add next-recaptcha --save
```

## âšī¸ Information

#### reCAPTCHA Key

You need to create a reCAPTCHA key for your domain, you can register reCAPTCHA v3 keys [here](https://g.co/recaptcha/v3).

#### Enterprise

When you enable to use the enterprise version, **you must create new keys**. These keys will replace any Site Keys you created in reCAPTCHA. Check the [migration guide](https://cloud.google.com/recaptcha-enterprise/docs/migrate-recaptcha).

To work properly, you **must** select the Integration type to be `Scoring` since is equivalent to the reCAPTCHA v3.

The complete documentation to the enterprise version you can see [here](https://cloud.google.com/recaptcha-enterprise/docs/quickstart).

## đ ReCAPTCHAProvider

`ReCAPTCHAProvider` provider component should be used to wrap around your components.

`ReCAPTCHAProvider` is used to load the necessary reCAPTCHA script and provide access to reCAPTCHA to the rest of your application.

In your application need only one provider. You should place it as high as possible in your React tree.

#### Props

| **Props** | **Type** | **Default** | **Required?** | **Description** |
| --------- | -------- | ----------- | ------------- | -------- |
| reCAPTCHAPKey | boolean |  | âī¸ | Your reCAPTCHA key, get one from [here](https://www.google.com/recaptcha/about) |
| script | object |  | â |  |
| language | string |  | â | [Languages](https://developers.google.com/recaptcha/docs/language) that is supported by Google reCAPTCHAP. |
| isReCAPTCHANet | boolean | false | â | Ue to load script from `recaptcha.net`. [docs](https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally) |
| isEnterprise | boolean | false | â | [Enterprise option](#enterprise) |

#### Usages

```javascript
import { ReCAPTCHAProvider } from 'next-recaptcha';

ReactDom.render(
  <ReCAPTCHAProvider
    reCAPTCHAKey='[reCAPTCHA key]'
    language='[language]'
    isReCAPTCHANet={ true or false}
    isEnterprise={ true or false}
    script={{
      async: false,
      defer: false,
      appendTo: 'head',
      nonce: undefined,
    }}
  >
    <Components />
  </ReCAPTCHAProvider>,
  document.getElementById('app')
);
```

## đ ReCAPTCHA

Use to trigger the validation. It provides a prop `onVerify`, which will be called once the verify is done successfully.

```javascript
import {
  ReCAPTCHAProvider,
  ReCAPTCHA,
} from 'next-recaptcha';

const handleVerify = (token: string) => {
  // set token
}

ReactDom.render(
  <ReCAPTCHAProvider reCAPTCHAKey='[reCAPTCHA key]'>
    <ReCAPTCHA onVerify={(token: string) => handleVerify(token)} />
  </ReCAPTCHAProvider>,
  document.getElementById('app')
);
```

## đ Changelog

Latest version 0.0.1 (2022-02-21):

  * ReCAPTCHAProvider
  * ReCAPTCHA

## â Issues

If you think any of the `next-recaptcha` can be improved, please do open a PR with any updates and submit any issues. Also, I will continue to improve this, so you might want to watch/star this repository to revisit.

## đ Contribution

We'd love to have your helping hand on contributions to `next-recaptcha` by forking and sending a pull request!

Your contributions are heartily âĄ welcome, recognized and appreciated. (âŋâ âŋâ )

How to contribute:

- Open pull request with improvements
- Discuss ideas in issues
- Spread the word
- Reach out with any feedback

## âī¸ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
