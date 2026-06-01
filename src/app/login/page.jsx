"use client";
import React, { useEffect, useTransition } from "react";
import Link from "next/link";
import createSession from "../actions/createSession";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const Loginpage = () => {
  const [isPending, startTransition] = useTransition();
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    startTransition(async () => {
      const state = await createSession({}, formData);
      if (state?.error) {
        toast.error(state.error);
      }
      if (state?.success) {
        toast.success("Logged in successfully!");
        setIsAuthenticated(true);
        router.push("/");
      }
    });
  };

  return (
    <div className="flex min-h- items-center justify-center px-4">
      <div className="w-full max-w- rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text- font-semibold tracking-tight text-zinc-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          No account?{" "}
          <Link
            href="/register"
            className="font-medium text-zinc-900 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
