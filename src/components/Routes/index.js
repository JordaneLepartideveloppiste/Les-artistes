import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Trending from '../../pages/Trending';
import Profil from '../../pages/Profil';
import Navbar from '../Navbar';
import NotFound from '../../pages/NotFound';
import Footer from '../Footer';


const Index = () => {
  const [actualWidth, setActualWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateActualWidth = () => {
      let w = window;
      let width = w.innerWidth;
      setActualWidth(width);
    };
    window.addEventListener("resize", updateActualWidth);
    updateActualWidth();
    console.log(actualWidth);
  }, []);

    return (
      <div>
        <Router>
          <Navbar actualWidth={actualWidth}/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/trending" exact component={Trending} />
            <Route path="/profil" exact component={Profil} />
            <Route path="/*" component={NotFound} />
            <Redirect to="/" />
          </Switch>
          <Footer actualWidth={actualWidth} />
        </Router>
      </div>
    );
};

export default Index;