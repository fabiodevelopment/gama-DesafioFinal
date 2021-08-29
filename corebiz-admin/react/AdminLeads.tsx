import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import UsersTable from './UsersTable'

import './styles.global.css'

const AdminLeads: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-leads.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <UsersTable />
      </PageBlock>
    </Layout>
  )
}

export default AdminLeads
