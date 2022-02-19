import { useContext } from 'react';
import { ReCAPTCHAContext } from './ReCAPTCHAProvider';

export const useReCAPTCHA = () => useContext(ReCAPTCHAContext);
