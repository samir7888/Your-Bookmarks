import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextResponse) {
  const body = await request.json();
  console.log(body);
  const { title, url, notes, category } = body;

  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }
  const existingLink = await prisma.link.findFirst({
    where: {
      title: title,
    },
  });
  if (existingLink) {
    return NextResponse.json(
      { message: "Link already exists" },
      { status: 400 }
    );
  }
  const newLink = await prisma.link.create({
    data: {
      user: { connect: { id: body.userId } },
      title: title,
      url: url,
      notes: notes,
      category: { connect: { id: category } },
    },
  });
  return NextResponse.json(newLink);
}
