import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import PageLayout from "./shared/components/PageLayout";
import Marketers from "./pages/Marketers";
import Plan from "./pages/Plan";

function App() {
  return (
      <>
        <Router>
          <PageLayout>
            <Switch>
              <Route path="/plan" component={Plan} />
              <Route path="/forecast" component={Marketers} />
              <Route path="/" component={Home} exact />
            </Switch>
          </PageLayout>
        </Router>
      </>
  );
}

export default App;
