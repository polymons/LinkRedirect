import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Socket } from 'net';

interface ServerWithSocket extends NetServer {
  io?: SocketIOServer;
}

interface SocketWithServer extends Socket {
  server: ServerWithSocket;
}

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // Ensure res.socket exists and has a server property
  const socket = res.socket as SocketWithServer;

  if (!socket.server.io) {
    console.log('Initializing Socket.io server...');
    const io = new SocketIOServer(socket.server);

    io.on('connection', (socket) => {
      socket.on('create-lobby', (lobbyId: string) => {
        socket.join(lobbyId);
      });

      socket.on('join-lobby', (lobbyId: string) => {
        if (io.sockets.adapter.rooms.get(lobbyId)?.size === 1) {
          socket.join(lobbyId);
          io.to(lobbyId).emit('ready');
        }
      });

      socket.on('make-choice', ({ lobbyId, choice }: { lobbyId: string; choice: string }) => {
        socket.to(lobbyId).emit('opponent-choice', choice);
      });

      socket.on('disconnect', () => {
        // Handle player disconnection if needed
      });
    });

    socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
