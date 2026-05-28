import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthWrapper from "@/components/AuthWrapper";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata = {
  title: "Bookit App | Booking a Room",
  description: "Book a meeting or  conference room for your team",
};

export default function RootLayout({ children }) {
  return (
      <AuthWrapper>

    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
suppressHydrationWarning      >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Header/> 
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {children}
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </body>
    </html>
      </AuthWrapper>
  );
}
