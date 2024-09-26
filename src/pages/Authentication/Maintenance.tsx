import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Anchor, Center, Container, Paper, Text } from '@mantine/core'
import CommonTemplate from '@common/CommonTemplate'

type Props = {}

const Maintenance: React.FC<Props> = () => {
  return (
    <CommonTemplate>
      <Center style={{ height: '70vh' }}>
        <Container size={500}>
          <Paper shadow='xl' p='xl' withBorder style={{ height: 400 }}>
            <Text size={25} weight={580} align='center' mt={70} mb={100}>
              The server is maintaining
            </Text>
          </Paper>
        </Container>
      </Center>
    </CommonTemplate>
  )
}

export default Maintenance
