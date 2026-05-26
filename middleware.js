import { NextResponse } from "next/server";

export async function middleware(request) {
  // 1. L-GUELB HNA: Kan-9raw l-cookie direct men l-request (Edge Runtime Clean)
  const sessionCookie = request.cookies.get("appwrite_session");

  // 2. Ila l-user dayr Sign Out (makaynach l-cookie), gl3o direct l l-login page
  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Ila mconnecti nâdi, khallih y-fout
  return NextResponse.next();
}

// 4. Ga3 l-pages li bghiti t-7mihom dynamic m3a Brad
export const config = {
  matcher: [
    "/bookings", 
    "/rooms/add", 
    "/my-rooms"
  ]
};