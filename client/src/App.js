// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import React from 'react';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
// import Home from "./pages/Home";
// import AddEdit from "./pages/AddEdit";
// import View from "./pages/View";
// import Login from "./pages/Login";


// // exact path

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <ToastContainer position="top-center" />
//         <Switch>
//          <Route exact path="/Login" component={Login} />
//           <Route exact path="/" component={Home} />
//           <Route path="/addContact" component={AddEdit} />
//           <Route path="/update/:id" component={AddEdit} />
//           <Route path="/view/:id" component={View} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import Login from './pages/Login';
import SearchPage from './pages/SearchPage';
import AvailableTrainsPage from './pages/AvailableTrainsPage';
import BookingPage from './pages/BookingPage';
import TicketDetailsPage from './pages/TicketDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/addContact" component={AddEdit} />
          <Route path="/update/:id" component={AddEdit} />
          <Route path="/view/:id" component={View} />
          {/* New Routes */}
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/trains" component={AvailableTrainsPage} />
          <Route exact path="/book/:trainId" component={BookingPage} />
          <Route exact path="/ticket/:ticketId" component={TicketDetailsPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
