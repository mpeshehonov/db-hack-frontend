import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Layout } from 'antd';
import Home from './pages/Home';

function App() {
  return (
      <>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </Router>
      </>
  );
}

export default App;
