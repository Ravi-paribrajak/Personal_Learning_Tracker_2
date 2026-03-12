// Importing my tools
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';


// Export the Post Function
export async function POST(request: Request) {

    // PHASE 1: Receive the Data from Frontend or Postman
    const body = await request.json();

    // PHASE 2: Save to Database
    const newRecord = await prisma.learning_Items.create({
        data: {
            title: body.title,
            type: body.type,
            progress_percent: body.progress_percent,
            status: body.status,
            user_id: "ravi-1"

        }

    });
    // PHASE 3: Send the Response Back
    return NextResponse.json({ message: "Learning_Items created!", data: newRecord }, { status: 201 });

};
// PHASE 4: Get data Back from Database
export async function GET() {

    // PHASE 1: Fetch from Database - Using Where to fetch learnings_items belonging to specific user
    const newRecord = await prisma.learning_Items.findMany({
        where: {
            user_id: "ravi-1"    // Grabbing only this user data
        }
    });


    // PHASE 2: Send the Data Back
    return NextResponse.json({ message: "Learning_items fetched", data: newRecord }, { status: 200 });
};


