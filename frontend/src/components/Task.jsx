import '../css/Task.css';

function App({text}) {
  return (
    <div className="Task">
      <input type="checkbox" id="todo1" />
      <label for="todo1">{text}</label>
    </div>
  );
}

export default App;
