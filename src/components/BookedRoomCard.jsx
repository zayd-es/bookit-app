import React from "react";
import Link from "next/link";
import Image from "next/image";
import CancelBookingButton from "./CancelBookingButton";
import { FaMapMarkerAlt, FaRegCalendar } from "react-icons/fa";

const BookedRoomCard = ({ booking }) => {
  const { room_id: room } = booking;

  const bucketUrl = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const imgsrc = room.image
  ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketUrl}/files/${room.image}/view?project=${projectId}`
    : "/images/no-image.jpg";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getDuration = () => {
    const hours = Math.round((new Date(booking.check_out) - new Date(booking.check_in)) / 3600000);
    return `${hours}h`;
  };

  const isUpcoming = new Date(booking.check_in) > new Date();

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <Image
          src={imgsrc}
          alt={room.name}
          width={600}
          height={400}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-52"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-zinc-900 shadow">
          ${room.price_per_hour}/h
        </div>
        <div className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium shadow ${
          isUpcoming? "bg-emerald-600 text-white" : "bg-zinc-800 text-white"
        }`}>
          {isUpcoming? "Upcoming" : "Completed"}
        </div>
      </div>

      <div className="p-5">
        <h4 className="truncate text- font-semibold text-zinc-900">
          {room.name}
        </h4>

        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
          <FaMapMarkerAlt className="text-" />
          <span className="truncate">{room.address}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-1.5">
            <FaRegCalendar className="text-zinc-400" />
            <span>{formatDate(booking.check_in)}</span>
          </div>
          <span className="text-zinc-300">•</span>
          <span>{getDuration()}</span>
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            href={`/rooms/${room.$id}`}
            className="flex h-10 flex-1 items-center justify-center rounded-xl border border-zinc-300 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            View Room
          </Link>
          <div className="flex-1">
            <CancelBookingButton bookingId={booking.$id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedRoomCard;