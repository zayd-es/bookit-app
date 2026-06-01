import React from 'react'
import RoomCard from '@/components/RoomCard'
import Heading from '@/components/Heading'
import getAllRooms from './actions/getAllRooms'
const page = async () => {
  const rooms = await getAllRooms();

  return (
    <>
      <Heading title='Available Rooms' />
    {rooms.length > 0 ? (
<div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-0">    {rooms.map((room) => (
      <RoomCard key={room.$id} room={room} />
    ))}
  </div>
) : (
  <p>No rooms available</p>
)}
    </>
  );
}

export default page