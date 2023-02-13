import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./store/store"

import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
)
