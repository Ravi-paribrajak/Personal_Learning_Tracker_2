// Importing my tools
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import {getAllLearningItems, createNewLearningItem } from "@/lib/services/learningService";


// Export the Post Function
export async function POST(request: Request) {

    // PHASE 1: Receive the Data from Frontend or Postman
    const body = await request.json();

    // 2. Ask the service to save it
    const newRecord = await createNewLearningItem(body.title, body.type);
    
    // PHASE 3: Send the Response Back
    return NextResponse.json({ message: "Learning_Items created!", data: newRecord }, { status: 201 });

};
// PHASE 4: Get data Back from Database
export async function GET() {

    // 1. Ask the service to get the data
    const items = await getAllLearningItems();
    

    // Send the Response
    return NextResponse.json({ message: "Learning_items fetched", data: items }, { status: 200 });
};


