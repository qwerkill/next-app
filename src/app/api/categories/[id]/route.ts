import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type GetOneCategoryDTO = { id: string };
const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: GetOneCategoryDTO }) {
    console.log("GET request params:", params);
    const categoryId = parseInt(params.id);
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        },
    });

    return NextResponse.json({
        status: 200,
        data: category
    });
}

export async function PUT(request: NextRequest, { params }: { params: GetOneCategoryDTO }) {
    const categoryId = parseInt(params.id);
    const body = await request.json();

    const category = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            name: body.name, 
        },
    });
    return NextResponse.json({
        status: 200,
        data: category
    });
}

export async function DELETE(request: NextRequest, { params }: { params: GetOneCategoryDTO }) {
    const categoryId = parseInt(params.id);

    const category = await prisma.category.delete({
        where: {
            id: categoryId
        },
    });
    return NextResponse.json({
        status: 200,
        data: "category deleted"
    });
}




