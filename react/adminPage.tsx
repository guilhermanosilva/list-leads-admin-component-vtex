import React, { FC, useState, useEffect } from 'react'
import { PageBlock } from 'vtex.styleguide'

import api from '../react/services/api'
import { ConfirmModal } from './components/ConfirmModal'
import { ListLeads } from './components/ListLeads'
import { UpdateLead } from './components/UpdateLead'
interface LeadItem {
  id: string
  name: string
  email: string
  phone: string
  type: string
  created_at: string
  updated_at: string
}

const AdminPage: FC = () => {
  const [leads, setLeads] = useState<LeadItem[]>([])
  const [currentLead, setCurrentLead] = useState<LeadItem>()
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<Boolean>(false)

  useEffect(() => {
    api.get('/leads').then((response: any) => {
      setLeads(response.data.Items)
    })
  }, [])

  function removeLead(id: string) {
    api.delete(`/leads/${id}`).catch(console.log)
  }

  function removeLeadFromTable(id: string) {
    const newLeads = leads.filter((lead) => lead.id !== id)
    setLeads(newLeads)
  }

  function handleUpdateLead(lead: LeadItem) {
    setCurrentLead(lead)
    handleToggleModal()
  }

  function handleToggleModal() {
    if (isOpenModal) {
      setIsOpenModal(false)
    } else {
      setIsOpenModal(true)
    }
  }

  function handleToggleDeleteModal() {
    if (isOpenDeleteModal) {
      setIsOpenDeleteModal(false)
    } else {
      setIsOpenDeleteModal(true)
    }
  }

  function handleRemove(data: LeadItem) {
    setCurrentLead(data)
    handleToggleDeleteModal()
  }

  function updateLeads(updatedLead: LeadItem) {
    setLeads((prev: LeadItem[]) => [...prev, updatedLead])
  }

  return (
    <div className="bg-muted-5 pa1">
      {!isOpenModal ? (
        <PageBlock title="Leads Cadastrados" variation="full">
          <ListLeads
            leads={leads}
            handleRemove={handleRemove}
            handleUpdateLead={handleUpdateLead}
          />
        </PageBlock>
      ) : (
        <UpdateLead
          currentLead={currentLead}
          updateLeads={updateLeads}
          removeLead={removeLead}
          isOpenModal={isOpenModal}
          handleToggleModal={handleToggleModal}
          removeLeadFromTable={removeLeadFromTable}
        />
      )}

      <ConfirmModal
        isOpenDeleteModal={isOpenDeleteModal}
        handleToggleDeleteModal={handleToggleDeleteModal}
        currentLead={currentLead}
        removeLead={removeLead}
        removeLeadFromTable={removeLeadFromTable}
      />
    </div>
  )
}

export default AdminPage
