import { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components
import Home from './views/Home'
import Header from './components/Header'
import List from './views/List'
import Pokemon from './views/Pokemon'
import NotFound from './views/NotFound'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />

          <div className="App">
            <Switch>
              <Route exact path="/list">
                <List />
              </Route>

              <Route exact path="/pokemon/:name">
                <Pokemon />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>

              {/* Catch all 404 route */}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
