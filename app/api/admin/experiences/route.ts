import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAuthMiddleware } from "@/lib/auth-middleware";

// GET all experiences (Read)
export async function GET(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json({ message: "Failed to fetch experiences" }, { status: 500 });
  }
}

// POST a new experience (Create)
export async function POST(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const newExperience = await prisma.experience.create({ data: body });
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("Failed to create experience:", error);
    return NextResponse.json({ message: "Failed to create experience" }, { status: 500 });
  }
}

// PUT to update an experience (Update)
export async function PUT(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Experience ID is required" }, { status: 400 });
    }
    const updatedExperience = await prisma.experience.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error("Failed to update experience:", error);
    return NextResponse.json({ message: "Failed to update experience" }, { status: 500 });
  }
}

// DELETE an experience (Delete)
export async function DELETE(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Experience ID is required" }, { status: 400 });
    }

    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json({ message: "Failed to delete experience" }, { status: 500 });
  }
}