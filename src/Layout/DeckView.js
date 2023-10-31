import React from "react";

function DeckView({deck, deleteHandle}) {
    const deleteConfirm = (event) => {
        if(window.confirm("Delete this deck? \n\n You will not be able to recover it.")) {
            deleteHandle();
        }
    }
    return (
        <div className="card w-50">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{(deck.name)}</h5>
                    <span className="float right">{deck.cards ? (deck.cards.length) : 0} cards</span>
                </div>
                <p className="card-text">{(deck.description)}</p>
                <a href={`/decks/${deck.id}`} className="btn btn-secondary mr-2"><i className="bi bi-eye"> </i>View</a>
                <a href={`/decks/${deck.id}/study`} className="btn btn-primary"><i className="bi bi-book"> </i>Study</a>
                <button href="#" className="btn btn-danger float-right" onClick={deleteConfirm}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    );
}

export default DeckView;
