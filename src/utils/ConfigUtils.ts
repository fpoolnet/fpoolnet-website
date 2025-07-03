export const throwErrorIfEnvVarsNotFound = () => {
  if (!process.env.NEXT_PUBLIC_SOLO_POOL_URL) {
    throw new Error('NEXT_PUBLIC_SOLO_POOL_URL not set in environment variables');
  }

  if (!process.env.NEXT_PUBLIC_SOLO_POOL_FEE) {
    throw new Error('NEXT_PUBLIC_FISHING_POOL_FEE not set in environment variables');
  }

  if (!process.env.NEXT_PUBLIC_FISHING_POOL_URL) {
    throw new Error('NEXT_PUBLIC_FISHING_POOL_URL not set in environment variables');
  }

  if (!process.env.NEXT_PUBLIC_FISHING_POOL_FEE) {
    throw new Error('NEXT_PUBLIC_FISHING_POOL_FEE not set in environment variables');
  }
};
