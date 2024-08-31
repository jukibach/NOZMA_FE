import { Group, Text, UnstyledButton, createStyles } from '@mantine/core'

interface MainLinkProps {
  color: string
  label: string
  link: string
}

const data = [
  {
    color: 'blue',
    label: 'Exercises',
    link: '/exercises',
  },
  {
    color: 'teal',
    label: 'Exercises',
    link: '/exercises',
  },
]

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
function MainLink({ color, label, link }: MainLinkProps) {
  const { classes } = setting()
  return (
    <UnstyledButton className={classes.button}>
      <Group position='center'>
        <Text color={color} size='sm' fw={700} component='a' href={link}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

export default function MainLinks() {
  const links = data.map((link) => (
    <MainLink {...link} key={link.label}></MainLink>
  ))
  return <div>{links}</div>
}
