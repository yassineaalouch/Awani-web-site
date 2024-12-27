"use client";

import { useEffect, useState } from 'react';
import TiptapEditor from '../components/TiptapEditor';
import axios from 'axios';

export default function Home() {
    const [content, setContent] = useState(null); // Set to null to handle loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStackedData();
    }, []);

    async function getStackedData() {
        try {
            const response = await axios.get('/api/tiptap');
            const fetchedContent = JSON.parse(response.data[3].description);
            setContent(fetchedContent);
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async () => {
        console.log(content);
        const serializedContent = JSON.stringify(content);
        try {
            await axios.post('/api/tiptap', { description: serializedContent });
        } catch (error) {
            console.error("Failed to save content", error);
        }
    };

    if (loading) return <p>Loading...</p>; // Display a loading message while fetching

    return (
        <div className='p-10'>
            <h1>My Tiptap Editor</h1>
            <button onClick={handleSave}>Save Content</button>
            {content && <TiptapEditor content={content} editable={true} setContent={setContent} />} {/* Render editor only when content is available */}
        </div>
    );
}
