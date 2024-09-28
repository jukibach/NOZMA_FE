import {
  Box,
  Group,
  NavLink,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core'
import { ReactNode, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { GiWeightLiftingUp } from 'react-icons/gi'
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
    label: 'Sign in',
    link: '/',
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
        // color={color}
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

  const links = data.map((link, index) => (
    <MainLink
      {...link}
      active={index === active}
      onClick={() => setActive(index)}
      key={link.label}
    ></MainLink>
  ))
  return <div>{links}</div>
}
