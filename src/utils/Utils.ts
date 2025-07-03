
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


export const validateAddress = (addr: string, network?: string) => {
  try {
    let currentNet;
    switch (network) {
      case 'testnet':
        currentNet = networks.testnet;
        break;
      case 'regtest':
        currentNet = networks.regtest;
        break;
      default:
        currentNet = networks.bitcoin;
        break;
    }
    return true;
  } catch (err) {
    return false;
  }
};