"use client"
import React, { useEffect, useTransition } from 'react'
import Link from 'next/link'
import createSession from '../actions/createSession'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'

const Loginpage = () => {
  const [isPending, startTransition] = useTransition();
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    startTransition(async () => {
      const state = await createSession({}, formData);
      if (state?.error) {
        toast.error(state.error);
      }
      if (state?.success) {
        toast.success('Logged in successfully!');
        setIsAuthenticated(true);
        router.push('/');
      }
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>
            <p>
              No account?
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;