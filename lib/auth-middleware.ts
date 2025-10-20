import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export async function adminAuthMiddleware(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("Session in adminAuthMiddleware:", session); // Add this line

  if (!session || !(session.user as any)?.isAdmin) {
    console.log("Unauthorized: Session invalid or not admin."); // Add this line
    return new NextResponse("Unauthorized", { status: 401 });
  }
  console.log("Authorized: Session valid and is admin."); // Add this line
  return null; // All good, proceed with the request
}