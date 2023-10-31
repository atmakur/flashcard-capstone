import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck, listDecks } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function NewDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const changeHandlerName = ({ target }) => setName(target.value);
  const changeHandlerDesc = ({ target }) => setDescription(target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let decks = await listDecks();
    let maxId = 0;
    decks.forEach((d, i) => {
      if (d.id > maxId) maxId = d.id;
    });
    await createDeck({ id: maxId + 1, name: name, description: description });

    setName("");
    setDescription("");
    history.push(`/decks/${maxId + 1}`);
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container w-50">
        <h1>Create Deck</h1>
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
          <a href="/" className="btn btn-secondary mr-2">
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

export default NewDeck;
