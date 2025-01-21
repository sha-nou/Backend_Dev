import type { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/mongoose'

export const config = {
    api: {
      bodyParser: false,
    },
  };

 export async function GET(req:NextRequest,res:NextResponse) {
    res.status(200).json({message:"hello there"})
 }

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, description, publishDate } = await req.json();

    if (!title || !description || !publishDate) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const newEntry = await dbConnect.Entry.create({
      data: {
        title,
        description,
        publishDate,
      },
    });

    return new NextResponse(JSON.stringify(newEntry), { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
