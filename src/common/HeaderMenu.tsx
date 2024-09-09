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
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { LocalDataClass } from '../data-class/LocalDataClass'

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
  const user = LocalDataClass.user

  const displayBurger = () => {
    return (
      <MediaQuery
        styles={{
          display: 'none', // current user
        }}
      >
        <Burger opened={opened} onClick={onClick} mr='xl' color='white' />
      </MediaQuery>
    )
  }

  const navigateToSignInPage = () => {
    navigate('/login')
  }

  const displaySignInButton = () => {
    if (!user.profileToken) {
      return (
        <Button
          variant='gradient'
          style={{
            backgroundColor: 'blue',
          }}
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

  return (
    <Header
      height={{ base: 70 }}
      p='md'
      withBorder={true}
      sx={(theme) => ({
        backgroundImage: theme.fn.gradient({
          from: 'teal',
          to: 'lime',
          deg: 15,
        }),
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
          <Text fw={600} color='white'>
            NOZMA
          </Text>
        </Group>
        {displaySignInButton()}
      </Flex>
    </Header>
  )
}
