import {
  Navbar,
} from '@mantine/core'
import MainLinks from './MainLinks'

interface Props {
  opened: boolean
}
export function CommonNavBar() {
  const widthStyles = {
    lg: 200,
    sm: 200,
    xl: 200,
    md: 200,
    xs: 200,
  }
  return (
    <Navbar width={widthStyles} p='xs'>
      <Navbar.Section>
        <MainLinks />
      </Navbar.Section>
    </Navbar>
  )
}
