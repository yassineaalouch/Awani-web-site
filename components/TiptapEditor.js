"use client";

import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'



import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaImage,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight
} from 'react-icons/fa';


export default function TiptapEditor({ content, toolBar, setContent, editable = true }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
      Image,
      TextStyle,
      Color.configure({
        types: ['textStyle', 'paragraph', 'heading'], // Ajoutez ici les types que vous voulez colorier
      }),
      TextAlign.configure({
        types: ['heading', 'List', 'Image', 'paragraph'],
      }),
    ],
    editable,
    content: content || '', // Set initial content
    onUpdate({ editor }) {
      const updatedContent = editor.getJSON();
      console.log('editor.getJSON()', editor.getJSON());

      setContent(updatedContent);
    },
    immediatelyRender: false
  });
  if (!editor) {
    // If editor is not initialized, don't render the toolbar or editor content
    return null;
  }
  const addImage = () => {
    const url = prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  return (
    <div className=" editor  h-fit ">
      <div className={toolBar ? '' : 'hidden'}>
        {/* Toolbar for formatting options */}
        <div className="toolbar border-b-2 flex items-center gap-4">
          <input
            type="color"
            onInput={event => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes('textStyle').color}
            data-testid="setColor"
          />
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            data-testid="unsetColor"
          >
            Unset color
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'active' : ''}
          >
            <FaBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'active' : ''}
          >
            <FaItalic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'active' : ''}
          >
            <FaStrikethrough />
          </button>
          <button
            type="button"
            onClick={() => { console.log('Toggle Heading H1'); editor.chain().focus().toggleHeading({ level: 1 }).run() }}
            className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
          >
            <FaHeading />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
          >
            <FaHeading style={{ fontSize: '0.75em' }} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'active' : ''}
          >
            <FaListUl />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'active' : ''}
          >
            <FaListOl />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}
          >
            <FaAlignLeft />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}
          >
            <FaAlignCenter />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}
          >
            <FaAlignRight />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetTextAlign().run()}>
            Unset text align
          </button>

          <button
            type="button"
            onClick={addImage}
          >
            <FaImage />
          </button>
        </div>

        <BubbleMenu className={toolBar ? '' : 'hidden'} editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>
          </div>
        </BubbleMenu>
      </div>
      {/* Editor content */}
      <EditorContent className='h-fit' editor={editor} />
    </div >
  );
}
