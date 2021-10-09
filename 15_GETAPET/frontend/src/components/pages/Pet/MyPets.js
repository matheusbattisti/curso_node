import { Link } from 'react-router-dom'

import styles from './MyPets.module.css'

function MyPets() {
  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>MyPets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        <p>Lista de pets</p>
      </div>
    </section>
  )
}

export default MyPets
