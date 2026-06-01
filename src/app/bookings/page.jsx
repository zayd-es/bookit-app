import React from "react";
import Heading from "@/components/Heading";
import BookedRoomCard from "@/components/BookedRoomCard";
import getMyBookings from "../actions/getMyBooking";

const page = async () => {
  const bookings = await getMyBookings();
  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-zinc-500">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings.map((booking) => (
            <BookedRoomCard key={booking.$id} booking={booking} />
          ))}
        </div>
      )}
    </>
  );
};

export default page;