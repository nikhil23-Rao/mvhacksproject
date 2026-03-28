import React, { KeyboardEvent, MouseEvent } from "react";
import { Cardset } from "@/types/flashcard/Cardset";
import { Flashcard } from "@/types/flashcard/Flashcard";
import { Badge, Button } from "@mui/material";

interface IProps {
  set: Cardset;
  setCurrentSetInView: (i: Flashcard[]) => void;
  setCurrentCardInView: (i: Flashcard) => void;
  setOpenSet: (i: boolean) => void;
  setEditModal: (i: boolean) => void;
  setProgressView: (i: number) => void;
  setFlashcards?: (i: Flashcard[]) => void;
  setId: (i: string) => void;
  setName: (i: string) => void;
  setProgressCount: (i: number) => void;
  setCoralResponses: (i: { [key: number]: string }) => void;
  bg: string;
  color: string;
}
export const SetView = ({
  set,
  setCurrentCardInView,
  setCurrentSetInView,
  setOpenSet,
  setProgressView,
  setEditModal,
  setFlashcards,
  setId,
  setName,
  setProgressCount,
  setCoralResponses,
  bg,
  color,
}: IProps) => {
  // Handle opening the set (used by click and keyboard)
  const openSet = () => {
    setCurrentSetInView([...set.flashcardSet]);
    setCurrentCardInView([...set.flashcardSet][0]);
    setOpenSet(true);
    setProgressView(0);
    setProgressCount(0);
    setCoralResponses({});
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSet();
    }
  };

  const handleGearClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setName(set.cardsetName);
    setId(set.docid);
    if (setFlashcards) {
      setFlashcards([...set.flashcardSet] as Flashcard[]);
    }
    setOpenSet(false);
    setEditModal(true);
  };

  return (
    <section
      role="button"
      tabIndex={0}
      onClick={openSet}
      onKeyDown={onKeyDown}
      className="relative rounded-2xl bg-[#2c4ffe] text-white shadow-lg transform transition-transform duration-200 hover:scale-103 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full"
      style={{ padding: 20 }}
      aria-label={`${set.cardsetName} flashcard set`}
    >
      {/* top-right gear (edit) - stops propagation so it doesn't open the set */}
      <Button
        onClick={handleGearClick}
        aria-label={`Edit ${set.cardsetName}`}
        style={{
          position: "absolute",
          top: 2,
          right: 2,
          minWidth: "auto",
          padding: 8,
          color: "rgba(255,255,255,0.95)",
        }}
      >
        <i className="fa fa-gear fa-lg" aria-hidden />
      </Button>

      {/* content - centered */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* class label */}
        <span className="text-sm text-white/80 tracking-wide">{set.class}</span>

        {/* title */}
        <h3 className="mt-2 text-2xl font-extrabold leading-snug text-white">
          {set.cardsetName}
        </h3>

        {/* metadata */}
        <p className="mt-3 text-sm text-white/70">
          {set.flashcardSet?.length ?? 0} cards
          {set.units && set.units.length > 0 ? ` • ${set.units.join(", ")}` : ""}
        </p>
      </div>
    </section>
  );
};
