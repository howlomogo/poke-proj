import { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './views/Home'
import List from './views/List'
import Pokemon from './views/Pokemon'
import NotFound from './views/NotFound'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="bg-light">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <a className="navbar-brand" href="#">Poke Proj</a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                          <Link className="nav-link" to="/">Home</Link>
                        </li>

                        <li className="nav-item active">
                          <Link className="nav-link" to="/list">List</Link>
                        </li>
                      </ul>

                      <a href="http://localhost:3000/logout">
                        <button
                          className="btn btn-primary"
                        >
                          Account
                        </button>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

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
