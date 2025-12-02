// src/App.tsx
import { useState } from "react";
import SetupScreen from "./screens/SetupScreen";
import GameScreen from "./screens/GameScreen";

// El modelo de jugador que usaremos en el juego
export type PlayerSetup = {
  id: number;
  name: string;
  color: string;
  avatar: string; // ruta a la imagen elegida (moneda/billete)
};

// El payload que guarda lo configurado en la pantalla inicial
// src/App.tsx
export type SetupPayload = {
  players: PlayerSetup[];
  durationMin: number;
  difficulty: "basico" | "intermedio" | "avanzado";
};


export default function App() {
  const [payload, setPayload] = useState<SetupPayload | null>(null);

  return (
    <>
      {!payload ? (
        <SetupScreen onStart={setPayload} />
      ) : (
        <GameScreen
          initialPlayers={payload.players}
          durationMin={payload.durationMin}
          difficulty={payload.difficulty}  
        />

      )}
    </>
  );
}
