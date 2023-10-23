import { View, Text } from 'react-native'
import React from 'react'
import OrderCard from '../../components/OrderCard'
const InProgress = () => {

  const oneOrder = {
    id:1,
    orderId:"Ed1234CZ",
    deliver:"My Home",
    locationIcon:"home",
    statusIcon:"dot-circle-o",
    status:"Ready to collect",
    payment:"$8.95",
    statusIconColor:"#08C25E"

  }
  const orders =[
    {
      id:1,
      orderId:"Ed1234CZ",
      delivery:"HOME",
      locationIcon:"home",
      statusIcon:"dot-circle-o",
      status:"Ready to collect",
      payment:"$8.95"

    },
    {
      id:2,
      orderId:"Ed1234CZ",
      delivery:"HOME",
      locationIcon:"home",
      statusIcon:"dot-circle-o",
      status:"Ready to collect",
      payment:"$8.95"

    },
    {
      id:3,
      orderId:"Ed1234CZ",
      deliver:"HOME",
      locationIcon:"home",
      statusIcon:"dot-circle-o",
      status:"Ready to collect",
      payment:"$8.95"

    },
  ]
  return (
    <View className="h-full bg-white">
      <OrderCard 
      orderId={oneOrder.orderId}
      deliver={oneOrder.deliver}
      locationIcon={oneOrder.locationIcon}
      statusIcon={oneOrder.statusIcon}
      status={oneOrder.status}
      payment={oneOrder.payment}
      statusIconColor="#08C25E"
      />
      <OrderCard 
      orderId={oneOrder.orderId}
      deliver={oneOrder.deliver}
      locationIcon={oneOrder.locationIcon}
      statusIcon="check-circle"
      status="Order Accepted"
      payment={oneOrder.payment}
      statusIconColor="#08C25E"
      />
      <OrderCard 
      orderId={oneOrder.orderId}
      deliver="My work"
      locationIcon="building"
      statusIcon={oneOrder.statusIcon}
      status="Order On Hold "
      payment={oneOrder.payment}
      statusIconColor="orange"
      />
      
    </View>
  )
}

export default InProgress