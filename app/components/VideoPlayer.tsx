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
      className="flex justify-center items-center h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }} // Replace with your image path
    >
      <div className="relative w-full max-w-4xl">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing
          controls
          onProgress={handleProgress}
        />
        <Link href="/Test" passHref>
          <button
            className=" bg-basecolor hover:bg-second text-gray-900 font-bold py-4 px-4 rounded-full shadow-lg text-xl"
          >
            Take the Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoPlayer;
