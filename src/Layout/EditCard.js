import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  useEffect(() => {
    setFront("");
    setBack("");
    setCard({});
    setDeck({});
    const abortController = new AbortController();
    async function loadDeck() {
    const currDeck = await readDeck(deckId);
    setDeck(currDeck);
      const currCard = await readCard(cardId);
      setCard(currCard);
      setFront(currCard.front);
      setBack(currCard.back);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleFront = ({ target }) => setFront(target.value);
  const handleBack = ({ target }) => setBack(target.value);
  const submitHandler = async (event) => {
    event.preventDefault();
    await updateCard({ ...card, front: front, back: back });
    setFront("");
    setBack("");
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <Breadcrumbs name={deck.name} />
      <div className="container w-50">
        <h3>Edit Card</h3>
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
            Cancel
          </a>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default EditCard;
