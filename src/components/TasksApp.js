import React from 'react';

export default function TasksApp({ task, tasks, inputTask, addTask, asyncAddTask }) {
  return (
    <>
      <input type="text" onChange={(e) => inputTask(e.target.value)} />
      <input type="button" value="add" onClick={() => addTask(task)} />
      <input type="button" value="async add" onClick={() => asyncAddTask(task)} />
      <ul>
        {
          tasks.map(function(item, i) {
            return (
              <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    </>
  )
}
