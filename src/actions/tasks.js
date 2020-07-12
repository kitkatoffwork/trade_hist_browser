export const inputTask = (task) => ({
  type: 'INPUT_TASK',
  payload: { task }
});

export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: { task }
});

const updateInput = (value) => ({
  type: 'INPUT_TASK',
  payload: {
    value,
  },
})

const sleep1000ms = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export function asyncAddTask(task) {
  return async(dispatch, getState) => {
    const { task, tasks } = getState().tasksReducer;
    const regexp = new RegExp(task);
    console.log(`task: ${task}, tasks: ${tasks}`);

    if (regexp.test(tasks)) {
      console.log('This task is duplicated !');
      return;
    }

    await sleep1000ms();
    dispatch(addTask(task))
  };
}

//  INFO: redux-thunkがあるからできること
export function addTaskAndClear(task) {
  return (dispatch) => {
    dispatch(addTask(task));
    dispatch(updateInput(''));
  };
}
