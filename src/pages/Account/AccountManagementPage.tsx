import CommonTemplate from '@common/CommonTemplate'
import { API_URLS } from '@constants/API_URLS'
import classes from './AccountManagementTable.module.css'
import {
  AccountColumnResponse,
  AccountDetailResponse,
  AccountPagePayload,
  AccountTableResponse,
} from '@interfaces/Account'
import {
  ActionIcon,
  Flex,
  Group,
  Highlight,
  Input,
  LoadingOverlay,
  Pagination,
  ScrollArea,
  Select,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { useCustomGetQuery } from '@query/useCustomQuery'
import useDebounce from 'hooks/useDebounce'
import { useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { AccountDetail } from './AccountDetail'
import { MdClose } from 'react-icons/md'

const paginationValues = [
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
]

const AccountManagementPage: React.FC = () => {
  const [searchName, setSearchName] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const debouncedSearchName = useDebounce(searchName, 300)

  const accountTablePayload: AccountPagePayload = {
    page: pageIndex - 1,
    size: pageSize,
    searchName: debouncedSearchName,
  }

  useEffect(() => {
    setPageIndex(1)
  }, [searchName])

  const {
    data: accountManagementTable,
    isFetching: isTableFetching,
    refetch,
  } = useCustomGetQuery<AccountPagePayload, AccountTableResponse>(
    API_URLS.ACCOUNT_LIST,
    accountTablePayload
  )

  const totalItems =
    (accountManagementTable?.data?.result.totalRecords as number) || 0
  const totalPages = Math.ceil(totalItems / pageSize)
  const startItemIndex = (pageIndex - 1) * pageSize + 1
  const endItemIndex = Math.min(pageIndex * pageSize, totalItems)

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setPageIndex(1)
  }

  return (
    <CommonTemplate>
      <Stack>
        <Title
          order={4}
          variant='gradient'
          gradient={{ from: 'teal', to: 'lime', deg: 15 }}
        >
          Account Management
        </Title>

        <Flex justify='space-between' align='center'>
          <Group>
            <Group align='center'>
              <Pagination
                total={totalPages}
                value={pageIndex}
                onChange={setPageIndex}
                withEdges
                styles={(theme) => ({
                  control: {
                    '&[data-active]': {
                      backgroundImage: theme.fn.gradient({
                        from: 'teal',
                        to: 'lime',
                        deg: 105,
                      }),
                      border: 0,
                    },
                  },
                })}
              />
              <Select
                value={pageSize.toString()}
                onChange={handlePageSizeChange}
                data={paginationValues}
                sx={{ maxWidth: '70px' }}
              />
              {startItemIndex && endItemIndex && totalItems && (
                <Text>
                  {startItemIndex}-{endItemIndex} of {totalItems}
                </Text>
              )}
            </Group>

            <Input
              icon={<IoIosSearch />}
              variant='filled'
              placeholder='Search'
              onChange={(event) => {
                setSearchName(event.target.value)
              }}
              rightSection={
                searchName && (
                  <ActionIcon onClick={() => setSearchName('')}>
                    <MdClose size={16} />
                  </ActionIcon>
                )
              }
              value={searchName}
              styles={(theme) => ({
                input: {
                  '&:focus-within': {
                    borderColor: theme.colors.teal[7],
                  },
                },
              })}
            />

            {/* {user?.authStatus === 'SUCCESS' && (
              <Menu shadow='md' width={200}>
                <Menu.Target>
                  <Tooltip label='Show/Hide columns'>
                    <ActionIcon variant='transparent'>
                      <PiTextColumns size={24} />
                    </ActionIcon>
                  </Tooltip>
                </Menu.Target>
              </Menu>
            )} */}
          </Group>
          {/* {user?.authStatus === 'SUCCESS' && (
            <Flex p='md' justify='space-between'>
              <Flex sx={{ gap: '8px' }}>
                <Button
                  variant='gradient'
                  gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  uppercase
                >
                  Create a new account
                </Button>
              </Flex>
            </Flex>
          )} */}
        </Flex>

        <ScrollArea h={550}>
          <LoadingOverlay visible={isTableFetching} />
          <Skeleton visible={isTableFetching}>
            <Table
              captionSide='top'
              fontSize='sm'
              highlightOnHover
              horizontalSpacing='xl'
              striped
              verticalSpacing='xs'
              withBorder
              withColumnBorders
            >
              <thead className={classes.header}>
                <tr>
                  {accountManagementTable?.data?.result.columns.map(
                    (column: AccountColumnResponse) => (
                      <th
                        key={column.code}
                        style={{
                          textAlign: 'center',
                          color: 'white',
                        }}
                      >
                        {column.name}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {accountManagementTable?.data?.result.response.map(
                  (row: AccountDetailResponse) => (
                    <tr key={row.accountId}>
                      {accountManagementTable?.data?.result.columns.map(
                        (column: AccountColumnResponse) => {
                          if (column.code === 'action')
                            return (
                              <td key={column.code}>
                                <AccountDetail
                                  accountId={row['accountId'] as string}
                                  columns={
                                    accountManagementTable?.data?.result.columns
                                  }
                                  accountListRefetch={refetch}
                                ></AccountDetail>
                              </td>
                            )

                          return (
                            <td key={column.code}>
                              <Highlight
                                highlight={
                                  debouncedSearchName ? debouncedSearchName : ''
                                }
                                highlightStyles={(theme) => ({
                                  backgroundColor: theme.colors.teal[4],
                                })}
                              >
                                {(row[column.code] as string) ?? ''}
                              </Highlight>
                            </td>
                          )
                        }
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Skeleton>
        </ScrollArea>
      </Stack>
    </CommonTemplate>
  )
}
export default AccountManagementPage
