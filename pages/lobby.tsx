"use client";
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import styles from "@/app/styles/game.module.css";
import "@/app/styles/globals.css";

let socket: Socket;

export default function Lobby() {
  const router = useRouter();
  const [lobbyId, setLobbyId] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [playerChoice, setPlayerChoice] = useState<'split' | 'steal' | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<'split' | 'steal' | null>(null);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('ready', () => {
      setIsReady(true);
    });

    socket.on('opponent-choice', (choice: 'split' | 'steal') => {
      setOpponentChoice(choice);
    });
  };

  const createLobby = () => {
    const newLobbyId = Math.random().toString(36).substr(2, 5);
    setLobbyId(newLobbyId);
    socket.emit('create-lobby', newLobbyId);
  };

  const joinLobby = () => {
    socket.emit('join-lobby', lobbyId);
  };

  const makeChoice = (choice: 'split' | 'steal') => {
    setPlayerChoice(choice);
    socket.emit('make-choice', { lobbyId, choice });
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setIsReady(false);
  };

  const renderResult = () => {
    if (playerChoice && opponentChoice) {
      if (playerChoice === 'split' && opponentChoice === 'split') {
        return <p className={styles.result}>You chose to cooperate!</p>;
      } else if (playerChoice === 'split' && opponentChoice === 'steal') {
        return <p className={styles.result}>You chose to cooperate, but your opponent deflected!</p>;
      } else if (playerChoice === 'steal' && opponentChoice === 'split') {
        return <p className={styles.result}>You stole everything!</p>;
      } else if (playerChoice === 'steal' && opponentChoice === 'steal') {
        return <p className={styles.result}>Nobody wins!</p>;
      }
    }
    return null;
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
      <div className={styles.container}>
        
        <span className={styles.heading}>
        <h1 className={styles.splittext}>Split</h1>
        <h1>or</h1>
        <h1 className={styles.stealtext}>Steal</h1>
        </span>
       </div>
        {!isReady ? (
          <div>
            <button className={styles.button} onClick={createLobby}>Create Lobby</button>
            <input
              type="text"
              placeholder="Enter Lobby ID"
              value={lobbyId}
              onChange={(e) => setLobbyId(e.target.value)}
              className={styles.input}
            />
            <button className={styles.button} onClick={joinLobby}>Join Lobby</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Game Start</h2>
            {!playerChoice ? (
              <div className="flex gap-4">
                <button className={`${styles.choiceButton} ${styles.split}`} onClick={() => makeChoice('split')}>Split</button>
                <button className={`${styles.choiceButton} ${styles.steal}`} onClick={() => makeChoice('steal')}>Steal</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p>Your choice: {playerChoice}</p>
                {opponentChoice ? (
                  <>
                    <p>Opponent&apos;s choice: {opponentChoice}</p>
                    {renderResult()}
                    <button className={styles.playAgainButton} onClick={resetGame}>Play Again</button>
                  </>
                ) : (
                  <p>Waiting for opponent&apos;s choice...</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
