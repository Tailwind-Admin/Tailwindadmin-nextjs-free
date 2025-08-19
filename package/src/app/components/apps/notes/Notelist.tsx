"use client";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Alert, Button, TextInput, Tooltip } from "flowbite-react";
import { NotesType } from "@/app/(DashboardLayout)/types/apps/notes";

interface NotelistProps {
  notes: NotesType[];
  loading: boolean;
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const Notelist: React.FC<NotelistProps> = ({ notes, loading, onSelectNote, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (notes.length > 0) {
      const firstNoteId = notes[0].id;
      setActiveNoteId(String(firstNoteId));
    }
  }, [notes]);

  const filterNotes = (notes: NotesType[], nSearch: string) => {
    if (nSearch !== "")
      return notes.filter(
        (t: any) =>
          !t.deleted &&
          t.title.toLowerCase().includes(nSearch.toLowerCase())
      );

    return notes?.filter((t:any) => !t.deleted);
  };

  const filteredNotes = filterNotes(Array.isArray(notes) ? notes : [], searchTerm);    

  const handleNoteClick = (noteId: string) => {
    setActiveNoteId(noteId);
    onSelectNote(noteId);
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <TextInput
        id="search"
        value={searchTerm}
        placeholder="Search Notes"
        sizing="md"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h6 className="text-base mt-6">All Notes</h6>
      <div className="flex flex-col gap-3 mt-4">
        {filteredNotes && filteredNotes.length ? (
          filteredNotes.map((note:any ,index:any) => (
            <div key={index}>
              <div
                className={`cursor-pointer relative p-4 rounded-md bg-light${note.color} dark:bg-dark${note.color}
                ${activeNoteId === note.id ? "scale-100" : "scale-95"} transition-transform duration-200`}
                onClick={() => handleNoteClick(note.id)}
              >
                <h6 className={`text-base truncate text-${note.color}`}>
                  {note.title}
                </h6>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ld">
                    {new Date(note.datef).toLocaleDateString()}
                  </p>
                  <div>
                    <Tooltip content="Delete">
                      <Button
                        aria-label="delete"
                        className="bg-transparent h-8 w-8 text-ld p-0 flex items-center hover:bg-transparent hover:text-dark dark:hover:text-white dark:!bg-transparent"
                        onClick={() => onDeleteNote(note.id)}
                      >
                        <Icon icon="tabler:trash" height={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Alert
            color="error"
            icon={() => (
              <Icon
                icon="solar:info-circle-linear"
                className="me-2"
                height={20}
              />
            )}
          >
            <span className="font-medium"> No Notes Found!</span>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Notelist;
