import React, { useEffect, useMemo, useState } from 'react'
import {
  IExercisePagePayload,
  getPagingExercise,
} from '../../services/exercise-service'
import {
  IExerciseRowResponse,
  IExerciseTableResponse,
} from '../../types/ExerciseTableResponse'
import {
  Anchor,
  AppShell,
  Burger,
  Header,
  List,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import HeaderMenu from '../../common/HeaderMenu'
import { CommonNavBar } from '../../common/CommonNavBar'

const ExerciseTables: React.FC = () => {
  const [exercises, setExercises] = useState<IExerciseTableResponse>()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    const pagePayload: IExercisePagePayload = {
      pageSize: 20,
      pageIndex: 0,
    }
    getPagingExercise(pagePayload).then((response) => {
      setExercises(response.data.result)
    })
  }, [])

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
    if (column.type === 'multiSelect') {
      return {
        id: column.code, //id is still required when using accessorFn instead of accessorKey
        header: column.name,
        size: 200,
        accessorFn: (row: IExerciseRowResponse) => (
          <List>
            {(row[column.code] as string[])?.map((name, index) => (
              <List.Item key={index}>{name}</List.Item>
            ))}
          </List>
        ),
      }
    }
    return {
      accessorKey: column.code,
      header: column.name,
    }
  })

  const columns = useMemo<MRT_ColumnDef<IExerciseRowResponse>[]>(
    () => columnSetup || [],
    [exercises?.columns]
  )
  const table = useMantineReactTable({
    columns,
    data: exercises?.rows || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
