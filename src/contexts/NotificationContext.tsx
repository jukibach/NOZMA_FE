import { createContext, ReactNode } from 'react'
import { notifications } from '@mantine/notifications'

// Define the shape of the Auth context
interface NotificationContextType {
  addMessage: (type: 'Successful' | 'Error' | 'Info', content: string) => void
}

interface NotificationContextProps {
  children: ReactNode
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({
  children,
}: NotificationContextProps) => {
  const addMessage = (
    type: 'Successful' | 'Error' | 'Info',
    content: string
  ) => {
    let color: string = ''
    switch (type) {
      case 'Successful':
        color = 'green'
        break
      case 'Error':
        color = 'red'
        break
      case 'Info':
        color = 'blue'
        break
    }

    notifications.show({
      title: type,
      message: content,
      color: color,
      autoClose: 2500,
      radius: 'md',
      styles: (theme) => ({
        root: {
          fontWeight: 600,
          fontSize: theme.fontSizes.xl,
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },
        title: {
          color: color,
          fontWeight: 600,
          fontSize: theme.fontSizes.lg,
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },
      }),
      sx: { backgroundColor: 'black', color: color },
    })
  }
  return (
    <NotificationContext.Provider value={{ addMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}
