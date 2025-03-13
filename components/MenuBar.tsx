import { Editor } from '@tiptap/react';
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

/**
 * MenuBar component provides a toolbar for a rich text editor with various formatting options.
 *
 * @param {Object} props - The component props.
 * @param {Editor | null} props.editor - The editor instance to which the toolbar is attached.
 *
 * @returns {JSX.Element | null} The rendered toolbar component or null if the editor is not available.
 *
 * @component
 *
 * @example
 * <MenuBar editor={editorInstance} />
 *
 * @function
 * @name MenuBar
 *
 * @description
 * The MenuBar component renders a toolbar with buttons for various text formatting options such as bold, italic, headings, blockquotes, lists, code, links, and images. Each button interacts with the editor instance to apply the corresponding formatting.
 *
 * The component includes the following formatting options:
 * - Bold
 * - Italic
 * - Heading 2
 * - Blockquote
 * - Bullet List
 * - Ordered List
 * - Inline Code
 * - Code Block
 * - Horizontal Rule
 * - Link
 * - Image
 *
 * The `addImage` function prompts the user to enter an image URL and inserts the image into the editor.
 * The `setLink` function prompts the user to enter a URL and sets or updates a link in the editor.
 */
export const MenuBar = ({
  editor,
}: {
  editor: Editor | null;
}): JSX.Element | null => {
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
    <div className='mb-4 flex flex-wrap justify-between gap-2 border-b p-2 dark:border-gray-800'>
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
      <RichTextButton title='Image' onClick={addImage}>
        <MdImage />
      </RichTextButton>
    </div>
  );
};
