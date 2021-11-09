import { useHistory } from 'react-router-dom'

function Users() {
  const history = useHistory()

  function handleClick() {
    history.push('/')
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
