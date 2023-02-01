import { AttachMoneyOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { AdminLayout } from 'components/layout/AdminLayout'
import React from 'react'
import { SummaryTitle } from '../../components/admin/SummaryTitle';

const DashboardPage = () => {
  return (
    <AdminLayout title='Dasboard' subTitle='Estadisticas generales' icon={ <DashboardOutlined /> }>
        <Grid container spacing={ 2 }>
            <SummaryTitle 
                title={ 1 }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Ordenes pendientes"
                icon={ <CreditCardOutlined color='error' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Clientes"
                icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Productos"
                icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Sin existencias"
                icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Bajo inventario"
                icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ 1 }
                subTitle="Actualizacion en: "
                icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} /> } 
            />
        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage