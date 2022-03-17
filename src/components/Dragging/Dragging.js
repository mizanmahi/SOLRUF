import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const list = [
  {
    id: '1',
    content: 'item 1',
  },
  {
    id: '2',
    content: 'item 2',
  },
  {
    id: '3',
    content: 'item 3',
  },
  {
    id: '4',
    content: 'item 4',
  },
];

const Dragging = () => {
  const [itemList, setItemList] = useState(list);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const newItemList = [...itemList];
    const draggedItem = newItemList.splice(source.index, 1)[0];
    newItemList.splice(destination.index, 0, draggedItem);
    setItemList(newItemList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {itemList.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    draggable='true'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dragging;
