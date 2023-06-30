import styles from "./page.module.css";
import Home from "./components/Home";

export default function App() {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
