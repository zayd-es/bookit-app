import React from 'react';
import { getMyBookings } from '@/app/actions/getMyBookings';

const BookingsPage = async () => {
  // Zre3na "|| []" bach hta ila backend t-khربق, l-App dima safe w ma-t-lo7sh error length
  const bookings = await getMyBookings() || []; 

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.$id} className="border p-4 mb-2 rounded shadow">
            <p className="font-semibold">Booking ID: {booking.$id}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsPage;