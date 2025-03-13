import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import {
    MdCode,
    MdCodeOff,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdHorizontalRule,
    MdImage,
    MdLink,
    MdTitle,
} from 'react-icons/md';

import RichTextButton from './ui/RichTextButton';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the image URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className='mb-4 flex flex-wrap gap-2 border-b p-2 dark:border-gray-800 justify-between'>
      <RichTextButton
        isActive={editor.isActive('bold')}
        title='Bold'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <MdFormatBold />
      </RichTextButton>
      <RichTextButton
        isActive={editor.isActive('italic')}
        title='Italic'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <MdFormatItalic />
      </RichTextButton>
      <div className='mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600' />
      <RichTextButton
        isActive={editor.isActive('heading', { level: 2 })}
        title='Heading 2'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <MdTitle />
      </RichTextButton>
      <RichTextButton
        isActive={editor.isActive('blockquote')}
        title='Quote'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <MdFormatQuote />
      </RichTextButton>
      <RichTextButton
        isActive={editor.isActive('bulletList')}
        title='Bullet List'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <MdFormatListBulleted />
      </RichTextButton>
      <RichTextButton
        isActive={editor.isActive('orderedList')}
        title='Ordered List'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <MdFormatListNumbered />
      </RichTextButton>
      <div className='mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600' />
      <RichTextButton
        isActive={editor.isActive('code')}
        title='Inline Code'
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <MdCode />
      </RichTextButton>
      <RichTextButton
        isActive={editor.isActive('codeBlock')}
        title='Code Block'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <MdCodeOff size={20} />
      </RichTextButton>
      <RichTextButton
        title='Horizontal Rule'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdHorizontalRule />
      </RichTextButton>
      <div className='mx-1 h-6 w-px bg-gray-300 dark:bg-gray-600' />
      <RichTextButton
        isActive={editor.isActive('link')}
        title='Link'
        onClick={setLink}
      >
        <MdLink />
      </RichTextButton>
      <RichTextButton
        title='Image'
        onClick={addImage}
      >
        <MdImage />
      </RichTextButton>
    </div>
  );
};

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
