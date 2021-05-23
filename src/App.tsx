import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/UI/NavBar/NavBar';
import QuizPage from './pages/QuizPage/QuizPage';
import ManageCardsPage from './pages/ManageCardsPage/ManageCardsPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/manage-cards" component={ManageCardsPage} />
          <Route exact path="/" component={QuizPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
