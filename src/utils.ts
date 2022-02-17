interface IInjectReCAPTCHAScript {
  reCAPTCHAKey: string;
  useReCAPTCHANet: boolean;
  useEnterprise: boolean;
  onLoad: () => void;
  onError: () => void;
  language?: string;
  script?: {
    nonce?: string;
    defer?: boolean;
    async?: boolean;
    appendTo?: 'head' | 'body';
    id?: string;
  };
}

export const injectReCAPTCHAScript = ({
  reCAPTCHAKey,
  language,
  onLoad,
  useReCAPTCHANet,
  useEnterprise,
  script: {
    nonce = '',
    defer = false,
    async = false,
    id = '',
    appendTo = undefined,
  } = {},
}: IInjectReCAPTCHAScript) => {
  const scriptId = id || 'google-recaptcha-v3';

  if (isScriptInjected(scriptId)) {
    onLoad();
    return;
  }

  const reCAPTCHAUrl = getReCAPTCHAUrl({
    useEnterprise,
    useReCAPTCHANet,
  });
  const js = document.createElement('script');

  js.id = scriptId;
  js.src = `${reCAPTCHAUrl}?render=${reCAPTCHAKey}${
    language ? `&hl=${language}` : ''
  }`;

  if (!!nonce) {
    js.nonce = nonce;
  }

  js.defer = !!defer;
  js.async = !!async;
  js.onload = onLoad;

  const element =
    appendTo === 'body'
      ? document.body
      : document.getElementsByTagName('head')[0];

  element.appendChild(js);
};

export const clearReCAPTCHA = (scriptId: string) => {
  // remove badge
  const nodeBadge = document.querySelector('.grecaptcha-badge');
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode);
  }

  // remove script
  const script = document.querySelector(`#${scriptId}`);
  if (script) {
    script.remove();
  }

  clearGStaticReCAPTCHAScript();
};

export const log = (msg: string) => {
  const isDevMode = !!process.env && process.env.NODE_ENV !== 'production';

  if (isDevMode) {
    return;
  }

  console.warn(msg);
};

// ******* PRIVATE *******

export const isScriptInjected = (scriptId: string) =>
  !!document.querySelector(`#${scriptId}`);

const getReCAPTCHAUrl = ({
  useReCAPTCHANet,
  useEnterprise,
}: {
  useReCAPTCHANet: boolean;
  useEnterprise: boolean;
}) => {
  const hostName = useReCAPTCHANet ? 'recaptcha.net' : 'google.com';
  const script = useEnterprise ? 'enterprise.js' : 'api.js';

  return `https://www.${hostName}/recaptcha/${script}`;
};

const clearGStaticReCAPTCHAScript = () => {
  const script = document.querySelector(
    `script[src^='https://www.gstatic.com/recaptcha/releases']`,
  );

  if (script) {
    script.remove();
  }
};
