import api from '../../../utils/api'

import { useState } from 'react'

import styles from './AddPet.module.css'
import formStyles from '../../form/Form.module.css'

import Input from '../../form/Input'
import Select from '../../form/Select'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {
  const [pet, setPet] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']
  const { setFlashMessage } = useFlashMessage()

  function onFileChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.files[0] })
  }

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  function handleColor(e) {
    setPet({
      ...pet,
      color: e.target.options[e.target.selectedIndex].text,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let msgType = 'success'

    const formData = new FormData()

    const petFormData = await Object.keys(pet).forEach((key) =>
      formData.append(key, pet[key]),
    )

    formData.append('pet', petFormData)

    const data = await api
      .post(`pets/create`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagens do Pet"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple="true"
        />
        <Input
          text="Nome do Pet"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={pet.name}
        />
        <Input
          text="Idade do Pet"
          type="number"
          name="age"
          placeholder="Digite a idade"
          handleOnChange={handleChange}
          value={pet.age}
        />
        <Input
          text="Peso do Pet"
          type="number"
          name="weight"
          placeholder="Digite o peso aproximado"
          handleOnChange={handleChange}
        />
        <Select
          name="category_id"
          text="Selecione a categoria"
          options={colors}
          handleOnChange={handleColor}
        />
        <input type="submit" value="Cadastrar" />
      </form>
    </section>
  )
}

export default AddPet
