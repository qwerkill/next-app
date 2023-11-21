import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {
            category: true,
        },
    })
    return NextResponse.json({
        status: 200,
        data: posts
    })
}



export async function POST(resquest: NextRequest) {
    const body = await resquest.json()
    console.log("POST request body:", body)

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            categoryId: body.categoryId,
            category: body.category
                ? {
                      create: {
                          name: body.category.name ?? undefined
                      }
                  }
                : undefined
        },
})
    return NextResponse.json({
        status: 200,
        data: post
    })
}




