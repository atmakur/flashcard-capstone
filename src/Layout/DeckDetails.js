import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";

function DeckDetails() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const selectedDeck = await readDeck(deckId, abortController.signal);
      setDeck(selectedDeck);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const deleteConfirmDeck = async (idToDelete) => {
    if (
      window.confirm(
        "Delete this deck? \n\n You will not be able to recover it."
      )
    ) {
      await deleteDeck(idToDelete);
      history.push("/");
    }
  };

  const deleteConfirmCard = async (idToDelete) => {
    if (
      window.confirm(
        "Delete this card? \n\n You will not be able to recover it."
      )
    ) {
      await deleteCard(idToDelete);
      const selectedDeck = await readDeck(deckId);
      setDeck(selectedDeck);
    }
  };

  if (!deck.cards) return "Loading...";

  return (
    <>
    <Breadcrumbs name={deck.name}/>
      <div style={{ width: "40rem" }}>
        <h5>{deck.name}</h5>
        <p>{deck.description}</p>
        <a
          type="button"
          className="btn btn-secondary mr-2"
          href={`/decks/${deckId}/edit`}
        >
          <i className="bi bi-pencil mr-1"></i>
          Edit
        </a>
        <a
          type="button"
          className="btn btn-primary mr-2"
          href={`/decks/${deckId}/study`}
        >
          <i className="bi bi-book mr-1"></i>
          Study
        </a>
        <a
          type="button"
          className="btn btn-primary"
          href={`/decks/${deckId}/cards/new`}
        >
          <i className="bi bi-plus-lg mr-1"></i>
          Add Cards
        </a>
        <button
          type="button"
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={() => deleteConfirmDeck(deckId)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <h1>Cards</h1>
      <div>
        {deck.cards.map((c, i) => (
          <div className="card" style={{ width: "40rem" }} key={i}>
            <div className="card-body">
              <p
                className="card-text"
                style={{ float: "left", width: "15rem" }}
              >
                {c.front}
              </p>
              <p
                className="card-text"
                style={{ float: "right", width: "15rem" }}
              >
                {c.back}
              </p>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "1rem" }}>
              <a type="button" className="btn btn-secondary mr-2" href={`/decks/${deckId}/cards/${c.id}/edit`}>
                <i className="bi bi-pencil mr-1"></i>
                Edit
              </a>
              <button type="button" className="btn btn-danger" onClick={() => deleteConfirmCard(c.id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DeckDetails;
