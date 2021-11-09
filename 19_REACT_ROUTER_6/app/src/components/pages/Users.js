import { useNavigate } from 'react-router-dom'

function Users() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  return (
    <section>
      <p>
        Voltar para a <button onClick={handleClick}>Home</button>
      </p>
      <h1>Users</h1>
    </section>
  )
}

export default Users
