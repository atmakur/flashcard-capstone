import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const selectedDeck = await readDeck(deckId, abortController.signal);
      setDeck(selectedDeck);
      setName(selectedDeck.name);
      setDescription(selectedDeck.description);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const changeHandlerName = ({ target }) => setName(target.value);
  const changeHandlerDesc = ({ target }) => setDescription(target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck({ ...deck, name: name, description: description });
    history.push(`/decks/${deckId}`);
  };

  if (!deck) return "Loading...";

  return (
    <>
      <Breadcrumbs name={deck.name}/>
      <div className="container w-50">
        <h1>Edit Deck</h1>
        <form name="create" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={changeHandlerName}
              value={name}
              placeholder="Deck Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={changeHandlerDesc}
              value={description}
              placeholder="Brief description of the deck"
              required
            />
          </div>
          <a href={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            Cancel
          </a>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditDeck;
