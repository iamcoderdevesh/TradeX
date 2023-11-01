import { Provider } from "react-redux";
import { store } from "state/store";
import Route from 'routes';
function App() {

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
