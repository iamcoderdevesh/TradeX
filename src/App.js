import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import { useStateContext } from './context/ContextProvider';

function App() {

  return (
    <div>
      <Navbar/>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
