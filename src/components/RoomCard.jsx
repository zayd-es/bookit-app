import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const bucketUrl = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketUrl}/files/${room.image}/view?project=${projectId}`;
  const imgsrc = room.image? imageUrl : "/images/no-image.jpg";

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <Image
          width={600}
          height={400}
          src={imgsrc}
          alt={room.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-52 lg:h-56"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur">
          ${room.price_per_hour}/h
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
            <FaUsers className="text-zinc-400" />
            <span>{room.capacity} people</span>
          </div>
          <span className="text-zinc-300">•</span>
          <span className="truncate">{room.availability}</span>
        </div>

        <Link
          href={`/rooms/${room.$id}`}
          className="mt-4 flex h-10 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          View Room
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;