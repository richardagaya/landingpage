// pages/index.tsx
import VideoPlayer from '../app/components/VideoPlayer';

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <VideoPlayer url="/Intro.mp4" />
    </div>
  );
};

export default Home;