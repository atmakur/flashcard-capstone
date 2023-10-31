import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import { Link, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import NewDeck from "./NewDeck";
import StudyView from "./StudyView";
import DeckDetails from "./DeckDetails";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Layout() {
   
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" className="btn btn-secondary mb-1">
              <i className="bi bi-plus-lg"> </i>
              Create Deck
            </Link>
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckDetails />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyView />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
