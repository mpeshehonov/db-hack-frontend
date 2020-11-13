import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import PageLayout from "./shared/components/PageLayout";
import Marketers from "./pages/Marketers";

function App() {
  return (
      <>
        <Router>
          <PageLayout>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/marketers" component={Marketers} exact />
            </Switch>
          </PageLayout>
        </Router>
      </>
  );
}

export default App;
