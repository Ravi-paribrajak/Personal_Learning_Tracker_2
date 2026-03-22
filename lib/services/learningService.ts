import { prisma } from "@/lib/prisma";

// Service to get all items
export async function getAllLearningItems() {

    const items = await prisma.learning_Items.findMany({
        where: {
            user_id: "ravi-1"
        },
    });
    return items;
}
// Service to create a new item
export async function createNewLearningItem(title: string, type: string) {

    const newItem = await prisma.learning_Items.create({
        data: {
            title: title,
            type: type,
            status: "In Progress",
            progress_percent: 0,
            user_id: "ravi-1",
        },
    });
    return newItem;
}