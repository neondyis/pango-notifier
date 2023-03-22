import {CourierClient} from "@trycourier/courier";

const courier = new CourierClient({
    authorizationToken: process.env.NEXT_PUBLIC_COURIER_API_KEY,
});

export async function addToPangoNotiList(email) {
    try {
        const listId = "PangoNoti";

        const recipientId = await courier.lists.addRecipient({
            listId,
            recipient: {
                email,
            },
        });

        console.log(`Added ${email} to list ${listId}`);
        return recipientId;
    } catch (error) {
        console.error("Error adding email to list", error);
        throw error;
    }
}