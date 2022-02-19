import React from 'react';
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  ReactNode,
} from 'react';

import { clearReCAPTCHA, injectReCAPTCHAScript, log } from './utils';

enum ReCAPTCHAError {
  SCRIPT_NOT_AVAILABLE = 'ReCAPTCHA script is not available',
}

interface IReCAPTCHAProvider {
  reCAPTCHAKey?: string;
  language?: string;
  isReCAPTCHANet?: boolean;
  isEnterprise?: boolean;
  script?: {
    nonce?: string;
    defer?: boolean;
    async?: boolean;
    appendTo?: 'head' | 'body';
    id?: string;
  };
  children: ReactNode;
}

export interface IReCAPTCHAConsumer {
  executeReCAPTCHA?: (action?: string) => Promise<string>;
}

const ReCAPTCHAContext = createContext<IReCAPTCHAConsumer>({
  executeReCAPTCHA: () => {
    throw Error(
      'ReCAPTCHA Context has not yet been implemented, if you are using useReCAPTCHA hook, make sure the hook is called inside component wrapped by ReCAPTCHAProvider',
    );
  },
});

const { Consumer: ReCAPTCHAConsumer } = ReCAPTCHAContext;

export function ReCAPTCHAProvider({
  reCAPTCHAKey,
  isEnterprise = false,
  isReCAPTCHANet = false,
  script,
  language,
  children,
}: IReCAPTCHAProvider) {
  const [greCAPTCHAInstance, setGreCAPTCHAInstance] = useState<null | {
    execute: Function;
  }>(null);

  useEffect(() => {
    if (!reCAPTCHAKey) {
      log('<ReCAPTCHAProvider /> reCAPTCHA key not provided');

      return;
    }

    const scriptId = script?.id || 'google-recaptcha-v3';

    const onLoad = () => {
      if (!window || !(window as any).grecaptcha) {
        log(`<ReCAPTCHAProvider /> ${ReCAPTCHAError.SCRIPT_NOT_AVAILABLE}`);

        return;
      }

      const greCAPTCHA = isEnterprise
        ? (window as any).grecaptcha.enterprise
        : (window as any).grecaptcha;

      greCAPTCHA.ready(() => {
        setGreCAPTCHAInstance(greCAPTCHA);
      });
    };

    const onError = () => {
      log('Error loading reCAPTCHA script');
    };

    injectReCAPTCHAScript({
      reCAPTCHAKey,
      isEnterprise,
      isReCAPTCHANet,
      script,
      language,
      onLoad,
      onError,
    });

    return () => {
      clearReCAPTCHA(scriptId);
    };
  }, [isEnterprise, isReCAPTCHANet, script, language, reCAPTCHAKey]);

  const executeReCAPTCHA = useCallback(
    async (action?: string) => {
      if (!greCAPTCHAInstance || !greCAPTCHAInstance.execute) {
        throw new Error('<ReCAPTCHAProvider /> has not been loaded');
      }

      const result = await greCAPTCHAInstance.execute(reCAPTCHAKey, { action });

      return result;
    },
    [greCAPTCHAInstance],
  );

  const reCAPTCHAContextValue = useMemo(
    () => ({
      executeReCAPTCHA: greCAPTCHAInstance ? executeReCAPTCHA : undefined,
    }),
    [executeReCAPTCHA, greCAPTCHAInstance],
  );

  return (
    <ReCAPTCHAContext.Provider value={reCAPTCHAContextValue}>
      {children}
    </ReCAPTCHAContext.Provider>
  );
}

export { ReCAPTCHAConsumer, ReCAPTCHAContext };
