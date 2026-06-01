import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
  <footer className="mt-12 border-t border-zinc-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-zinc-500">
          &copy; {currentYear} Bookit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer