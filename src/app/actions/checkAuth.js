'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function checkAuth() {
  // 1. Tsa7i7 l-guelb: Zid "await" 7it cookies wellat async f Next.js l-jdid
  const cookieStore = await cookies();
  
  // 2. Tsa7i7 smiya d l-cookie: dima "appwrite_session" b l-underscore _
  const sessionCookie = cookieStore.get('appwrite_session');

  if (!sessionCookie || !sessionCookie.value) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Auth check failed:", error);
    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuth;