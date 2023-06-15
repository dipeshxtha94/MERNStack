import Form from './components/Form';
import { useSelector } from 'react-redux';
import Task from './components/Task';


function App() {

  const flag = useSelector(state => state.counter.flag)


  return (
    <div>
      {flag && <Form />}
      <Task />

    </div>
  );
}

export default App;
