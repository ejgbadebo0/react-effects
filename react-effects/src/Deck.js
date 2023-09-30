import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Deck = () => {
    const [topCard, setTopCard] = useState(null);
    const [remaining, setRemaining] = useState(52);
    const [url, setURL] = useState('');

    async function drawCard() {
        //console.log(deck)
        try { 
            if (remaining <= 0) {
                throw new Error('no cards remaining!');
            }
            else {
                let resp = await axios.get(`${url}/draw/?count=1`);
                setTopCard(resp.data.cards[0]);
                console.log(topCard);
                setRemaining(resp.data.remaining);
                console.log(remaining); 
            }
        } catch(err) {
            alert(err);
        }

    }

    useEffect(() => {
        async function newDeck() {
            let resp = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setURL(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}`);
        }
        newDeck();
    }, [setURL])

    return (
        <div>
            <h3>Cards remaining: {remaining}</h3>
            <p> {topCard ? `${topCard.value} of ${topCard.suit}` : 'N/A' } </p>
            <img src={topCard ? `${topCard.image}` : ''} alt="card"></img>
            
            <button onClick={drawCard}>Draw Card</button>
        </div>
    )
}

export default Deck;