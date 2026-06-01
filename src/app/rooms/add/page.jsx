"use client";
import Heading from "@/components/Heading";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "react-toastify";
import createRoom from "@/app/actions/createRoom";

const page = () => {
  const [state, formAction] = useActionState(createRoom, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Room created successfully!");
      router.push("/");
    }
  }, [state]);

  const inputClass = "block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900";
  const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

  return (
    <>
      <Heading title="Add Room" />
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>Room Name</label>
            <input type="text" id="name" name="name" className={inputClass} placeholder="Large Conference Room" required />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>Description</label>
            <textarea id="description" name="description" className={`${inputClass} h-28 resize-none`} placeholder="Enter a description for the room" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="sqft" className={labelClass}>Square Feet</label>
              <input type="number" id="sqft" name="sqft" className={inputClass} placeholder="500" required />
            </div>
            <div>
              <label htmlFor="capacity" className={labelClass}>Capacity</label>
              <input type="number" id="capacity" name="capacity" className={inputClass} placeholder="10" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="price_per_hour" className={labelClass}>Price Per Hour</label>
              <input type="number" id="price_per_hour" name="price_per_hour" className={inputClass} placeholder="25" required />
            </div>
            <div>
              <label htmlFor="availability" className={labelClass}>Availability</label>
              <input type="text" id="availability" name="availability" className={inputClass} placeholder="Mon-Fri, 9am-5pm" required />
            </div>
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>Address</label>
            <input type="text" id="address" name="address" className={inputClass} placeholder="Enter full address" required />
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>Location</label>
            <input type="text" id="location" name="location" className={inputClass} placeholder="Building, Floor, Room" required />
          </div>

          <div>
            <label htmlFor="amenities" className={labelClass}>Amenities</label>
            <input type="text" id="amenities" name="amenities" className={inputClass} placeholder="projector, whiteboard, wifi" required />
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>Image</label>
            <input type="file" id="image" name="image" className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-zinc-200" />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2">
              Save Room
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;