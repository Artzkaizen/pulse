"use client";

import { submitPost } from "@/components/posts/editor/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Mic } from "lucide-react";

const Createpost = () => {
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
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPost(input);
    editor?.commands.clearContent();
  };
  return (
    <section className="mt-2 w-full rounded-lg bg-secondary p-3">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-2">
            <Avatar className="size-14 border-2 border-purple-400">
              <AvatarImage
                src="https://github.com/shadcn.pwsdng"
                alt="@shadcn"
              />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            {/* <Input type="text" className="w-full rounded-md p-4" /> */}
            <div className="flex max-h-52 overflow-auto w-full items-center justify-between rounded-lg border bg-background p-3 ring-2 ring-secondary focus-within:bg-primary-foreground focus-within:ring-primary">
              <EditorContent editor={editor} />
              <Mic />
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div>
              <ul className="flex">
                <Button className="p-1" variant={"ghost"}>
                  Media
                </Button>
                <Button className="p-1" variant={"ghost"}>
                  Hashtags
                </Button>
                <Button className="p-1" variant={"ghost"}>
                  Schedule
                </Button>
              </ul>
            </div>
            <Button
              type="submit"
              disabled={!input.trim()}
              className="rounded-md bg-purple-500 px-6 py-2 font-semibold text-white"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Createpost;
