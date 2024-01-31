"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AddNoteDialog } from "@/components/add-note-dialog";

const defaultNotes = [
  {
    id: 1,
    title: "Demo Note",
    note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    user: "Gurveer Singh",
  },
  {
    id: 2,
    title: "Week2 Delivery",
    note: `Your tasks this week include:
    • Develop a pseudocode algorithm for a collaborative note-taking application.
    • The application will need to support CRUD operations for creating, reading, updating,
    and deleting notes.
    • Create a video where you detail the process of exactly how to develop the above task.
    • The video is used for instructional purposes by employees of Pinnacle Data Tech, so it needs to be comprehensive, engaging, and informative!
    • Be prepared to screen your creation at the end of the week.`,
    user: "Rohit Sai",
  },
];

interface Note {
  id: number;
  title: string;
  note: string;
  user: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      localStorage.setItem("notes", JSON.stringify(defaultNotes));
    }
  }, []);

  const handleAddNote = (data: any) => {
    const newNote = {
      id: +new Date(),
      title: data.title,
      note: data.note,
      user: "Ashish Baravaliya",
    };
    setNotes([...notes, newNote]);
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
  };

  const handleRemoveNote = (id: number) => {
    const newNotes = notes.filter((note) => note.id !== +id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const handleUpdateNote = (data: any, id: number) => {
    const newNotes = notes.map((note) => {
      if (note.id === +id) {
        return {
          ...note,
          title: data.title,
          note: data.note,
        };
      }
      return note;
    });
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  return (
    <div className="flex h-screen">
      <div className="flex justify-between fixed inset-0 items-center h-16 px-6 border-b border-border bg-white shadow-md">
        <div className=" text-lg  flex flex-1">
          <Image src="/logo.png" alt="Logo" width={200} height={124} />
        </div>
        <div className="flex">
          <Avatar className="h-10 w-10 shadow-md ">
            <AvatarFallback className="bg-primary">AB</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div
        className="divWithDotsBackground flex-1 flex bg-white justify-center mt-16 py-6"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="rgb(93, 23, 23)" /></svg>')`,
        }}
      >
        <div className="flex flex-col gap-4 w-[800px] p-6 border-border border rounded-md justify-between bg-white shadow-md">
          <div className="flex flex-col gap-4 flex-1">
            <h1 className="text-3xl font-bold text-center">Notes</h1>
            <div className="flex flex-col flex-1 h-full">
              <div className="flex flex-wrap gap-5 mt-4 overflow-y-auto">
                {notes.map((note, ind) => (
                  <div
                    key={ind}
                    className="flex flex-col border border-border p-3 w-[220px] gap-2 bg-background rounded-[8px] shadow-md min-h-[235px]"
                  >
                    <p className="text-md font-bold">{note.title}</p>
                    <div className="flex flex-1">
                      <p
                        className="text-xs text-black/50"
                        style={{
                          display: "-webkit-box",
                          maxWidth: "200px",
                          WebkitLineClamp: 10,
                          WebkitBoxOrient: "vertical",
                          overflow: " hidden",
                        }}
                      >
                        {note.note}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 shadow-sm">
                          <AvatarFallback className="bg-primary text-xs">
                            {note.user
                              ? note.user.split(" ")[0][0] +
                                note.user.split(" ")[1][0]
                              : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <p className="ml-1.5 text-sm">{note.user}</p>
                      </div>
                      <Button
                        className="p-0 w-10 h-6 text-xs "
                        variant="secondary"
                        onClick={() => {
                          setSelectedNote(note);
                          setOpen(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedNote(null);
                  setOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddNoteDialog
        open={open}
        setOpen={setOpen}
        selectedNote={selectedNote}
        handleSave={handleAddNote}
        handleRemove={handleRemoveNote}
        handleUpdate={handleUpdateNote}
      />
    </div>
  );
}
