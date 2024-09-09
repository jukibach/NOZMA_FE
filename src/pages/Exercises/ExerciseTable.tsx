import React, { useState } from 'react'
import {
  ExerciseColumnResponse,
  ExercisePagePayload,
  ExerciseRowResponse,
  ExerciseTableResponse,
} from '../../interfaces/ExerciseTableResponse'
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  Highlight,
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
import {
  MRT_GlobalFilterTextInput,
  MRT_ToolbarAlertBanner,
  useMantineReactTable,
} from 'mantine-react-table'
import CommonTemplate from '../../common/CommonTemplate'
import { LocalDataClass } from '../../data-class/LocalDataClass'
import { useCustomGetQuery } from '@query/useCustomQuery'
import { API_URLS } from '@constants/API_URLS'
import { useCustomPatchMutation } from '@query/useCustomMutation'
import { ExerciseColumnVisibilityPayload } from '@interfaces/ExerciseColumnVisibility'
import { PiTextColumns } from 'react-icons/pi'
import classes from './ExerciseTable.module.css'

import cx from 'clsx'
const ExerciseTables: React.FC = () => {
  const [searchName, setSearchName] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const currentUser = LocalDataClass.user

  const urlExercise =
    currentUser?.authStatus === 'SUCCESS'
      ? API_URLS.GET_EXERCISES
      : API_URLS.GET_EXERCISES_GUEST

  const {
    data: exerciseTable,
    isFetching: isExerciseTableFetching,
    refetch,
  } = useCustomGetQuery<ExercisePagePayload, ExerciseTableResponse>(
    urlExercise,
    {
      pageIndex: pageIndex - 1,
      pageSize: pageSize,
      searchName: searchName,
    }
  )

  const table = useMantineReactTable({
    columns: [],
    data: exerciseTable?.data.result.rows || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    onGlobalFilterChange: setSearchName,
    manualFiltering: true,
    manualSorting: true,
    initialState: {
      showGlobalFilter: true,
    },
    enableGlobalFilter: true,
    mantineTableProps: {
      withColumnBorders: true,
    },
    state: {
      globalFilter: searchName,
    },
  })

  const updateExerciseColumnVisibility =
    useCustomPatchMutation<ExerciseColumnVisibilityPayload>(
      API_URLS.UPDATE_DISPLAY_EXERCISE_SETTING_BY_ID,
      LocalDataClass.user.accountId,
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

  const [scrolled, setScrolled] = useState(false)

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

  const paginationValues = [
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ]

  return (
    <CommonTemplate>
      {/* <MantineReactTable table={table} /> */}
      <Stack>
        <Divider />
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

            <MRT_GlobalFilterTextInput table={table} />

            {currentUser.authStatus === 'SUCCESS' && (
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
                        />
                      )
                    }
                  )}
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          {currentUser?.authStatus === 'SUCCESS' && (
            <Flex p='md' justify='space-between'>
              <Flex sx={{ gap: '8px' }}>
                <Button
                  variant='gradient'
                  gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  uppercase
                >
                  Create New User
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>

        <ScrollArea
          h={550}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          {/* Using Vanilla Mantine Table component here */}
          <LoadingOverlay visible={isExerciseTableFetching} />
          <Skeleton visible={isExerciseTableFetching}>
            <Table
              captionSide='top'
              fontSize='md'
              highlightOnHover
              horizontalSpacing='xl'
              striped
              verticalSpacing='xs'
              withBorder
              withColumnBorders
              m='0'
            >
              {/* Use your own markup, customize however you want using the power of TanStack Table */}
              <thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <tr>
                  {exerciseTable?.data.result.columns.map(
                    (column: ExerciseColumnResponse) =>
                      column.visible && (
                        <th style={{ color: 'black' }} key={column.code}>
                          {column.name}
                        </th>
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
                            <td key={column.id}>
                              {/* Check if the field is an array or a simple value */}
                              {Array.isArray(row[column.code]) ? (
                                <List>
                                  {(row[column.code] as string[]).map((key) => (
                                    <List.Item key={key as string}>
                                      <Highlight
                                        highlight={searchName ? searchName : ''}
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
                                  highlight={searchName ? searchName : ''}
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

          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </ScrollArea>
      </Stack>
    </CommonTemplate>
  )
}

export default ExerciseTables
