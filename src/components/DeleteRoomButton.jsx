"use client";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import deleteRoom from "@/app/actions/deleteRoom";

const DeleteRoomButton = ({ roomId }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await deleteRoom(roomId);
      toast.success("Room deleted successfully!");
    } catch (e) {
      toast.error("Failed to delete room");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-red-50 px-4 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-200 transition-colors hover:bg-red-100"
    >
      <FaTrash className="text-xs" /> Delete
    </button>
  );
};

export default DeleteRoomButton;