import { useState } from 'react';
import styles from '../app/styles/game.module.css';

const Game = () => {
    const [player1Choice, setPlayer1Choice] = useState('');
    const [player2Choice, setPlayer2Choice] = useState('');
    const [result, setResult] = useState('');

    const playGame = () => {
        // Implement the game logic here based on player choices
        // For example, you can use if-else statements to determine the result

        // Update the result state based on the game outcome
        setResult('Game played! Player choices: ' + player1Choice + ' vs ' + player2Choice);
    };

    return (
        <div className={styles.gameContainer}>
            <h1 className={styles.gameTitle}>Prisoner&apos;s Dilemma Game</h1>
            
            <div className={styles.playerSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Player 1 Choice:</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={player1Choice}
                        onChange={(e) => setPlayer1Choice(e.target.value)}
                        title="Player 1 Choice"
                        placeholder="Enter choice (cooperate/defect)"
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Player 2 Choice:</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={player2Choice}
                        onChange={(e) => setPlayer2Choice(e.target.value)}
                        title="Player 2 Choice"
                        placeholder="Enter choice (cooperate/defect)"
                    />
                </div>
            </div>
            
            <button className={styles.playButton} onClick={playGame}>Play Game</button>
            
            <div className={styles.resultSection}>
                <h2 className={styles.resultTitle}>Result:</h2>
                <p>{result || 'Make your choices and play the game'}</p>
            </div>
        </div>
    );
};

export default Game;