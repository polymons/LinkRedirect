import { useState, useEffect } from 'react';
import styles from '../app/styles/game.module.css';

// Game outcome types for statistics
type GameOutcome = 'mutualCooperation' | 'mutualDefection' | 'player1Exploited' | 'player2Exploited';

const Game = () => {
    // Player choices and results
    const [player1Choice, setPlayer1Choice] = useState('');
    const [player2Choice, setPlayer2Choice] = useState('');
    const [result, setResult] = useState('');
    const [gamePhase, setGamePhase] = useState('player1'); // player1, player2, results
    
    // Game statistics
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [round, setRound] = useState(1);
    const [showRules, setShowRules] = useState(false);
    const [showStats, setShowStats] = useState(false);
    
    // Detailed statistics
    const [statistics, setStatistics] = useState<{
        mutualCooperation: number;
        mutualDefection: number;
        player1Exploited: number;
        player2Exploited: number;
        averagePointsPerRound: number;
        totalRoundsPlayed: number;
    }>({
        mutualCooperation: 0,
        mutualDefection: 0,
        player1Exploited: 0,
        player2Exploited: 0,
        averagePointsPerRound: 0,
        totalRoundsPlayed: 0,
    });
    
    // Update average points per round whenever scores change
    useEffect(() => {
        if (statistics.totalRoundsPlayed > 0) {
            const totalPoints = player1Score + player2Score;
            setStatistics(prev => ({
                ...prev,
                averagePointsPerRound: totalPoints / statistics.totalRoundsPlayed
            }));
        }
    }, [player1Score, player2Score, statistics.totalRoundsPlayed]);
    
    const makeChoice = (player: 'player1' | 'player2', choice: 'cooperate' | 'defect') => {
        if (player === 'player1') {
            setPlayer1Choice(choice);
            setGamePhase('player2');
        } else {
            setPlayer2Choice(choice);
            setGamePhase('results');
            calculateResults(player1Choice, choice);
        }
    };
    
    const calculateResults = (p1Choice: string, p2Choice: string) => {
        let resultText = '';
        let p1Points = 0;
        let p2Points = 0;
        let outcome: GameOutcome | null = null;
        
        // Updated Prisoner's Dilemma payoffs as per request:
        // Both cooperate: Both get 3 points (mutual cooperation)
        // Both defect: Both get 1 point (mutual defection)
        // One cooperates, one defects: Defector gets 5 points, cooperator gets 0 (exploitation)
        
        if (p1Choice === 'cooperate' && p2Choice === 'cooperate') {
            resultText = 'Both players cooperated! You both receive 3 points.';
            p1Points = 3;
            p2Points = 3;
            outcome = 'mutualCooperation';
        } else if (p1Choice === 'defect' && p2Choice === 'defect') {
            resultText = 'Both players defected! You both receive 1 point.';
            p1Points = 1;
            p2Points = 1;
            outcome = 'mutualDefection';
        } else if (p1Choice === 'cooperate' && p2Choice === 'defect') {
            resultText = 'Player 1 cooperated while Player 2 defected! Player 2 receives 5 points, Player 1 gets 0.';
            p1Points = 0;
            p2Points = 5;
            outcome = 'player1Exploited';
        } else if (p1Choice === 'defect' && p2Choice === 'cooperate') {
            resultText = 'Player 1 defected while Player 2 cooperated! Player 1 receives 5 points, Player 2 gets 0.';
            p1Points = 5;
            p2Points = 0;
            outcome = 'player2Exploited';
        }
        
        // Update scores
        setPlayer1Score(prevScore => prevScore + p1Points);
        setPlayer2Score(prevScore => prevScore + p2Points);
        setResult(resultText);
        
        // Update statistics
        if (outcome) {
            setStatistics(prev => ({
                ...prev,
                [outcome]: prev[outcome] + 1,
                totalRoundsPlayed: prev.totalRoundsPlayed + 1
            }));
        }
    };
    
    const nextRound = () => {
        setRound(round + 1);
        setPlayer1Choice('');
        setPlayer2Choice('');
        setResult('');
        setGamePhase('player1');
    };
    
    const resetGame = () => {
        setRound(1);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Choice('');
        setPlayer2Choice('');
        setResult('');
        setGamePhase('player1');
        setStatistics({
            mutualCooperation: 0,
            mutualDefection: 0,
            player1Exploited: 0,
            player2Exploited: 0,
            averagePointsPerRound: 0,
            totalRoundsPlayed: 0
        });
    };
    
    const toggleRules = () => {
        setShowRules(!showRules);
        if (showStats) setShowStats(false);
    };
    
    const toggleStats = () => {
        setShowStats(!showStats);
        if (showRules) setShowRules(false);
    };

    return (
        <div className={styles.gameContainer}>
            <h1 className={styles.gameTitle}>Prisoner&apos;s Dilemma Game</h1>
            
            <div className={styles.gameNav}>
                <div className={styles.scoreboard}>
                    <div className={styles.scoreItem}>
                        <span>Round: {round}</span>
                    </div>
                    <div className={styles.scoreItem}>
                        <span>Player 1: {player1Score} pts</span>
                    </div>
                    <div className={styles.scoreItem}>
                        <span>Player 2: {player2Score} pts</span>
                    </div>
                </div>
                <div className={styles.navButtons}>
                    <button className={styles.rulesButton} onClick={toggleRules}>
                        {showRules ? 'Hide Rules' : 'Show Rules'}
                    </button>
                    <button className={styles.statsButton} onClick={toggleStats}>
                        {showStats ? 'Hide Stats' : 'Show Stats'}
                    </button>
                </div>
            </div>
            
            {showRules && (
                <div className={styles.rulesSection}>
                    <h2>Game Rules:</h2>
                    <p>In the Prisoner&apos;s Dilemma, two players must choose to either cooperate or defect:</p>
                    <ul>
                        <li>If both players cooperate, each receives 3 points.</li>
                        <li>If both players defect, each receives 1 point.</li>
                        <li>If one player cooperates and the other defects, the defector receives 5 points while the cooperator gets 0.</li>
                    </ul>
                    <p>This game is played in a &quot;hot seat&quot; style where players take turns on the same device.</p>
                </div>
            )}
            
            {showStats && (
                <div className={styles.statsSection}>
                    <h2>Game Statistics:</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Total Rounds:</span>
                            <span className={styles.statValue}>{statistics.totalRoundsPlayed}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Mutual Cooperation:</span>
                            <span className={styles.statValue}>{statistics.mutualCooperation} 
                                ({statistics.totalRoundsPlayed ? Math.round((statistics.mutualCooperation / statistics.totalRoundsPlayed) * 100) : 0}%)
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Mutual Defection:</span>
                            <span className={styles.statValue}>{statistics.mutualDefection}
                                ({statistics.totalRoundsPlayed ? Math.round((statistics.mutualDefection / statistics.totalRoundsPlayed) * 100) : 0}%)
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Player 1 Exploited:</span>
                            <span className={styles.statValue}>{statistics.player1Exploited}
                                ({statistics.totalRoundsPlayed ? Math.round((statistics.player1Exploited / statistics.totalRoundsPlayed) * 100) : 0}%)
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Player 2 Exploited:</span>
                            <span className={styles.statValue}>{statistics.player2Exploited}
                                ({statistics.totalRoundsPlayed ? Math.round((statistics.player2Exploited / statistics.totalRoundsPlayed) * 100) : 0}%)
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Avg. Points/Round:</span>
                            <span className={styles.statValue}>{statistics.averagePointsPerRound.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}
            
            {gamePhase === 'player1' && (
                <div className={styles.playerTurn}>
                    <h2>Player 1&apos;s Turn</h2>
                    <p>Player 2, please look away from the screen!</p>
                    <div className={styles.choiceButtons}>
                        <button 
                            className={`${styles.choiceButton} ${styles.cooperateButton}`}
                            onClick={() => makeChoice('player1', 'cooperate')}
                        >
                            Cooperate
                        </button>
                        <button 
                            className={`${styles.choiceButton} ${styles.defectButton}`}
                            onClick={() => makeChoice('player1', 'defect')}
                        >
                            Defect
                        </button>
                    </div>
                </div>
            )}
            
            {gamePhase === 'player2' && (
                <div className={styles.playerTurn}>
                    <h2>Player 2&apos;s Turn</h2>
                    <p>Player 1, please look away from the screen!</p>
                    <div className={styles.choiceButtons}>
                        <button 
                            className={`${styles.choiceButton} ${styles.cooperateButton}`}
                            onClick={() => makeChoice('player2', 'cooperate')}
                        >
                            Cooperate
                        </button>
                        <button 
                            className={`${styles.choiceButton} ${styles.defectButton}`}
                            onClick={() => makeChoice('player2', 'defect')}
                        >
                            Defect
                        </button>
                    </div>
                </div>
            )}
            
            {gamePhase === 'results' && (
                <div className={styles.resultSection}>
                    <h2 className={styles.resultTitle}>Round {round} Result:</h2>
                    <div className={styles.choiceSummary}>
                        <div className={`${styles.playerChoice} ${player1Choice === 'cooperate' ? styles.cooperateChoice : styles.defectChoice}`}>
                            Player 1: {player1Choice === 'cooperate' ? 'Cooperated' : 'Defected'}
                        </div>
                        <div className={`${styles.playerChoice} ${player2Choice === 'cooperate' ? styles.cooperateChoice : styles.defectChoice}`}>
                            Player 2: {player2Choice === 'cooperate' ? 'Cooperated' : 'Defected'}
                        </div>
                    </div>
                    <p className={styles.resultText}>{result}</p>
                    <div className={styles.actionButtons}>
                        <button className={styles.nextButton} onClick={nextRound}>Next Round</button>
                        <button className={styles.resetButton} onClick={resetGame}>Reset Game</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;