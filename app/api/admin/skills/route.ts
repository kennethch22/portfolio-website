import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAuthMiddleware } from "@/lib/auth-middleware";

// GET all skills (Read)
export async function GET(req: NextRequest) {
  // Security: Auth middleware is still required
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const skills = await prisma.skill.findMany({ // <-- Changed
      orderBy:[
    { category: "asc" },
    { name: "asc" },
  ],
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to fetch skills" }, { status: 500 }); // <-- Changed
  }
}

// POST a new skill (Create)
export async function POST(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const newskill = await prisma.skill.create({ data: body }); // <-- Changed
    return NextResponse.json(newskill, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to create skill" }, { status: 500 }); // <-- Changed
  }
}

// PUT to update a skill (Update)
export async function PUT(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "skill ID is required" }, { status: 400 }); // <-- Changed
    }
    const updatedskill = await prisma.skill.update({ // <-- Changed
      where: { id },
      data,
    });
    return NextResponse.json(updatedskill);
  } catch (error) {
    console.error("Failed to update skill:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to update skill" }, { status: 500 }); // <-- Changed
  }
}

// DELETE a skill (Delete)
export async function DELETE(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "skill ID is required" }, { status: 400 }); // <-- Changed
    }

    await prisma.skill.delete({ where: { id } }); // <-- Changed
    return NextResponse.json({ message: "skill deleted successfully" }); // <-- Changed
  } catch (error) {
    console.error("Failed to delete skill:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to delete skill" }, { status: 500 }); // <-- Changed
  }
}