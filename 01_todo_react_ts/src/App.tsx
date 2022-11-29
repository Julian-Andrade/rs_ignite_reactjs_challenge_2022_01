// Styles
import styles from "./App.module.css";
import "./global.css";

// Components
import { Header } from "./components/Header";
import { NewTaskForm } from "./components/NewTaskForm";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <NewTaskForm />
      </div>
    </div>
  );
}

export default App;
