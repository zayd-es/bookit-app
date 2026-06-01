import React from "react";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import BookingForm from "@/components/BookingForm";
import getSingleRoom from "@/app/actions/getSingleRoom";
const RoomPage = async ({ params }) => {
  const { id } = await params;
  const room = await getSingleRoom(id);
  if (!room) {
    return <Heading title="Room Not Found" />;
  }
  const plainRoom = JSON.parse(JSON.stringify(room));
  const bucketUrl = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketUrl}/files/${room.image}/view?project=${projectId}`;
  const imgsrc = plainRoom.image ? imageUrl : "/images/no-image.jpg";
  return (
    <div>
      <Heading title={room.name} />
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className="inline mr-1" />
          <span className="ml-2">Back to Rooms</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            width={400}
            height={400}
            src={imgsrc}
            alt={room.name}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">{room.description}</p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Size:</span>{" "}
                {room.sqft} sqft
              </li>
              <li>
                <span className="font-semibold text-gray-800">Capacity:</span>{" "}
                {room.capacity} people
              </li>
              <li>
                <span className="font-semibold text-gray-800">
                  Availability:
                </span>
                {room.availability}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Price:</span>$
                {room.price_per_hour}/hour
              </li>
              <li>
                <span className="font-semibold text-gray-800">Ad dress:</span>{" "}
                {room.address}
              </li>
            </ul>
          </div>
        </div>
        <BookingForm room={plainRoom} />
      </div>
    </div>
  );
};

export default RoomPage;
