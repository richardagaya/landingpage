// pages/index.tsx
import VideoPlayer from '../components/VideoPlayer';

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <VideoPlayer url="/Intro.MOV" />
    </div>
  );
};

export default Home;
