import {Routes,Route} from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Error from './Components/Error';
import Logout from './Components/Logout';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/about" Component={About}/>
      <Route path="/contact" Component={Contact}/>
      <Route path="/signin" Component={Signin}/>
      <Route path="/signup" Component={Signup}/>
      <Route path="/logout" Component={Logout}/>
      <Route path="*" Component={Error}/>
    </Routes>
    </>
  );
}

export default App;


