import { useState } from "react";
import { SignInContext } from "./Contexts/SignInContext";
import Formfirst from "./Forms/Form1/Formfirst";
import Dashboared from "./Components/Dashboared/Dashboared";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [bio, setBio] = useState(false);
  return (
    <div>
      <Router>
        {/* Nav, if loggedin show logOut btn instead of login else remove dasboared navlink */}
        <nav>
          <Link to="/" className="navlink">
            login
          </Link>
          <Link to="/dashboared" className="navlink">
            dasboared
          </Link>
        </nav>
        {/* End Nav */}

        {/* Routes */}
        {/* End Routes */}

        {/* Pages */}
        <Switch>
          {/* auth links */}
          <SignInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            <Route exact path="/" component={Formfirst} />

            <Route exact path="/dashboared" component={Dashboared} />
          </SignInContext.Provider>
          {/* end authLinks */}
        </Switch>
        {/* endPages */}
      </Router>
    </div>
  );
}

export default App;
