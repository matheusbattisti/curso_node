import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <h1>Home</h1>
      <p>
        Ver todos os usuários: <Link to="/allusers">Clique aqui</Link>
      </p>
    </section>
  )
}

export default Home
