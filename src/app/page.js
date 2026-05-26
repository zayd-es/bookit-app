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
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}

export default page