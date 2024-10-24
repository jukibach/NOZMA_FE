import { API_URLS } from '@constants/API_URLS'
import {
  AccountColumnResponse,
  AccountDetailResponse,
} from '@interfaces/Account'
import { Button, Group, Modal, TextInput, useMantineTheme } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useCustomGetQuery } from '@query/useCustomQuery'
import { parseDateString } from '@utils/DateUtils'
import { useState } from 'react'

interface childProps {
  accountId: string
  columns: AccountColumnResponse[]
}

export function AccountDetail({ accountId, columns }: childProps) {
  const [opened, setOpened] = useState(false)

  const { data: accountDetail } = useCustomGetQuery<AccountDetailResponse>(
    `${API_URLS.ACCOUNT_LIST}/${accountId}`
  )

  const theme = useMantineTheme()
  return (
    <>
      <Button
        onClick={() => setOpened(true)}
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
          <form>
            {columns.map((column: AccountColumnResponse) => {
              if (column.code === 'action') return

              if (column.code === 'fullName')
                return (
                  <div key={column.code}>
                    <TextInput
                      radius='md'
                      readOnly
                      label='First name'
                      value={
                        (accountDetail.data.result as AccountDetailResponse)
                          .firstName
                      }
                    />
                    <TextInput
                      radius='md'
                      readOnly
                      label='Last name'
                      value={
                        (accountDetail.data.result as AccountDetailResponse)
                          .lastName
                      }
                    />
                  </div>
                )

              if (column.code === 'birthdate')
                return (
                  <DatePickerInput
                    label={column.name}
                    key={column.code}
                    readOnly
                    mx='auto'
                    maw={400}
                    value={parseDateString(
                      (accountDetail.data.result as AccountDetailResponse)
                        .birthdate
                    )}
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
            })}
            <Group position='center' mt='xl'>
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
