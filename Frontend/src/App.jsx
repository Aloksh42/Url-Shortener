import { useState } from "react";
import "./App.css";
import UrlForm from "./UrlForm";

const App = () => {
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (url) => {
        try {
            const response = await fetch(
                "http://localhost:6001/api/createShortUrl",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ originalUrl: url }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to shorten URL");
            }

            const data = await response.json();
            setShortUrl(data.shortUrl);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <UrlForm onSubmit={handleSubmit} />
            {shortUrl && (
                <div>
                    <p>Shortened URL:</p>
                    <a href={shortUrl} target="_blank">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default App;
