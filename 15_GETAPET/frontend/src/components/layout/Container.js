import styles from "./Container.module.css";

function Container({children}) {
  return <main className={styles.container}>
      {children}
  </main>
}

export default Container
