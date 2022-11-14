
import './App.css';
import { Route,Routes,BrowserRouter,Redirect} from'react-router-dom';
import FormIngresarUser from "./views/FormIngresarUser";
import Login from "./views/Login";
import Home from "./views/Home" ;
import PerfilUser from './views/PerfilUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import SavedChecklist from './views/SavedChecklist';
import ChecklistView from './views/ChecklistView';
import NewList from './views/NewList';
import Inventory from './views/Inventory';
import NotFoundView from './views/NotFoundView';




function App() {
  return (
    <div className="container colorPrimario">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFoundView/>}/>
          <Route exact path='/ingresar/user' element={<FormIngresarUser/>} />
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/logout' element={<Home/>}/>
          <Route exact path='/user' element={<PerfilUser/>}/>
          <Route exact path='/update/user/:id' element={<FormIngresarUser/>} />
          <Route exact path='/checklist' element={<SavedChecklist/>}/>
          <Route exact path='/list/:id' element={<ChecklistView/>}/>
          <Route exact path='/new-list' element={<NewList/>}/>
          <Route exact path='/my-inventory' element ={<Inventory/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
