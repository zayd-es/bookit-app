import React from "react";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaMapMarkerAlt, FaUsers, FaRulerCombined, FaClock } from "react-icons/fa";
import BookingForm from "@/components/BookingForm";
import getSingleRoom from "@/app/actions/getSingleRoom";

const RoomPage = async ({ params }) => {
  const { id } = await params;
  const room = await getSingleRoom(id);
  
  if (!room) return <Heading title="Room Not Found" />;

  const plainRoom = JSON.parse(JSON.stringify(room));
  const bucketUrl = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketUrl}/files/${room.image}/view?project=${projectId}`;
  const imgsrc = plainRoom.image ? imageUrl : "/images/no-image.jpg";
  
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900">
          <FaChevronLeft className="text-xs" /> Back to Rooms
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="relative">
              <Image
                width={1200}
                height={800}
                src={imgsrc}
                alt={room.name}
                className="h- w-full object-cover sm:h-"
                priority
              />
              <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-zinc-900 shadow">
                ${room.price_per_hour}/h
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-2xl font-semibold text-zinc-900">{room.name}</h1>
              
              <div className="mt-2 flex items-center gap-1.5 text-zinc-500">
                <FaMapMarkerAlt className="text-xs" />
                <span>{room.address}</span>
              </div>

              <p className="mt-6 leading-relaxed text-zinc-600">{room.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-6 sm:grid-cols-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-zinc-500"><FaUsers/> Capacity</div>
                  <div className="mt-1 font-medium text-zinc-900">{room.capacity} people</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-zinc-500"><FaRulerCombined/> Size</div>
                  <div className="mt-1 font-medium text-zinc-900">{room.sqft} sqft</div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-zinc-500"><FaClock/> Availability</div>
                  <div className="mt-1 font-medium text-zinc-900">{room.availability}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - BOOKING */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Book this room</h2>
            <p className="mt-1 text-sm text-zinc-500">Select date and time</p>
            <div className="mt-5">
              <BookingForm room={plainRoom} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;