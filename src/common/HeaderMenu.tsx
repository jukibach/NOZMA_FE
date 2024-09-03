import {
  Burger,
  Button,
  Flex,
  Group,
  Header,
  MediaQuery,
  Text,
  createStyles,
} from '@mantine/core'
import ILoginResponse from '../types/LoginResponse'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { debug } from 'console'
import { getCurrentUser } from '../services/auth-service'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: 60,
    p: 'lg',
  },
}))

interface Props {
  opened: boolean
  onClick: () => void
}
export default function HeaderMenu({ opened, onClick }: Props) {
  const navigate: NavigateFunction = useNavigate()
  const userStr = getCurrentUser()

  const displayBurger = () => {
    return (
      <MediaQuery
        styles={{
          display: 'none', // current user
        }}
      >
        <Burger opened={opened} onClick={onClick} mr='xl' />
      </MediaQuery>
    )
  }

  const navigateToSignInPage = () => {
    navigate('/login')
  }

  const displaySignInButton = () => {
    if (!userStr) {
      return (
        <Button
          variant='gradient'
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          uppercase
          radius='lg'
          size='lg'
          p='md'
          onClick={navigateToSignInPage}
        >
          Sign in
        </Button>
      )
    }
  }
  // if (auth?.token === undefined) {
  //   return <div>Loading...</div> // Render a loading state if `currentUser` is not yet defined
  // }

  return (
    <Header
      height={{ base: 70 }}
      p='md'
      withBorder={true}
      sx={(theme) => ({
        backgroundColor: theme.fn.rgba(theme.colors.blue[3], 1),
        borderRadius: '4px',
        flexDirection: 'row',
        gap: '16px',
        justifyContent: 'space-between',
        padding: '24px 16px',
        '@media max-width: 768px': {
          flexDirection: 'column',
        },
      })}
    >
      <Flex
        style={{
          height: '100%',
        }}
        align={'center'}
        justify={'space-between'}
      >
        <Group>
          {displayBurger()}
          <Text fw={700}>NOMZA</Text>
        </Group>
        {displaySignInButton()}
      </Flex>
    </Header>
  )
}
