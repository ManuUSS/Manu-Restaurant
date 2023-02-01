import { AttachMoneyOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { AdminLayout } from 'components/layout/AdminLayout'
import React from 'react'
import { SummaryTitle } from '../../components/admin/SummaryTitle';
import useSwr from 'swr';
import { DashboardSummaryResponse } from 'interfaces';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  
    const { data, error } = useSwr<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30000
    });

    const [ refreshIn, setRefreshIn ] = useState( 30 );

    useEffect(() => {
      const interval = setInterval(() => {
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
      }, 1000)
    
      return () => {
        clearInterval( interval );
      }
    }, []);
    

    if( !error && !data ) {
        return <></>
    }

    if( error ) {
        console.log( error );
        return <Typography>Error al cargar la información</Typography>
    } 
    
    const { 
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders 
    } = data!;
    return (
    <AdminLayout title='Dasboard' subTitle='Estadisticas generales' icon={ <DashboardOutlined /> }>
        <Grid container spacing={ 2 }>
            <SummaryTitle 
                title={ numberOfOrders }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ paidOrders }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ notPaidOrders }
                subTitle="Ordenes pendientes"
                icon={ <CreditCardOutlined color='error' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ numberOfClients }
                subTitle="Clientes"
                icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ numberOfProducts }
                subTitle="Productos"
                icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ productsWithNoInventory }
                subTitle="Sin existencias"
                icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> } 
            />
            <SummaryTitle 
                title={ lowInventory }
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