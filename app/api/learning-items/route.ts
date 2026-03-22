// Importing my tools
import { NextResponse } from 'next/server';
import { getAllLearningItems, createNewLearningItem } from "@/lib/services/learningService";
import { createItemSchema } from "@/lib/validators/learningValidator"; // Import the Bouncer!

// Export the Post Function
export async function POST(request: Request) {

    // PHASE 1: Receive the Data from Frontend or Postman
    const body = await request.json();

    // 2. THE BOUNCER: Validate the body against our Zod schema
    const validationResult = createItemSchema.safeParse(body);

    // 3. If validation fails, kick them out immediately with a 400 error!
    if (!validationResult.success) {

        // Build a super clean array of errors manually using the raw 'issues' data
        const cleanErrors = validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'), // Tells us the exact field name (e.g., "title")
            message: issue.message       // Tells us what went wrong
        }))

        return NextResponse.json(
            {
                error: "Invallid Data Provided",
                details: cleanErrors
            },
            {
                status: 400
            }
        );
    }
    // 4. If it passes, extract the clean data and send it to the Service
    const cleanData = validationResult.data;

    // 5. Ask the service to save it
    const newRecord = await createNewLearningItem(cleanData.title, cleanData.type);

    // PHASE 4: Send the Response Back
    return NextResponse.json({ message: "Learning_Items created!", data: newRecord }, { status: 201 });

};
// PHASE 4: Get data Back from Database
export async function GET() {

    // 1. Ask the service to get the data
    const items = await getAllLearningItems();


    // Send the Response
    return NextResponse.json({ message: "Learning_items fetched", data: items }, { status: 200 });
};


