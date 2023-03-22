'use client';
import { useState } from "react";
import {addToPangoNotiList} from "@/lib/client/NotificationHandler";
import axios from "axios";

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    async function subscribe(email) {
        try {
            const response = await axios.post("/api/subscribe", {
                email,
            });

            const { recipientId } = response.data;
            return recipientId;
        } catch (error) {
            console.error("Error subscribing", error);
            throw error;
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await subscribe(email);
            setSuccess(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={'subscribe-form'}>
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Subscribe"}
            </button>
            {error && <p>Error: {error}</p>}
            {success && <p>Successfully subscribed!</p>}
        </form>
    );
}