import {CourierClient} from "@trycourier/courier";
import axios from "axios";
import crypto from "crypto"

const COURIER_API_KEY = process.env.NEXT_PUBLIC_COURIER_API_KEY;
const courier = new CourierClient({
    authorizationToken: COURIER_API_KEY,
});

const COURIER_API_BASE_URL = "https://api.courier.com";
const encodedApiKey = encodeURIComponent(COURIER_API_KEY);

export async function addToPangoNotiList(email) {
        const listId = "PangoNoti";
        try {
            const recipientId = crypto.randomUUID();
            const response = await axios.post(
                `${COURIER_API_BASE_URL}/profiles/${recipientId}`,
                {
                    profile: {email}
                },
                {
                    headers: {
                        Authorization: `Bearer ${encodedApiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            await courier.lists.postSubscriptions(listId, [{recipientId}]);
            console.log(`Added ${email} to list ${listId}`);
            return recipientId;
        } catch (error) {
            console.error("Error adding email to list", error);
            throw error;
        }
}