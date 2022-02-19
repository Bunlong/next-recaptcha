import { useEffect } from 'react';
import { useReCAPTCHA } from './useReCAPTCHA';
import { log } from './utils';

export interface IReCAPTCHA {
  onVerify: (token: string) => void | Promise<void>;
  action?: string;
}

export function ReCAPTCHA({ action, onVerify }: IReCAPTCHA) {
  const ReCAPTCHAContextValue = useReCAPTCHA();

  useEffect(() => {
    const { executeReCAPTCHA } = ReCAPTCHAContextValue;

    if (!executeReCAPTCHA) {
      return;
    }

    const handleExecuteRecaptcha = async () => {
      const token = await executeReCAPTCHA(action);

      if (!onVerify) {
        log('Please define an onVerify function');

        return;
      }

      onVerify(token);
    };

    handleExecuteRecaptcha();
  }, [action, onVerify, ReCAPTCHAContextValue]);

  return null;
}
