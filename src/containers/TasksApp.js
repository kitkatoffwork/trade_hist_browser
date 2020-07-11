import { connect } from 'react-redux';
import TasksApp from '../components/TasksApp';
import { inputTask, addTask } from '../actions/tasks';

function mapStateToProps({ task, tasks }) {
  return {
    task,
    tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTask(task) {
      dispatch(addTask(task));
    },
    inputTask(task) {
      dispatch(inputTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksApp)
