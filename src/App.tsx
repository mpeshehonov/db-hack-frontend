import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import PageLayout from "./shared/components/PageLayout";

function App() {
  return (
      <>
        <Router>
          <PageLayout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/" component={Home} />
            </Switch>
          </PageLayout>
        </Router>
      </>
  );
}

export default App;
