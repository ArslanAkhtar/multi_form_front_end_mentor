import styles from "./page.module.css";
import Home from "./components/Home";
import { AppContextProvider } from "./contexts/FormWizardContext";
export default function App() {
  return (
    <AppContextProvider>
      <main className={styles.main}>
        <Home />
      </main>
    </AppContextProvider>
  );
}
