import { useEffect, useState } from "react";
import DeckView from "./DeckView";
import { deleteDeck, listDecks } from "../utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error loading decks:", error);
      }
    }

    loadDecks();

    return () => abortController.abort();
  }, []);

  const delDeck = async (idToDelete) => {
      await deleteDeck(idToDelete);
      setDecks(decks.filter((deck) => deck.id !== idToDelete));
  };

  if (decks.length < 1) return "Loading...";

  return (
    <>
      {decks.map((d, i) => (
        <DeckView key={i} deleteHandle={() => delDeck(d.id)} deck={d} />
      ))}
    </>
  );
}

export default DeckList;
