import { useDrag } from 'react-dnd';

interface DraggablePersonProps {
  id: number;
  name: string;
}

const DraggablePerson: React.FC<DraggablePersonProps> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'person',
    item: { id, name },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ backgroundImage: `url(path/to/${name}.jpg)`, backgroundSize: 'cover' }}
    >
      {name}
    </div>
  );
};

export default DraggablePerson;  // Ensure default export is used here
