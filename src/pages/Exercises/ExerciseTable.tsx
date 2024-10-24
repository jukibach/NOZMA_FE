import { SortableTableHeader } from '@common/SortableTableHeader'
import { API_URLS } from '@constants/API_URLS'
import { AuthContext } from '@contexts/AuthContext'
import { ExerciseColumnVisibilityPayload } from '@interfaces/ExerciseColumnVisibility'
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Highlight,
  Input,
  List,
  LoadingOverlay,
  Menu,
  Pagination,
  ScrollArea,
  Select,
  Skeleton,
  Stack,
  Switch,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { useCustomPatchMutation } from '@query/useCustomMutation'
import { useCustomGetQuery } from '@query/useCustomQuery'
import useDebounce from 'hooks/useDebounce'
import React, { useContext, useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { PiTextColumns } from 'react-icons/pi'
import CommonTemplate from '../../common/CommonTemplate'
import {
  ExerciseColumnResponse,
  ExercisePagePayload,
  ExerciseRowResponse,
  ExerciseTableResponse,
} from '../../interfaces/ExerciseTableResponse'
import classes from './ExerciseTable.module.css'

const paginationValues = [
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
]

const ExerciseTables: React.FC = () => {
  const [searchName, setSearchName] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const { user } = useContext(AuthContext)!
  const [sortDirection, setSortDirection] = useState<string>()

  const urlExercise =
    user?.authStatus === 'SUCCESS'
      ? API_URLS.GET_EXERCISES
      : API_URLS.GET_EXERCISES_GUEST

  const debouncedSearchName = useDebounce(searchName, 300)

  useEffect(() => {
    setPageIndex(1)
  }, [searchName])

  const exerciseTablePayload: ExercisePagePayload = {
    pageIndex: pageIndex - 1,
    pageSize: pageSize,
    searchName: debouncedSearchName,
  }

  const {
    data: exerciseTable,
    isFetching: isExerciseTableFetching,
    refetch,
  } = useCustomGetQuery<ExercisePagePayload, ExerciseTableResponse>(
    urlExercise,
    exerciseTablePayload
  )

  const updateExerciseColumnVisibility =
    useCustomPatchMutation<ExerciseColumnVisibilityPayload>(
      API_URLS.UPDATE_DISPLAY_EXERCISE_SETTING_BY_ID,
      user?.accountId,
      {
        onSuccess() {
          refetch()
        },
      }
    )

  const changeColumnVisibility = (event: any, column: any) => {
    const updatePayload = {
      [column.code]: event.currentTarget.checked,
    }
    updateExerciseColumnVisibility.mutateAsync(updatePayload)
  }

  // Sample total data count (replace with your data)
  const totalItems = exerciseTable?.data.result.totalRowCount as number
  const totalPages = Math.ceil(totalItems / pageSize) // Calculate total pages
  const startItemIndex = (pageIndex - 1) * pageSize + 1
  const endItemIndex = Math.min(pageIndex * pageSize, totalItems)

  // Handler to update page size
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setPageIndex(1) // Reset to page 1 when page size changes
  }

  return (
    <CommonTemplate>
      <Stack>
        <Title
          order={4}
          variant='gradient'
          gradient={{ from: 'teal', to: 'lime', deg: 15 }}
        >
          Exercise Table
        </Title>

        <Flex justify='space-between' align='center'>
          <Group>
            <Group align='center'>
              <Pagination
                total={totalPages} // Total number of pages
                value={pageIndex} // Current page index
                onChange={setPageIndex} // Handler for page change
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
              styles={(theme) => ({
                input: {
                  '&:focus-within': {
                    borderColor: theme.colors.teal[7],
                  },
                },
              })}
            />

            {user?.authStatus === 'SUCCESS' && (
              <Menu shadow='md' width={200}>
                <Menu.Target>
                  <Tooltip label='Show/Hide columns'>
                    <ActionIcon variant='transparent'>
                      <PiTextColumns size={24} />
                    </ActionIcon>
                  </Tooltip>
                </Menu.Target>
                <Menu.Dropdown>
                  {exerciseTable?.data.result.columns?.map(
                    (column: ExerciseColumnResponse, index) => {
                      return (
                        <Switch
                          label={column.name}
                          key={column.code}
                          checked={column.visible}
                          disabled={index === 0}
                          onChange={(event) =>
                            changeColumnVisibility(event, column)
                          }
                          color='teal'
                        />
                      )
                    }
                  )}
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          {user?.authStatus === 'SUCCESS' && (
            <Flex p='md' justify='space-between'>
              <Flex sx={{ gap: '8px' }}>
                <Button
                  variant='gradient'
                  gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  uppercase
                >
                  Create Custom Exercise
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>

        <ScrollArea h={550}>
          <LoadingOverlay visible={isExerciseTableFetching} />
          <Skeleton visible={isExerciseTableFetching}>
            <Table
              captionSide='top'
              fontSize='sm'
              highlightOnHover
              horizontalSpacing='xl'
              striped
              verticalSpacing='xs'
              withBorder
              withColumnBorders
              m='0'
            >
              <thead className={classes.header}>
                <tr>
                  {exerciseTable?.data.result.columns.map(
                    (column: ExerciseColumnResponse) =>
                      column.visible && (
                        <SortableTableHeader
                          key={column.code}
                          exerciseColumn={column}
                          onChange={setSortDirection}
                        />
                      )
                  )}
                </tr>
              </thead>

              <tbody>
                {exerciseTable?.data.result.rows.map(
                  (row: ExerciseRowResponse) => (
                    <tr key={row.id}>
                      {/* Map over columns again to display values for each row */}

                      {exerciseTable?.data.result.columns.map(
                        (column: ExerciseColumnResponse) =>
                          column.visible && (
                            <td key={column.code}>
                              {/* Check if the field is an array or a simple value */}

                              {Array.isArray(row[column.code]) ? (
                                <List>
                                  {(row[column.code] as string[]).map((key) => (
                                    <List.Item key={key as string}>
                                      <Highlight
                                        highlight={
                                          debouncedSearchName
                                            ? debouncedSearchName
                                            : ''
                                        }
                                        highlightStyles={(theme) => ({
                                          backgroundColor: theme.colors.teal[4],
                                        })}
                                      >
                                        {key}
                                      </Highlight>
                                    </List.Item>
                                  ))}
                                </List>
                              ) : (
                                <Highlight
                                  highlight={
                                    debouncedSearchName
                                      ? debouncedSearchName
                                      : ''
                                  }
                                  highlightStyles={(theme) => ({
                                    backgroundColor: theme.colors.teal[4],
                                  })}
                                >
                                  {(row[column.code] as string) ?? ''}
                                </Highlight>
                              )}
                            </td>
                          )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Skeleton>

          {/* <MRT_ToolbarAlertBanner stackAlertBanner table={table} /> */}
        </ScrollArea>
      </Stack>
    </CommonTemplate>
  )
}

export default ExerciseTables
