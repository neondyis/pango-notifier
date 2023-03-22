'use client';
import { useState } from "react";
import {addToPangoNotiList} from "@/lib/client/NotificationHandler";

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await addToPangoNotiList(email);
            setMessage("Successfully added to the list!");
        } catch (error) {
            setMessage("Error adding to the list.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="subscribe-form">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Subscribe</button>
            {message && <p>{message}</p>}
        </form>
    );
}