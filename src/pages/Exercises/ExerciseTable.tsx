import React, { useEffect, useMemo, useState } from 'react'
import { useGetPagingExercise } from '../../services/exercise-service'
import {
  IExerciseRowResponse,
  IExerciseTableResponse,
} from '../../types/ExerciseTableResponse'
import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  List,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import HeaderMenu from '../../common/HeaderMenu'
import { CommonNavBar } from '../../common/CommonNavBar'
import { IconRefresh } from '@tabler/icons-react'

const ExerciseTables: React.FC = () => {
  const [exercises, setExercises] = useState<IExerciseTableResponse>()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [searchName, setSearchName] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const [rowCount, setRowCount] = useState(0)
  const getPagingExercise = useGetPagingExercise()

  useEffect(() => {
    if (searchName) {
      pagination.pageIndex = 0
    }
    const dataToSend = {
      pageIndex: pagination.pageIndex, // Example pagination data
      pageSize: pagination.pageSize, // Example pagination data
      searchName: searchName,
    }
    setIsLoading(true)
    // Trigger the mutation on page load
    getPagingExercise.mutate(dataToSend, {
      onSuccess(data) {
        setIsLoading(false)
        setExercises(data.data.result)
        setRowCount(data.data.result.totalRowCount)
      },
    })
  }, [pagination, searchName])
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
    let result: MRT_ColumnDef<IExerciseRowResponse> = null
    if (column.type === 'multiSelect') {
      result = {
        accessorKey: column.code, //id is still required when using accessorFn instead of accessorKey
        header: column.name,
        accessorFn: (row: IExerciseRowResponse) => (
          <List>
            {(row[column.code] as string[])?.map((name, index) => (
              <List.Item key={index}>{name}</List.Item>
            ))}
          </List>
        ),
      }
    } else {
      result = {
        accessorKey: column.code,
        header: column.name,
      }
    }
    return result
  })

  const columns = useMemo<MRT_ColumnDef<IExerciseRowResponse>[]>(
    () => columnSetup || [],
    [exercises?.columns]
  )
  const table = useMantineReactTable({
    columns,
    data: exercises?.rows || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableColumnFilterModes: true,
    // columnFilterModeOptions: ['contains', 'startsWith', 'endsWith'],
    onGlobalFilterChange: setSearchName,
    onPaginationChange: setPagination,
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
    },
    // initialState={ columnPinning: { left: ['state'], right: ['city'] } },
    positionPagination: 'top',
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    rowCount: rowCount,
    enableStickyHeader: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    enableBottomToolbar: false,
    editDisplayMode: 'row',
    mantineTableProps: {
      withColumnBorders: true,
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button>Create New User</Button>
      </Box>
    ),
    // renderTopToolbarCustomActions: () => (
    //   <Tooltip label='Refresh Data'>
    //     <ActionIcon onClick={() => refetch()}>
    //       <IconRefresh />
    //     </ActionIcon>
    //   </Tooltip>
    // ),
    // paginationDisplayMode: 'pages',
    state: {
      isLoading,
      pagination,
      globalFilter: searchName,
      // showAlertBanner: isError,
      // showLoadingOverlay: isLoading, //fetching next page pagination
      // showSkeletons: isLoading, //loading for the first time with no data
      showProgressBars: getPagingExercise.isPending,
    },
  })

  return (
    <AppShell
      padding='xl'
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
      {/* <Center>
        <Table highlightOnHover withColumnBorders>
          <ExerciseColumn columns={exercises?.columns} />
          <ExerciseRow
            columns={exercises?.columns}
            rows={exercises?.rows}
          ></ExerciseRow>
        </Table>
      </Center> */}
      <MantineReactTable table={table} />
    </AppShell>
  )
}

export default ExerciseTables
