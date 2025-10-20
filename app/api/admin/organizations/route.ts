import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAuthMiddleware } from "@/lib/auth-middleware";

// GET all Organisations (Read)
export async function GET(req: NextRequest) {
  // Security: Auth middleware is still required
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const organisations = await prisma.organisation.findMany({ // <-- Changed
      orderBy: { order: "asc" },
    });
    return NextResponse.json(organisations);
  } catch (error) {
    console.error("Failed to fetch organisations:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to fetch organisations" }, { status: 500 }); // <-- Changed
  }
}

// POST a new organisation (Create)
export async function POST(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const neworganisation = await prisma.organisation.create({ data: body }); // <-- Changed
    return NextResponse.json(neworganisation, { status: 201 });
  } catch (error) {
    console.error("Failed to create organisation:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to create organisation" }, { status: 500 }); // <-- Changed
  }
}

// PUT to update a organisation (Update)
export async function PUT(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "organisation ID is required" }, { status: 400 }); // <-- Changed
    }
    const updatedorganisation = await prisma.organisation.update({ // <-- Changed
      where: { id },
      data,
    });
    return NextResponse.json(updatedorganisation);
  } catch (error) {
    console.error("Failed to update organisation:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to update organisation" }, { status: 500 }); // <-- Changed
  }
}

// DELETE a organisation (Delete)
export async function DELETE(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Organisation ID is required" }, { status: 400 }); // <-- Changed
    }

    await prisma.organisation.delete({ where: { id } }); // <-- Changed
    return NextResponse.json({ message: "Organisation deleted successfully" }); // <-- Changed
  } catch (error) {
    console.error("Failed to delete Organisation:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to delete Organisation" }, { status: 500 }); // <-- Changed
  }
}