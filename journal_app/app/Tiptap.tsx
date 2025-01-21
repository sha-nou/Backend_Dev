"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
    },
    content: <div>hello world</div>,
  });

  return (
    <EditorContent
      editor={editor}
      className='!bg-slate-200 text-red-500'
      slotbefore={
        <div className='flex flex-wrap gap-2'>
          {editor && (
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              bold
            </button>
          )}
        </div>
      }
    />
  );
}
