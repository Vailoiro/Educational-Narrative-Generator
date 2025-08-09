import { useEffect } from 'react';
import { useApiStore } from '../lib/store';

export function useAttemptChecker() {
  const { checkBackendAttempts, hasCustomKey, backendAttemptStatus, isCheckingAttempts } = useApiStore();

  useEffect(() => {
    const checkAttempts = async () => {
      await checkBackendAttempts();
    };

    checkAttempts();

    const interval = setInterval(checkAttempts, 60000);

    return () => clearInterval(interval);
  }, [checkBackendAttempts, hasCustomKey]);

  return {
    attemptStatus: backendAttemptStatus,
    isChecking: isCheckingAttempts,
    hasCustomKey
  };
}