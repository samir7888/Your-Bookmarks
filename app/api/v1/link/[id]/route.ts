import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });
    if (!existingLink) {
      return NextResponse.json(
        { message: "Given id does not exist" },
        {
          status: 400,
        }
      );
    }
    const link = await prisma.link.delete({
      where: { id },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { message: "Failed to delete link" },
      { status: 500 }
    );
  }
}
