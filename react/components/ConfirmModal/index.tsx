import React, { useState } from 'react'
import { ModalDialog } from 'vtex.styleguide'

export function ConfirmModal({
  isOpenDeleteModal,
  handleToggleDeleteModal,
  currentLead,
  removeLeadFromTable,
  removeLead,
}: any) {
  const [isLoading, setIsLoading] = useState(false)

  function handleConfirmation() {
    removeLead(currentLead?.id)
    setIsLoading(true)

    setTimeout(() => {
      removeLeadFromTable(currentLead?.id)
      handleToggleDeleteModal()
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div>
      <ModalDialog
        centered
        loading={isLoading}
        confirmation={{
          onClick: handleConfirmation,
          label: 'Sim, excluir lead',
          isDangerous: true,
        }}
        cancelation={{
          onClick: handleToggleDeleteModal,
          label: 'Cancelar',
        }}
        isOpen={isOpenDeleteModal}
        onClose={handleToggleDeleteModal}
      >
        <div className="">
          <p className="f3 f3-ns fw3 gray">
            Tem certeza que deseja excluir esse cadastro?
          </p>
          <p>
            Essa ação é irreversível. Irá remover por completo todos os
            registros do usuário.
          </p>
        </div>
      </ModalDialog>
    </div>
  )
}
