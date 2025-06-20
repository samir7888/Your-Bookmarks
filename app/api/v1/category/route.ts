import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextResponse) {
  const body = await request.json();

  const name = body.name;
  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });
  if (existingCategory) {
    return NextResponse.json(   
      { message: "Category already exists" },
      { status: 400 }
    );
  }
  const newCategory = await prisma.category.create({
    data: {
      user: { connect: { id: body.userId } },
      name: name,
    },
  });
  return NextResponse.json(newCategory);
}
