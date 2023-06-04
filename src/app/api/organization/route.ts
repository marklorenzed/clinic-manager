import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  const jwt = req.headers.get("authentication");
  const supabase = createRouteHandlerClient({ cookies });

  if (!jwt) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized " }), {
      status: 401,
    });
  }

  const response = await supabase.auth.getUser(jwt);
  const user = response.data.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized " }), {
      status: 401,
    });
  }

  const organizations = await db.organization.findMany({
    where: {
      user: user.id,
    },
  });
  
  return new NextResponse(JSON.stringify({ data: organizations }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, address } = body;
  const jwt = req.headers.get("authentication");
  const supabase = createRouteHandlerClient({ cookies });
  if (!jwt) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized " }), {
      status: 401,
    });
  }

  const response = await supabase.auth.getUser(jwt);
  const user = response.data.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized " }), {
      status: 401,
    });
  }

  if (!body.name && typeof body.name !== "string") {
    return new NextResponse(JSON.stringify({ message: "Name is required" }), {
      status: 500,
    });
  }

  try {
    const organization = await db.organization.create({
      data: {
        name,
        address: address,
        user: user.id,
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
