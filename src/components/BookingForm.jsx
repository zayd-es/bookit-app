"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import bookRoom from "@/app/actions/bookRoom";

const BookingForm = ({ room }) => {
  const [state, formAction] = useActionState(bookRoom, {});

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Room has been booked!");
      router.push("/bookings");
    }
  }, [state]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 mb-4">
        Book this Room
      </h2>

      <form action={formAction} className="space-y-4">
      <input type="hidden" name="room_id" value={room.$id} />
      
      <div>
        <label htmlFor="check_in_date" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Check-in
        </label>
        <input
          type="date"
          id="check_in_date"
          name="check_in_date"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="check_in_time" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Time
        </label>
        <input
          type="time"
          id="check_in_time"
          name="check_in_time"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="check_out_date" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Check-out
        </label>
        <input
          type="date"
          id="check_out_date"
          name="check_out_date"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="check_out_time" className="mb-1.5 block text-sm font-medium text-zinc-700">
          Time
        </label>
        <input
          type="time"
          id="check_out_time"
          name="check_out_time"
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-black"
      >
        Book Room – ${room.price_per_hour}/h
      </button>
    </form>
    </div>
  );
};

export default BookingForm;