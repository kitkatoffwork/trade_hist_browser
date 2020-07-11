import { connect } from 'react-redux';
import TasksApp from '../components/TasksApp';
import { inputTask, addTask, asyncAddTask } from '../actions/tasks';

function mapStateToProps({ task, tasks }) {
  return {
    task,
    tasks
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
