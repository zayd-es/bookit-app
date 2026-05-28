'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';

async function getMyRooms() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite_session');
  
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { account, databases } = await createSessionClient(sessionCookie.value);
    const user = await account.get();

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal('user_id', user.$id)]
    );

    return rooms;
  } catch (error) {
    console.log('Failed to get user rooms', error);
    return [];
  }
}

export default getMyRooms;