"use client";
import React, { useEffect, useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createUser from "../actions/createUser";

const Registerpage = () => {
  const [state, formAction] = useActionState(createUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Registration successful! Please login.");
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="flex min-h- items-center justify-center px-4">
      <div className="w-full max-w- rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text- font-semibold tracking-tight text-zinc-900">
            Create account
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Join Bookit in seconds</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>

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

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-zinc-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registerpage;
