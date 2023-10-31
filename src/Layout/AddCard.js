import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function AddCard() {
  const { deckId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const selectedDeck = await readDeck(deckId, abortController.signal);
      setDeck(selectedDeck);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleFront = ({ target }) => setFront(target.value);
  const handleBack = ({ target }) => setBack(target.value);
  const submitHandler = async (event) => {
    event.preventDefault();
    await createCard(deckId, { front: front, back: back });
    setFront("");
    setBack("");
  };

  return (
    <>
      <Breadcrumbs name={deck.name} />
      <div className="container w-50">
        <h3>{deck.name}: Add Card</h3>
        <form name="create" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Front</label>
            <textarea
              className="form-control"
              rows="2"
              onChange={handleFront}
              value={front}
              placeholder="Front side of card"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Back</label>
            <textarea
              className="form-control"
              rows="2"
              onChange={handleBack}
              value={back}
              placeholder="Back side of card"
              required
            />
          </div>
          <a href={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            Done
          </a>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCard;
