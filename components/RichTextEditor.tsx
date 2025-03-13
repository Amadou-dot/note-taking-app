import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';

import { MenuBar } from './MenuBar';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

/**
 * RichTextEditor component provides a rich text editor with various features such as links, images, and placeholders.
 * It uses the `useEditor` hook to initialize the editor with specified extensions and configurations.
 *
 * @param {RichTextEditorProps} props - The properties for the RichTextEditor component.
 * @param {string} props.content - The initial content of the editor.
 * @param {function} props.onChange - Callback function to handle content changes.
 * @param {string} [props.placeholder='Start writing your note here...'] - Placeholder text for the editor.
 * @param {boolean} [props.readOnly=false] - Flag to set the editor in read-only mode.
 *
 * @returns {JSX.Element | null} The rendered RichTextEditor component or null if not mounted.
 */
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your note here...',
  readOnly = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle content updates from parent
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Don't render on server
  if (!isMounted) {
    return null;
  }

  return (
    <div className='rich-text-editor rounded-md border dark:border-gray-700'>
      {!readOnly && <MenuBar editor={editor} />}
      <div className='p-4'>
        <EditorContent
          className='prose h-full min-h-[50vh] w-full max-w-none dark:prose-invert focus:outline-none'
          editor={editor}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
