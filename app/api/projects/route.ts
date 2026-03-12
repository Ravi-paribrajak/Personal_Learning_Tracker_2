import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    // PHASE 1: Receive the Data from Postman or Frontend
    const body = await request.json();

    // Check the Bounce score
    if (!body.title) {
        return NextResponse.json({ error: "Title is necessary" }, { status: 400 });
    }
    if (!body.status) {
        return NextResponse.json({ error: "status is necessary" }, { status: 400 });
    }
    if (!body.ai_usage_level) {
        return NextResponse.json({ error: "AI usage level must be specified!" }, { status: 400 });
    }

    // PHASE 2: Save to Database
    const newRecord = await prisma.projects.create({
        data: {
            title: body.title,
            architecture_written: body.architecture_written,
            deployed: body.deployed,
            tutorial_used: body.tutorial_used,
            ai_usage_level: body.ai_usage_level,
            status: body.status,
            user_id: "ravi-1"
        }
    });
    // PHASE 3: Send the Response Back
    return NextResponse.json({ message: "Project created!", data: newRecord }, { status: 201 });

}
// PHASE 4: Get Data back from Database
export async function GET() {

    // PHASE 1: Fetch from Database - Using where to fetch projects belonging to specific user
    const allProjects = await prisma.projects.findMany({
        where: {
            user_id: "ravi-1"  // Grabbing only this user data
        }
    });

    // PHASE 2: Send the Data Back:
    return NextResponse.json({ message: "project fetched!", data: allProjects }, { status: 200 });
};