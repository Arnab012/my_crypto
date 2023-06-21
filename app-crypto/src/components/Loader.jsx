import { Box,Spinner,  VStack } from '@chakra-ui/react'
import React from 'react'

const Loder = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"}/>
        <h1>Loading......</h1>


      </Box>


    </VStack>
  )
}

export default Loder