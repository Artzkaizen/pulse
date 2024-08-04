"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { submitPost } from "./editor/actions";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async () => {
    await submitPost(input);
    editor?.commands.clearContent();
  };

  return <EditorContent editor={editor} />;
};

export default Editor;
