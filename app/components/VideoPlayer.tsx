// components/VideoPlayer.tsx
"use client";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

interface VideoPlayerProps {
  url: string; // URL of the video
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [, setProgress] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen min-w-full bg-cover bg-center bg-no-repeat fixed top-0 left-0 right-0 bottom-0"
      style={{ 
        backgroundImage: "url('/background.png')", // Replace with your image path
        backgroundSize: "cover", // Ensure the background covers the entire screen
        backgroundPosition: "center", // Center the background image
      }}
    >
      <div className="relative w-full max-w-4xl flex flex-col items-center">
        {/* Card-like container for the video */}
        <div className="bg-gray-700 rounded-lg shadow-2xl overflow-hidden p-6 w-full">
          <div className="border-4 border-gray-700 rounded-lg overflow-hidden">
            <ReactPlayer
              ref={playerRef}
              url={url}
              width="100%"
              height="auto"
              playing
              controls
              onProgress={handleProgress}
            />
          </div>
          {/* Button below the video */}
          <div className="mt-6 flex justify-center">
            <Link href="/Quiz" passHref>
              <button
                className="bg-basecolor hover:bg-second text-gray-900 font-bold py-4 px-6 rounded-full shadow-lg text-xl"
              >
                START
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;