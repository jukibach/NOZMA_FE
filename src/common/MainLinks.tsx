import { Group, NavLink } from '@mantine/core'
import { ReactNode, useContext, useState } from 'react'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { MdAccountBox } from 'react-icons/md'
import { AuthContext } from '@contexts/AuthContext'
interface MainLinkProps {
  color: string
  label: string
  link: string
  active: boolean
  icon?: ReactNode
  onClick: () => void
}

const data = [
  {
    color: 'green',
    label: 'Exercises',
    link: '/',
    icon: <GiWeightLiftingUp size='1rem' />,
  },
  {
    color: 'teal',
    label: 'Accounts',
    link: '/accounts',
    icon: <MdAccountBox size='1.2rem' />,
  },
]
function MainLink({
  color,
  label,
  link,
  active,
  icon,
  onClick,
}: MainLinkProps) {
  const navigate: NavigateFunction = useNavigate()

  return (
    <Group position='center'>
      <NavLink
        label={label}
        active={active}
        variant='filled'
        fw={600}
        p='xs'
        onClick={() => {
          onClick
          navigate(link)
        }}
        icon={icon}
        sx={
          active
            ? (theme) => ({
                height: '2.5rem',
                backgroundImage: theme.fn.gradient({
                  from: 'teal',
                  to: 'lime',
                  deg: 15,
                }),
                color: theme.white,
              })
            : {}
        }
      ></NavLink>
    </Group>
  )
}

export default function MainLinks() {
  const [active, setActive] = useState(0)
  const { user } = useContext(AuthContext)!
  let location = useLocation()

  const links = data.map((link, index) => {
    if (!user.profileToken && link.label === 'Accounts') {
      return
    }
    return (
      <MainLink
        {...link}
        active={location.pathname === link.link}
        onClick={() => setActive(index)}
        key={link.label}
      ></MainLink>
    )
  })
  return <div>{links}</div>
}
