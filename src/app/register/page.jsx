"use client"
import React, { useEffect, useActionState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import createUser from '../actions/createUser' 

const Registerpage = () => {
  const [state, formAction] = useActionState(createUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success('Registration successful! Please login.');
      router.push('/login'); 
    }
  }, [state, router]);

  return (
     <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
          <form action={formAction}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Register
            </h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 text-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 text-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 text-gray-800"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="border rounded w-full py-2 px-3 text-gray-800"
                required
              />
            </div>

            <div className="flex flex-col gap-5">
              {state?.error && (
                <div style={{color: 'red'}} className="text-sm text-red-500 font-semibold mb-2">
                  {state.error}
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
              >
                Register
              </button>

              <p className="text-sm text-gray-600 text-center">
                Have an account?
                <Link href="/login" className="text-blue-500 hover:underline ml-1">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Registerpage;