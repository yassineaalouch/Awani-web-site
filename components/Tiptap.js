'use client'

// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Toolbar from './Toolbar'
// const Tiptap = ({onChange, content}) => {
//     function handleChange(newContent){
//         onChange(newContent)
//     }
//     const editor = useEditor({
//     extensions: [StarterKit],
//     editorProps:{
//         attributes:{
//             class:""
//         }
//     },
//     onUpdate:({editor})=>{
//         handleChange(editor.getHTML())
//     }
//     })

//   return <div className='w-full px-4'>
//     <Toolbar editor={editor} content = {content}/>
//     <EditorContent style={{whiteSpace:'pre-line'}} editor={editor} />
//   </div>
// }

// export default Tiptap
// components/Tiptap.js

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Tiptap = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
