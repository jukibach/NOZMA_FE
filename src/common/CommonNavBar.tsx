import {
  Group,
  Navbar,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core'
import MainLinks from './MainLinks'
import * as AuthService from '../services/auth-service'
import { useAuth } from '../contexts/AuthContext'

const setting = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}))

export function CommonNavBar() {
  const { classes } = setting()
  const userStr = AuthService.getCurrentUser()

  const widthStyles = {
    lg: 200,
    sm: 200,
    xl: 200,
    md: 200,
    xs: 200,
  }

  const displayLogout = () => {
    if (userStr) {
      return (
        <Navbar.Section>
          <UnstyledButton className={classes.button}>
            <Group position='center'>
              <Text
                color='red'
                size='sm'
                fw={700}
                component='a'
                onClick={() => AuthService.logout(userStr.profileToken)}
              >
                Log out
              </Text>
            </Group>
          </UnstyledButton>
        </Navbar.Section>
      )
    }
    return undefined
  }
  return (
    <Navbar width={widthStyles} p='xs'>
      <Navbar.Section grow mt='md'>
        <MainLinks />
      </Navbar.Section>
      {displayLogout()}
    </Navbar>
  )
}
