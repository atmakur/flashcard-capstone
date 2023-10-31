import { useLocation, useParams } from "react-router-dom";

function Breadcrumbs({ name }) {
  const { pathname } = useLocation();
  const { deckId, cardId } = useParams();

  return (
    <div className="container" style={{ width: "100rem" }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li
            className={
              pathname === "/" ? "breadcrumb-item active" : "breadcrumb-item"
            }
          >
            <a href="/"><i className="bi bi-house-fill mr-1"></i>Home</a>
          </li>
          {pathname.startsWith("/decks/") && pathname.endsWith("/study") ? (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <a href={`/decks/${deckId}`}>{name}</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Study
              </li>
            </>
          ) : pathname.startsWith("/decks/") && pathname.endsWith("/edit") && pathname.indexOf("/cards/") < 0 ? (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <a href={`/decks/${deckId}`}>{name}</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Edit Deck
              </li>
            </>
          ) : pathname.startsWith("/decks/") &&
            pathname.endsWith("/cards/new") ? (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <a href={`/decks/${deckId}`}>{name}</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Add Card
              </li>
            </>
          ) : pathname.startsWith("/decks/") &&
            pathname.indexOf("/cards/") > 0 &&
            pathname.endsWith("/edit") ? (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <a href={`/decks/${deckId}`}>{name}</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Edit Card {cardId}
              </li>
            </>
          ) : pathname === "/decks/new" ? (
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          ) : pathname.startsWith("/decks/") ? (
            <li className="breadcrumb-item" aria-current="page">
              {name}
            </li>
          ) : (
            ""
          )}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumbs;
