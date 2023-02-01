import { DashboardOutlined } from '@mui/icons-material'
import { AdminLayout } from 'components/layout/AdminLayout'
import React from 'react'

const DashboardPage = () => {
  return (
    <AdminLayout title='Dasboard' subTitle='Estadisticas generales' icon={ <DashboardOutlined /> }>
        <h3></h3>
    </AdminLayout>
  )
}

export default DashboardPage