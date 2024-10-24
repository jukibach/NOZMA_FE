import { API_URLS } from '@constants/API_URLS'
import { AuthContext } from '@contexts/AuthContext'
import { NotificationContext } from '@contexts/NotificationContext'
import { LocalDataClass } from '@data-class/LocalDataClass'
import {
  AccountColumnResponse,
  AccountDetailResponse,
  EditableAccountPayload,
  EditableAccountResponse,
} from '@interfaces/Account'
import {
  Button,
  Group,
  Modal,
  NavLink,
  Navbar,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import {
  useCustomPatchMutation,
  useCustomPutMutation,
} from '@query/useCustomMutation'
import { useCustomGetQuery } from '@query/useCustomQuery'
import { formatDateToString, parseDateString } from '@utils/DateUtils'
import { useContext, useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { IconAt } from '@tabler/icons-react'

interface childProps {
  accountId: number
  // columns: AccountColumnResponse[]
  // accountListRefetch: () => void
}

const editableInputs = ['accountName', 'email']

export function EditProfile({ accountId }: childProps) {
  const [opened, setOpened] = useState(false)
  const navigate: NavigateFunction = useNavigate()
  const { addMessage } = useContext(NotificationContext)!
  const { user, logout } = useContext(AuthContext)!

  const { data: accountDetail, refetch } =
    useCustomGetQuery<AccountDetailResponse>(
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

  const updateAccount = useCustomPutMutation<EditableAccountPayload>(
    API_URLS.ACCOUNT_LIST,
    Number(accountId),
    {
      onSuccess(result) {
        if (result?.data.status === 'OK') {
          const accountDetail = result?.data.result as EditableAccountResponse

          if (user.accountName !== accountDetail.accountName) {
            LocalDataClass.user = {
              ...user,
              profileToken: accountDetail.profileToken,
              refreshToken: accountDetail.refreshToken,
              accountName: accountDetail.accountName,
            }
          }
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

  type FormValues = typeof form.values

  useEffect(() => {
    if (accountDetail) {
      const payLoad = accountDetail.data.result as AccountDetailResponse

      form.setValues({
        accountName: payLoad.accountName,
        email: payLoad.email,
        firstName: payLoad.firstName,
        lastName: payLoad.lastName,
        birthdate: parseDateString(payLoad.birthdate),
      })
    }
  }, [accountDetail])

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
      <Navbar.Section>
        <NavLink
          label='Profile'
          fw={700}
          style={{ color: 'deepskyblue' }}
          component='a'
          onClick={handleToggle}
          icon={<CgProfile />}
        ></NavLink>
      </Navbar.Section>

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
            {(accountDetail.data.result as AccountDetailResponse).columns.map(
              (column: AccountColumnResponse) => {
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

                if (column.code === 'email')
                  return (
                    <TextInput
                      radius='md'
                      key={column.code}
                      label={column.name}
                      readOnly
                      value={
                        (accountDetail.data.result as AccountDetailResponse)[
                          column.code
                        ] as string
                      }
                      icon={<IconAt size='0.8rem' />}
                    />
                  )

                return (
                  <TextInput
                    radius='md'
                    key={column.code}
                    label={column.name}
                    readOnly
                    value={
                      (accountDetail.data.result as AccountDetailResponse)[
                        column.code
                      ] as string
                    }
                  />
                )
              }
            )}
            <Group position='center' mt='xl'>
              <Button variant='outline' type='submit' mt='md'>
                Update
              </Button>

              <Button
                variant='outline'
                mt='md'
                color='red'
                onClick={() => setOpened(false)}
              >
                Cancel
              </Button>
            </Group>
          </form>
        )}
      </Modal>
    </>
  )
}
