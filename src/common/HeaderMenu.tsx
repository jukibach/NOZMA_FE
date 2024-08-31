import {
  Burger,
  Header,
  MediaQuery,
  Text,
  createStyles,
  rem,
} from '@mantine/core'
import classes from './HeaderMenu.module.css'

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
  return (
    <Header height={{ base: 50, md: 70 }} p='md' withBorder={true} >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={onClick} mr='xl' />
        </MediaQuery>
        <Text fw={700}>NOMZA</Text>
      </div>
    </Header>
  )
}
