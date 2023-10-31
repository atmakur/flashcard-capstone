import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function StudyView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [index, setIndex] = useState(0);
  const [front, setFront] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const selectedDeck = await readDeck(deckId, abortController.signal);
      setDeck(selectedDeck);
      setIndex(0);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const flipHandle = () => setFront((currFront) => !currFront);
  const nextHandle = (event) =>
    setIndex(() => {
      setFront(true);
      if (index < deck.cards.length - 1) return index + 1;
      else {
        if (
          !window.confirm(
            "Restart cards? \n Click cancel to return to the home page."
          )
        ) {
          history.push("/");
        }
        return 0;
      }
    });

  if (!deck.cards) return "Loading...";

  return (
    <>
      <Breadcrumbs name={deck.name}/>
      <h1>Study: {deck.name}</h1>
      {deck.cards.length <= 2 ? (
        <div>
          <h5>Not enough cards.</h5>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in the deck.
          </p>
          <a
            type="button"
            className="btn btn-primary"
            href={`/decks/${deckId}/cards/new`}
          >
            <i className="bi bi-plus-lg"> </i>
            Add Cards
          </a>
        </div>
      ) : (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{`Card ${index + 1} of ${
              deck.cards.length
            }`}</h5>
            <p className="card-text">
              {front ? deck.cards[index].front : deck.cards[index].back}
            </p>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={flipHandle}
            >
              Flip
            </button>
            {!front ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextHandle}
            >
              Next
            </button>
            ) : ("")}
          </div>
        </div>
      )}
    </>
  );
}

export default StudyView;
