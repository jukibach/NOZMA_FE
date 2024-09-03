import React, { useEffect, useMemo, useState } from 'react'
import {
  useGetPagingExercise,
  useGetPagingExerciseForGuest,
} from '../../services/exercise-service'
import {
  IExercisePagePayload,
  IExerciseRowResponse,
  IExerciseTableResponse,
} from '../../types/ExerciseTableResponse'
import { Button, Flex, List, useMantineTheme } from '@mantine/core'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import ILoginResponse from '../../types/LoginResponse'
import { getCurrentUser } from '../../services/auth-service'
import { useLocation, useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import CommonTemplate from '../../common/CommonTemplate'
import { useAuth } from '../../contexts/AuthContext'

const ExerciseTables: React.FC = () => {
  const [exercises, setExercises] = useState<IExerciseTableResponse>()
  const theme = useMantineTheme()
  const [searchName, setSearchName] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [rowCount, setRowCount] = useState(0)
  const getPagingExercise = useGetPagingExercise()
  const getPagingExerciseForGuest = useGetPagingExerciseForGuest()
  const location = useLocation()
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const userStr = getCurrentUser()

  useEffect(() => {
    if (searchName) {
      pagination.pageIndex = 0
    }
    const dataToSend: IExercisePagePayload = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      searchName: searchName,
    }
    setIsLoading(true)

    if (userStr) {
      // Trigger the mutation on page load
      getPagingExercise.mutate(dataToSend, {
        onSuccess(data) {
          setIsLoading(false)
          setExercises(data.data.result)
          setRowCount(data.data.result.totalRowCount)
        },
      })
    } else {
      getPagingExerciseForGuest.mutate(dataToSend, {
        onSuccess(data) {
          setIsLoading(false)
          setExercises(data.data.result)
          setRowCount(data.data.result.totalRowCount)
        },
      })
    }
  }, [pagination, searchName])

  //Display successful notification after a successful login
  useEffect(() => {
    if (location?.state?.showSuccessNotification) {
      notifications.show({
        title: 'Successful',
        message: 'Login success',
        color: 'green',
        radius: theme.radius.md,
        styles: (theme) => ({
          root: {
            fontWeight: 600,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          },
          title: {
            color: theme.colors.green[6],
            fontWeight: 600,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          },
        }),
        sx: { backgroundColor: theme.black, color: 'green' },
      })
      navigate('.', { replace: true, state: {} })
    }
  }, [location.state, navigate])
  // const table = useMantineReactTable({
  //   columns,
  //   data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  //   enableColumnFilterModes: true,
  //   enableColumnOrdering: true,
  //   enableFacetedValues: true,
  //   enableGrouping: true,
  //   enablePinning: true,
  //   enableRowActions: true,
  //   enableRowSelection: true,
  //   initialState: { showColumnFilters: true, showGlobalFilter: true },
  //   paginationDisplayMode: 'pages',
  //   positionToolbarAlertBanner: 'bottom',
  //   mantinePaginationProps: {
  //     radius: 'xl',
  //     size: 'lg',
  //   },
  //   mantineSearchTextInputProps: {
  //     placeholder: 'Search Employees',
  //   },
  //   renderDetailPanel: ({ row }) => (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'flex-start',
  //         alignItems: 'center',
  //         gap: '16px',
  //         padding: '16px',
  //       }}
  //     >
  //       <img
  //         alt='avatar'
  //         height={200}
  //         src={row.original.avatar}
  //         style={{ borderRadius: '50%' }}
  //       />
  //       <Box sx={{ textAlign: 'center' }}>
  //         <Title>Signature Catch Phrase:</Title>
  //         <Text>&quot;{row.original.signatureCatchPhrase}&quot;</Text>
  //       </Box>
  //     </Box>
  //   ),
  //   renderRowActionMenuItems: () => (
  //     <>
  //       <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
  //       <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
  //     </>
  //   ),
  //   renderTopToolbar: ({ table }) => {
  //     const handleDeactivate = () => {
  //       table.getSelectedRowModel().flatRows.map((row) => {
  //         alert('deactivating ' + row.getValue('name'))
  //       })
  //     }

  //     const handleActivate = () => {
  //       table.getSelectedRowModel().flatRows.map((row) => {
  //         alert('activating ' + row.getValue('name'))
  //       })
  //     }

  //     const handleContact = () => {
  //       table.getSelectedRowModel().flatRows.map((row) => {
  //         alert('contact ' + row.getValue('name'))
  //       })
  //     }

  //     return (
  //       <Flex p='md' justify='space-between'>
  //         <Flex gap='xs'>
  //           {/* import MRT sub-components */}
  //           <MRT_GlobalFilterTextInput table={table} />
  //           <MRT_ToggleFiltersButton table={table} />
  //         </Flex>
  //         <Flex sx={{ gap: '8px' }}>
  //           <Button
  //             color='red'
  //             disabled={!table.getIsSomeRowsSelected()}
  //             onClick={handleDeactivate}
  //             variant='filled'
  //           >
  //             Deactivate
  //           </Button>
  //           <Button
  //             color='green'
  //             disabled={!table.getIsSomeRowsSelected()}
  //             onClick={handleActivate}
  //             variant='filled'
  //           >
  //             Activate
  //           </Button>
  //           <Button
  //             color='blue'
  //             disabled={!table.getIsSomeRowsSelected()}
  //             onClick={handleContact}
  //             variant='filled'
  //           >
  //             Contact
  //           </Button>
  //         </Flex>
  //       </Flex>
  //     )
  //   },
  // })

  const columnSetup = exercises?.columns.map((column) => {
    let result: MRT_ColumnDef<IExerciseRowResponse> = {
      accessorKey: column.code,
      header: column.name,
    }
    if (column.type === 'multiSelect') {
      result = {
        ...result,
        accessorFn: (row: IExerciseRowResponse) => (
          <List>
            {(row[column.code] as string[])?.map((name, index) => (
              <List.Item key={index}>{name}</List.Item>
            ))}
          </List>
        ),
      }
    }
    return result
  })

  const renderTopToolbarCustomAction = userStr
    ? ({}) => (
        <Flex p='md' justify='space-between'>
          <Flex sx={{ gap: '8px' }}>
            <Button variant='filled' color='green'>
              Create New User
            </Button>
          </Flex>
        </Flex>
      )
    : undefined

  const columns = useMemo<MRT_ColumnDef<IExerciseRowResponse>[]>(
    () => columnSetup || [],
    [exercises?.columns]
  )
  const table = useMantineReactTable({
    columns,
    data: exercises?.rows ?? [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableColumnFilterModes: true,
    // columnFilterModeOptions: ['contains', 'startsWith', 'endsWith'],
    onGlobalFilterChange: setSearchName,
    onPaginationChange: setPagination,
    mantineTableContainerProps: { sx: { maxHeight: '650px' } },
    defaultColumn: {
      maxSize: 400,
      size: 220, //default size is usually 180
      mantineTableBodyCellProps: {
        align: 'center',
      },
      mantineTableHeadCellProps: {
        align: 'center',
      },
    },
    // autoResetPageIndex: areRowsChanged,
    initialState: {
      columnPinning: {
        // left: ['name'],
        left: ['name'],
      },
      isLoading: isLoading,
    },
    // positionPagination: 'top',
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    rowCount: rowCount,
    enableStickyHeader: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    // enableBottomToolbar: false,
    editDisplayMode: 'row',
    mantineTableProps: {
      withColumnBorders: true,
    },
    renderTopToolbarCustomActions: renderTopToolbarCustomAction,
    state: {
      isLoading: isLoading,
      pagination,
      globalFilter: searchName,
      // showAlertBanner: isError,
      showLoadingOverlay: isLoading, //fetching next page pagination
      showSkeletons: isLoading, //loading for the first time with no data
      showProgressBars: isLoading,
    },
    mantineProgressProps: ({ isTopToolbar }) => ({
      color: 'orange',
      variant: 'determinate', //if you want to show exact progress value
      style: {
        display: isTopToolbar ? 'block' : 'none', //hide bottom progress bar
      },
    }),
  })

  return (
    <CommonTemplate>
      <MantineReactTable table={table} />
    </CommonTemplate>
  )
}

export default ExerciseTables
