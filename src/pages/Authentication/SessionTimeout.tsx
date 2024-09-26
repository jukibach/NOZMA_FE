import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Anchor, Center, Container, Paper, Text } from '@mantine/core'
import CommonTemplate from '@common/CommonTemplate'

type Props = {}

const SessionTimeout: React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate()

  return (
    <CommonTemplate>
      <Center style={{ height: '70vh' }}>
        <Container size={500}>
          <Paper shadow='xl' p='xl' withBorder style={{ height: 400 }}>
            <Text size={25} weight={580} align='center' mt={70} mb={100}>
              You've been automatically logged out of your account because
              you've been idle for a while !
            </Text>
            <Text align='center' weight={500} variant='gradient' fw={500}>
              <Anchor
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                size={25}
                fw={700}
                onClick={() => navigate('/')}
              >
                Back to main page
              </Anchor>
            </Text>
          </Paper>
        </Container>
      </Center>
    </CommonTemplate>
  )
}

export default SessionTimeout
