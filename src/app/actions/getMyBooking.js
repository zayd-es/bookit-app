'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';

async function getMyBookings() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('appwrite_session');
  
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const { user, isAuthenticated } = await checkAuth();

    if (!isAuthenticated || !user) {
      return { error: 'You must be logged in to view your bookings' };
    }

    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('user_id', user.id)]
    );

    const bookingsWithRooms = await Promise.all(
      bookings.map(async (booking) => {
        const room = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
          booking.room_id
        );
        return { ...booking, room_id: room };
      })
    );

    return bookingsWithRooms;
  } catch (error) {
    console.log('Failed to get user bookings', error);
    return { error: 'Failed to get bookings' };
  }
}

export default getMyBookings;