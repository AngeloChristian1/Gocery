import { View, Text } from 'react-native'
import React from 'react'
import OrderCard from '../../components/OrderCard'

const Canceled = () => {

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

    return (
      <View className="h-full bg-white">
     
        <OrderCard 
        orderId={oneOrder.orderId}
        deliver="My work"
        locationIcon="building"
        statusIcon={oneOrder.statusIcon}
        status="Order Canceled"
        payment={oneOrder.payment}
        statusIconColor="red"
        />
        
      </View>
    )
  
}

export default Canceled