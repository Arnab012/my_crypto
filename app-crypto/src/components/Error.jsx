import React from 'react'
import{Alert, AlertIcon} from '@chakra-ui/react'

const Error = ({message}) => {
  return (
    <Alert status="error" pos={"fixed"} justifyContent={"center"} 
    top={"50%"}left={"50%"} transform={"translateX(-50%)"} w={"container.lg"}>

<AlertIcon/>
{message}

    </Alert>
  )
}

export default Error