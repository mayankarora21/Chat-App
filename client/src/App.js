import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Routes from './components/Routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes></Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
