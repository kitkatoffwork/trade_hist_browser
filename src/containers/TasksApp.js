import { connect } from 'react-redux';
import TasksApp from '../components/TasksApp';
import { inputTask, addTask, } from '../reducers/tasks';

const sleep1000ms = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function asyncAddTask(task) {
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

// function addTaskAndClear(task) {
//   return (dispatch) => {
//     dispatch(addTask(task));
//     dispatch(inputTask(''));
//   };
// }

function mapStateToProps(state) {
  return {
    task: state.tasksReducer.task,
    tasks: state.tasksReducer.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inputTask(task) {
      dispatch(inputTask(task));
    },
    addTask(task) {
      dispatch(addTask(task));
    },
    asyncAddTask(task) {
      dispatch(asyncAddTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksApp)
