// import '../css/App.css';
import Friends from './Friends'
import Login from '../components/Login';

const link = "http://localhost:3000";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem('username') === null ? 
          <Login link={link} /> : <Friends link={link} />}
      </header>
    </div>
  );
}

export default App;
