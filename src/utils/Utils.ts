import { address, networks } from 'flokicoinjs-lib';

export const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (
    /Android/i.test(userAgent) ||
    /webOS/i.test(userAgent) ||
    /iPhone/i.test(userAgent) ||
    /iPad/i.test(userAgent) ||
    /iPod/i.test(userAgent) ||
    /BlackBerry/i.test(userAgent) ||
    /IEMobile/i.test(userAgent) ||
    /Opera Mini/i.test(userAgent)
  );
};

export const validateAddress = (addr: string) => {
  try {
    address.toOutputScript(addr, networks.bitcoin);
    return true;
  } catch (err) {
    return false;
  }
};

export const formatK = (value: number): string => {
  const k = value / 1000;
  if (k >= 1000) {
    const m = k / 1000;
    return Number.isInteger(m) ? `${m.toFixed(0)}M` : `${m.toFixed(1)}M`;
  }
  return `${k.toLocaleString('en-US', { maximumFractionDigits: 0 })}k`;
};

export const kToKM = (k: number) => {
  if (k >= 1000) {
    const m = k / 1000;
    return Number.isInteger(m) ? `${m.toFixed(0)}M` : `${m.toFixed(1)}M`;
  }
  return `${k.toFixed(0)}K`;
};

export const durationForValue = (value: number): number => {
  const minV = 1_000;
  const maxV = 9_900_000;
  const norm = Math.min(1, Math.max(0, (value - minV) / (maxV - minV)));
  return 1.2 - norm * 1.0; // 1.2s down to 0.2s
};
