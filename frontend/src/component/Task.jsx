import React from 'react';

const Task = ({ task }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.title);
  };

  return (
    <div style={{border:"1px solid red",padding:"12px"}}
     className="task" draggable onDragStart={handleDragStart}>
      {task.title}
    </div>
  );
};

export default Task;
