import React from 'react'
import { Table, Button } from 'vtex.styleguide'

const ListLeads = ({ leads, handleUpdateLead, handleRemove }: any) => {
  const defaultSchema = {
    properties: {
      name: {
        title: 'Nome',
      },
      phone: {
        title: 'Telefone',
        width: 130,
      },
      email: {
        title: 'Email',
        width: 250,
      },
      type: {
        title: 'Tipo',
        width: 100,
      },
      created_at: {
        title: 'Criando em',
        width: 230,
      },
      updated_at: {
        title: 'Atualizado em',
        width: 230,
      },
      actions: {
        title: 'Ações',
        width: 230,
        cellRenderer: ({ rowData }: any) => {
          return (
            <div>
              <span className="mb4">
                <Button
                  variation="danger-tertiary"
                  onClick={() => handleRemove(rowData)}
                >
                  Deletar
                </Button>
              </span>
              <span className="mb4">
                <Button
                  variation="tertiary"
                  onClick={() => handleUpdateLead(rowData)}
                >
                  Editar
                </Button>
              </span>
            </div>
          )
        },
      },
    },
  }

  return (
    <div className="mb5">
      <Table
        schema={defaultSchema}
        items={leads}
        indexColumnLabel="Index"
        onRowClick={() => {}}
      />
    </div>
  )
}

export { ListLeads }
