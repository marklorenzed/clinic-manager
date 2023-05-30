import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  //   const { searchParams } = new URL(req.url);
  const organizations = await db.organization.findMany();
  return new NextResponse(JSON.stringify({ data: organizations }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;
  const user = await currentUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized " }), {
      status: 401,
    });
  }

  if (!name) {
    return new NextResponse(JSON.stringify({ message: "Name is required" }), {
      status: 500,
    });
  }

  try {
    const organization = await db.organization.create({
      data: {
        name,
        userId: user.id,
      },
    });
    return new Response(JSON.stringify({ organization }));
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return new NextResponse(
          JSON.stringify({ message: "The name is already used." }),
          { status: 500 }
        );
      }
    }
    throw e;
  }
}
