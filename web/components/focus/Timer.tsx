
import { useState, useEffect } from "react";

export const Timer = () => {
  const [displayTime, setDisplayTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [timerId, setTimerId] = useState("Session");

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Change session/break time
  const changeTime = (amount: number, type: "Session" | "Break") => {
    if (timerOn) return;
    if (type === "Session") {
      const newSession = sessionTime + amount;
      if (newSession > 0 && newSession <= 60) {
        setSessionTime(newSession);
        setDisplayTime(newSession * 60);
      }
    } else {
      const newBreak = breakTime + amount;
      if (newBreak > 0 && newBreak <= 60) {
        setBreakTime(newBreak);
      }
    }
  };

  // Start/stop timer
  const toggleTimer = () => setTimerOn((prev) => !prev);

  // Timer effect
  useEffect(() => {
    if (!timerOn) return;
    if (displayTime === 0) {
      if (timerId === "Session") {
        setDisplayTime(breakTime * 60);
        setTimerId("Break");
      } else {
        setDisplayTime(sessionTime * 60);
        setTimerId("Session");
      }
      return;
    }
    const interval = setInterval(() => {
      setDisplayTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerOn, displayTime, timerId, breakTime, sessionTime]);

  // Reset timer
  const resetTime = () => {
    setBreakTime(5);
    setSessionTime(25);
    setDisplayTime(1500);
    setTimerId("Session");
    setTimerOn(false);
  };

  return (
    <section className="w-full max-w-lg mx-auto mt-16 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400 border-4 border-cyan-300/60 flex flex-col gap-8 focus-mode-timer">
      <header className="flex flex-col items-center gap-2">
        <span className="uppercase tracking-widest text-xs font-bold text-cyan-100/80 drop-shadow-md">
          {timerId === "Session" ? "Focus Session" : "Break"}
        </span>
        <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg select-none" aria-live="polite">
          {formatTime(displayTime)}
        </h1>
      </header>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Session Controls */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <span className="text-cyan-100/80 text-xs font-semibold tracking-wide uppercase">Session Length</span>
          <div className="flex items-center gap-2 bg-blue-800/60 rounded-xl px-4 py-2 shadow-inner">
            <button
              aria-label="Increase session length"
              className="focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded-full p-2 bg-cyan-500/80 hover:bg-cyan-400 text-white transition"
              onClick={() => changeTime(1, "Session")}
              disabled={timerOn}
            >
              <i className="fa fa-plus" />
            </button>
            <span className="text-2xl font-bold text-cyan-100 w-10 text-center select-none" id="session-length">
              {sessionTime}
            </span>
            <button
              aria-label="Decrease session length"
              className="focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded-full p-2 bg-cyan-500/80 hover:bg-cyan-400 text-white transition"
              onClick={() => changeTime(-1, "Session")}
              disabled={timerOn}
            >
              <i className="fa fa-minus" />
            </button>
          </div>
        </div>
        {/* Break Controls */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <span className="text-cyan-100/80 text-xs font-semibold tracking-wide uppercase">Break Length</span>
          <div className="flex items-center gap-2 bg-blue-800/60 rounded-xl px-4 py-2 shadow-inner">
            <button
              aria-label="Increase break length"
              className="focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded-full p-2 bg-cyan-500/80 hover:bg-cyan-400 text-white transition"
              onClick={() => changeTime(1, "Break")}
              disabled={timerOn}
            >
              <i className="fa fa-plus" />
            </button>
            <span className="text-2xl font-bold text-cyan-100 w-10 text-center select-none" id="break-length">
              {breakTime}
            </span>
            <button
              aria-label="Decrease break length"
              className="focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded-full p-2 bg-cyan-500/80 hover:bg-cyan-400 text-white transition"
              onClick={() => changeTime(-1, "Break")}
              disabled={timerOn}
            >
              <i className="fa fa-minus" />
            </button>
          </div>
        </div>
      </div>
      <footer className="flex justify-center gap-8 mt-4">
        <button
          aria-label={timerOn ? "Pause timer" : "Start timer"}
          className={`rounded-full p-4 text-2xl font-bold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${timerOn ? "bg-cyan-700 text-white hover:bg-cyan-600" : "bg-cyan-500 text-white hover:bg-cyan-400"}`}
          onClick={toggleTimer}
        >
          <i className={`fa fa-${timerOn ? "pause" : "play"}`} />
        </button>
        <button
          aria-label="Reset timer"
          className="rounded-full p-4 text-2xl font-bold shadow-lg bg-blue-900 text-cyan-200 hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-cyan-300"
          onClick={resetTime}
        >
          <i className="fa fa-rotate-left" />
        </button>
      </footer>
    </section>
  );
};
