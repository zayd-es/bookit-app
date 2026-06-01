import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";
import getMyRooms from "@/app/actions/getMyRooms";

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? (
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <MyRoomCard key={r.$id} room={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-zinc-500">You have no room listings</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRoomsPage;