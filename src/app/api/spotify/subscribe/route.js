export async function POST (req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const recipientId = await addToPangoNotiList(email);
        return res.status(200).json({ recipientId });
    } catch (error) {
        console.error("Error adding email to list", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}