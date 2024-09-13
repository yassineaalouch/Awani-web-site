import { useState } from 'react';
import TiptapEditor from '@/components/TiptapEditor'; // Adjust the path

function EditorPage() {
  const [content, setContent] = useState('<p>Initial content</p>');

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <h1 className="text-2xl mb-4">Tiptap Editor with Toolbar</h1>
      <form className="w-3/4">
        <TiptapEditor content={content} onChange={handleContentChange} />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Preview Content</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </form>
    </div>
  );
}

export default EditorPage;
