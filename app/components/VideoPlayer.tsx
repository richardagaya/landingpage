// components/VideoPlayer.tsx
"use client";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

interface VideoPlayerProps {
  url: string; // URL of the video
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = (state: { playedSeconds: number; played: number }) => {
    setProgress(state.played);
    // Reveal text in the last 10 seconds of the video
    if (duration - state.playedSeconds <= 10 && !showText) {
      setShowText(true);
    }
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="p-4 text-center">
          <img src="/logo.jpg" alt="Logo" className="mx-auto h-12" />
        </div>
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing
          muted={false} // Ensure the video isn't muted (remove echo by avoiding duplicate playback)
          controls={false} // Remove default player controls
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={setDuration}
          progressInterval={500} // Update progress every 500ms
        />
        <div className="flex justify-center gap-2 my-4">
          <button
            onClick={() => changePlaybackRate(1)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            1x
          </button>
          <button
            onClick={() => changePlaybackRate(1.5)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            1.5x
          </button>
          <button
            onClick={() => changePlaybackRate(2)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            2x
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mx-4">
          <div
            className="bg-basecolor h-2.5 rounded-full"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
        {showText && (
          <Link href="/Test" passHref>
            <button className="bg-basecolor hover:bg-second text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg text-sm uppercase tracking-wider transition-all mt-4">
              Take the Test
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
