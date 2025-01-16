import { useDrop } from 'react-dnd';

interface DropZoneProps {
  onDrop: (item: any, index: number) => void;
  index: number;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, index }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'person',
    drop: (item) => onDrop(item, index),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`p-2 w-full h-full border-2 ${isOver ? 'border-green-500' : 'border-gray-400'} rounded`}
    >
      {canDrop ? "Release to drop" : "Drag a person here"}
    </div>
  );
};

export default DropZone;  // Ensure default export is used here
