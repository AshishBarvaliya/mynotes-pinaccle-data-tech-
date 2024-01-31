"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Note {
  id: number;
  title: string;
  note: string;
  user: string;
}

interface SaveDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedNote: Note | null;
  handleSave: (data: any) => void;
  handleRemove: (id: number) => void;
  handleUpdate: (data: any, id: number) => void;
}

export const AddNoteDialog: React.FC<SaveDialogProps> = ({
  open,
  setOpen,
  selectedNote,
  handleSave,
  handleRemove,
  handleUpdate,
}) => {
  const [data, setData] = useState<{
    title: string;
    note: string;
  }>({
    title: "",
    note: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setData({
      title: "",
      note: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="p-8 border w-[1200px] border-border bg-white">
        <h4 className="text-lg">
          {selectedNote
            ? editMode
              ? "Edit Note"
              : selectedNote.title
            : "Add New Note"}
        </h4>
        {!selectedNote || (selectedNote && editMode) ? (
          <div className="grid gap-4 mt-2">
            <Input
              id="title"
              name="title"
              label="Title"
              required
              value={data?.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Textarea
              label={"Note"}
              value={data?.note}
              required
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </div>
        ) : selectedNote ? (
          <div className="mt-2 bg-background p-4 py-4 rounded-[8px] border border-border flex-1 flex-col h-full whitespace-break-spaces">
            {selectedNote?.note}
          </div>
        ) : null}
        <div className="flex flex-1 justify-between mt-3 items-center gap-4">
          {selectedNote && !editMode ? (
            <Button
              onClick={() => {
                handleRemove(selectedNote.id);
                setOpen(false);
                setData({
                  title: "",
                  note: "",
                });
              }}
              variant="destructive"
            >
              Delete
            </Button>
          ) : (
            <div />
          )}
          <div className="flex gap-4">
            <Button onClick={() => handleClose()} variant={"outline"}>
              Cancel
            </Button>
            {selectedNote ? (
              editMode ? (
                <Button
                  onClick={() => {
                    handleUpdate(data, selectedNote.id);
                    handleClose();
                  }}
                  variant="secondary"
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setData({
                      title: selectedNote?.title,
                      note: selectedNote?.note,
                    });
                    setEditMode(true);
                  }}
                  variant="secondary"
                >
                  Edit
                </Button>
              )
            ) : (
              <Button
                onClick={() => {
                  handleSave(data);
                  setOpen(false);
                  setData({
                    title: "",
                    note: "",
                  });
                }}
                variant="secondary"
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
