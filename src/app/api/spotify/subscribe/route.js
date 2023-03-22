import {addToPangoNotiList} from "@/lib/client/NotificationHandler";

export async function POST (req, res) {
    const { email } = await req.json();
    if (!email) {
        return Response.json({ error: "Email is required" }, { status: 400 });
    }
    try {
        const recipientId = await addToPangoNotiList(email);
        return Response.json({ recipientId }, { status: 200 });
    } catch (error) {
        console.error("Error adding email to list", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}