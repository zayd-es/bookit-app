'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function destroySession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite_session');

  if (!sessionCookie) {
    return { error: 'No session cookie found' };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    await account.deleteSession('current');
    cookieStore.delete('appwrite_session');

    return { success: true };
  } catch (error) {
    return { error: 'Error deleting session' };
  }
}

export default destroySession;