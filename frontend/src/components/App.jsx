import '../css/App.css';
import Task from '../components/Task';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p><b>Welcome to you To-Do List!</b></p>
        <Task text={"Task 1"}></Task>
        <Task text={"Task 2"}></Task>
        <Task text={"Task 3"}></Task>
      </header>
    </div>
  );
}

export default App;
