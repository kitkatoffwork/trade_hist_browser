export const inputTask = (task) => ({
  type: 'INPUT_TASK',
  payload: { task }
});

export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: { task }
});


const sleep1000ms = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export function asyncAddTask(task) {
  return async(dispatch, getState) => {
    await sleep1000ms();
    dispatch(addTask(task))
  };
}
