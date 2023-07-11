import styles from "./page.module.css";
import Home from "./components/Home";
import { FormWizardContextProvider } from "./contexts/FormWizardContext";
export default function App() {
  return (
    <FormWizardContextProvider totalSteps={4}>
      <main className={styles.main}>
        <Home />
      </main>
    </FormWizardContextProvider>
  );
}
