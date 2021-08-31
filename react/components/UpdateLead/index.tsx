import React, { useState } from 'react'
import { Modal, Button, Input } from 'vtex.styleguide'

import api from '../../services/api'

export function UpdateLead({
  currentLead,
  updateLeads,
  removeLeadFromTable,
  isOpenModal,
  handleToggleModal,
}: any) {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()

  function getName(e: any) {
    const value = e.target.value
    setName(value)
  }
  function getEmail(e: any) {
    const value = e.target.value
    setEmail(value)
  }
  function getPhone(e: any) {
    const value = e.target.value
    setPhone(value)
  }

  function handleUpdate(e: any) {
    e.preventDefault()

    const dataLead = {
      name,
      email,
      phone,
      type: currentLead?.type,
      created_at: currentLead?.created_at,
    }

    e.target.innerHTML = 'Enviando...'

    api.put(`/leads/${currentLead?.id}`, dataLead).then((res) => {
      removeLeadFromTable(currentLead?.id)

      setTimeout(() => {
        updateLeads(res.data)
        handleToggleModal()
        e.target.innerHTML = 'Enviar'
      }, 2000)
    })
  }

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        title="Atualização de Cadastro"
        responsiveFullScreen
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button variation="tertiary" onClick={handleToggleModal}>
                Cancelar
              </Button>
            </span>
            <span>
              <Button
                variation="primary"
                onClick={(e: Event) => handleUpdate(e)}
              >
                Enviar
              </Button>
            </span>
          </div>
        }
        onClose={handleToggleModal}
      >
        <div className="w-100 w-100-ns mv4 pv6-ns">
          <div className="w-100 mv6">
            <Input
              onChange={getName}
              placeholder={`${currentLead?.name}`}
              label="Nome"
              size="large"
              autoFocus={true}
            />
          </div>
          <div className="w-100 mv6">
            <Input
              onChange={getPhone}
              placeholder={`${currentLead?.phone}`}
              label="Telefone"
              size="large"
            />
          </div>
          <div className="w-100 mv6">
            <Input
              onChange={getEmail}
              placeholder={`${currentLead?.email}`}
              label="Email"
              size="large"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

// import React, { useState } from 'react'
// import api from '../../services/api'

// import './style.css'

// const UpdateForm = ({ handleToggleModal, currentLead, updateLeads, removeLead }: any) => {

//   const [name, setName] = useState()
//   const [email, setEmail] = useState()
//   const [phone, setPhone] = useState()
//   const [registered, setRegistered] = useState(false)

//   function getName(e: any) {
//     const value = e.target.value
//     setName(value)
//   }
//   function getEmail(e: any) {
//     const value = e.target.value
//     setEmail(value)
//   }
//   function getPhone(e: any) {
//     const value = e.target.value
//     setPhone(value)
//   }

//   function handleUpdate(e: any) {
//     e.preventDefault()

//     const dataLead = {
//       name,
//       email,
//       phone,
//       type: currentLead.type,
//       created_at: currentLead.created_at
//     }

//     api.put(`/leads/${currentLead.id}`, dataLead).then((res) => {
//       removeLead(currentLead.id)
//       updateLeads(res.data)
//       setRegistered(true)
//       hiddenMessage()
//     })
//   }

//   function hiddenMessage() {
//     setTimeout(() => {
//       setRegistered(false)
//       handleToggleModal()
//     }, 2000)
//   }

//   function UpdatedMessage() {
//     return (
//       <div>
//         Usuário atualizado
//       </div>
//     )
//   }

//   return (
//     <div>
//       {registered ?
//         (<UpdatedMessage />)
//         : <div>
//           {!registered ? <div>Atualizar Dados</div> : ''}
//           <form >
//             <div className="container">
//               <label htmlFor="lead-name">Nome</label>
//               <input type="text" name="name" id="lead-name" onChange={getName} placeholder="Nome" defaultValue={currentLead?.name} />
//             </div>

//             <div>
//               <label htmlFor="lead-email">Email</label>
//               <input type="text" name="email" id="lead-email" onChange={getEmail} placeholder="Email" defaultValue={currentLead?.email} />
//             </div>

//             <div>
//               <label htmlFor="lead-phone">Telefone</label>
//               <input type="text" name="phone" id="lead-phone" onChange={getPhone} placeholder="Telefone" defaultValue={currentLead?.phone} />
//             </div>

//             <div>
//               <button onClick={() => handleToggleModal()}>Fechar</button>
//               <button type="submit" onClick={(e) => handleUpdate(e)}>Atualizar</button>
//             </div>
//           </form>
//         </div>
//       }
//     </div>
//   )
// }

// export default UpdateForm
