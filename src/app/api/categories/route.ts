import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const categories = await prisma.category.findMany({
        include: {
            posts: true,
        },
    });
    return NextResponse.json({
        status: 200,
        data: categories
    });
}

export async function POST(resquest: NextRequest) {
    const body = await resquest.json();
    console.log("POST request body:", body);

    const category = await prisma.category.create({
        data: {
            name: body.name,
        },
    });
    return NextResponse.json({
        status: 200,
        data: category
    });
}