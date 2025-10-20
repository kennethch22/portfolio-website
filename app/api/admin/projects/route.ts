import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAuthMiddleware } from "@/lib/auth-middleware";

// GET all projects (Read)
export async function GET(req: NextRequest) {
  // Security: Auth middleware is still required
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const projects = await prisma.project.findMany({ // <-- Changed
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 }); // <-- Changed
  }
}

// POST a new project (Create)
export async function POST(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const newProject = await prisma.project.create({ data: body }); // <-- Changed
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 }); // <-- Changed
  }
}

// PUT to update a project (Update)
export async function PUT(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 }); // <-- Changed
    }
    const updatedProject = await prisma.project.update({ // <-- Changed
      where: { id },
      data,
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Failed to update project:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to update project" }, { status: 500 }); // <-- Changed
  }
}

// DELETE a project (Delete)
export async function DELETE(req: NextRequest) {
  const authError = await adminAuthMiddleware(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 }); // <-- Changed
    }

    await prisma.project.delete({ where: { id } }); // <-- Changed
    return NextResponse.json({ message: "Project deleted successfully" }); // <-- Changed
  } catch (error) {
    console.error("Failed to delete project:", error); // <-- Changed
    return NextResponse.json({ message: "Failed to delete project" }, { status: 500 }); // <-- Changed
  }
}