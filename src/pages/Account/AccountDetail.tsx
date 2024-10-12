import { API_URLS } from '@constants/API_URLS'
import { NotificationContext } from '@contexts/NotificationContext'
import {
  AccountColumnResponse,
  AccountDetailResponse,
  EditableAccountResponse,
  UpdatableAccountPayload,
} from '@interfaces/Account'
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useCustomPatchMutation } from '@query/useCustomMutation'
import { useCustomGetQuery } from '@query/useCustomQuery'
import { useContext, useEffect, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

interface childProps {
  accountId: string
  columns: AccountColumnResponse[]
  accountListRefetch: () => void
}

const editableInputs = ['accountName', 'email']

const parseDateString = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day) // month is 0-indexed
}

// Helper function to convert Date object to dd/MM/yyyy string
const formatDateToString = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // month is 0-indexed
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function AccountDetail({
  accountId,
  columns,
  accountListRefetch,
}: childProps) {
  const [opened, setOpened] = useState(false)
  const navigate: NavigateFunction = useNavigate()
  const { addMessage } = useContext(NotificationContext)!

  const {
    data: accountDetail,
    isFetching: isFetching,
    refetch,
  } = useCustomGetQuery<EditableAccountResponse>(
    `${API_URLS.ACCOUNT_LIST}/${accountId}`,
    undefined,
    {
      enabled: false, // Disable automatic fetching on mount
    }
  )

  const handleToggle = () => {
    setOpened(true)
    refetch()
  }

  const updateAccount = useCustomPatchMutation<UpdatableAccountPayload>(
    API_URLS.ACCOUNT_LIST,
    Number(accountId),
    {
      onSuccess(result) {
        refetch()
        accountListRefetch()

        if (result?.data.status === 'OK') {
          navigate('/accounts', {
            replace: true,
          })
          setOpened(false)
          addMessage('Successful', result.data.message)
        }
      },
    }
  )

  const form = useForm({
    initialValues: {
      accountName: '',
      email: '',
      firstName: '',
      lastName: '',
      birthdate: new Date(),
    },
  })

  useEffect(() => {
    if (accountDetail) {
      form.setValues({
        accountName: (accountDetail.data.result as EditableAccountResponse)
          .accountName,
        email: (accountDetail.data.result as EditableAccountResponse).email,
        firstName: (accountDetail.data.result as EditableAccountResponse)
          .firstName,
        lastName: (accountDetail.data.result as EditableAccountResponse)
          .lastName,
        birthdate: parseDateString(
          (accountDetail.data.result as EditableAccountResponse).birthdate
        ),
      })
    }
  }, [accountDetail])

  type FormValues = typeof form.values

  const handleSubmit = (values: FormValues) => {
    const formattedValues = {
      ...values,
      birthdate: formatDateToString(values.birthdate), // Convert Date object to string
    }

    updateAccount.mutateAsync(formattedValues)
  }
  const theme = useMantineTheme()
  return (
    <>
      <Button
        onClick={() => handleToggle()}
        variant='gradient'
        gradient={{
          from: 'teal',
          to: 'lime',
          deg: 105,
        }}
      >
        Detail
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Account Detail'
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {accountDetail && (
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            {columns.map((column: AccountColumnResponse) => {
              if (column.code === 'action') return

              if (column.code === 'fullName')
                return (
                  <div key={column.code}>
                    <TextInput
                      radius='md'
                      label='First name'
                      {...form.getInputProps('firstName')}
                    />
                    <TextInput
                      radius='md'
                      label='Last name'
                      {...form.getInputProps('lastName')}
                    />
                  </div>
                )

              if (editableInputs.some((url) => column.code === url))
                return (
                  <TextInput
                    radius='md'
                    key={column.code}
                    label={column.name}
                    {...form.getInputProps(column.code)}
                  />
                )

              if (column.code === 'birthdate')
                return (
                  <DatePickerInput
                    label={column.name}
                    key={column.code}
                    {...form.getInputProps(column.code)}
                    mx='auto'
                    maw={400}
                  />
                )
              return (
                <TextInput
                  radius='md'
                  key={column.code}
                  label={column.name}
                  readOnly
                  value={
                    (accountDetail.data.result as EditableAccountResponse)[
                      column.code
                    ] as string
                  }
                />
              )
            })}
            <Group position='center' mt='xl'>
              <Button variant='outline' type='submit' mt='md'>
                Update
              </Button>
            </Group>
          </form>
        )}
      </Modal>
    </>
  )
}
