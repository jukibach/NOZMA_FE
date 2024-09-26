import React, { ReactNode, useState } from 'react'
import { AppShell, useMantineTheme } from '@mantine/core'

import { CommonNavBar } from './CommonNavBar'
import HeaderMenu from './HeaderMenu'

interface ContainerProps {
  children?: ReactNode
}

function CommonTemplate({ children }: ContainerProps) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      padding='lg'
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={opened ? <CommonNavBar /> : undefined}
      header={
        <HeaderMenu opened={opened} onClick={() => setOpened((o) => !o)} />
      }
    >
      {children}
    </AppShell>
  )
}

export default CommonTemplate
