import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      // Session is still loading, do nothing
      return;
    }

    if (!session) {
      // User is not authenticated, redirect to the login page
      router.push('/auth/signIn');
    }
  }, [session, status, router]);

  return { session, status };
}