import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type GetOnePostDTO = { id: string };
const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: GetOnePostDTO }) {
    console.log("GET request params:", params);
    const postId = parseInt(params.id);
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            category: true
        }
    });

    return NextResponse.json({
        status: 200,
        data: post
    });
}

export async function PUT(request: NextRequest, { params }: { params: GetOnePostDTO }) {
    const postId = parseInt(params.id);
    const body = await request.json();

    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title: body.title ?? undefined,
            content: body.content ?? undefined,
            categoryId: body.categoryId ?? undefined,
            category: body.category
                ? {
                      update: {
                          name: body.category.name ?? undefined
                      }
                  }
                : undefined
        },
    });
    return NextResponse.json({
        status: 200,
        data: post
    });
}

export async function DELETE(request: NextRequest, { params }: { params: GetOnePostDTO }) {
    const postId = parseInt(params.id);

    const post = await prisma.post.delete({
        where: {
            id: postId
        },
    });
    return NextResponse.json({
        status: 200,
        data: "post deleted"
    });
}




