"use client";
import { toast } from "react-toastify";
import cancelBooking from "@/app/actions/cancelBooking";

const CancelBookingButton = ({ bookingId }) => {
  const handleCancel = async () => {
    if (!confirm("Cancel this booking?")) return;
    await cancelBooking(bookingId);
    toast.success("Booking cancelled");
  };
  return (
    <button
      onClick={handleCancel}
      className="flex h-10 w-full items-center justify-center rounded-xl bg-zinc-900 text-sm font-medium text-white hover:bg-black"
    >
      Cancel
    </button>
  );
};
export default CancelBookingButton;