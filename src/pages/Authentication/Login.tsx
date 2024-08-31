import React, { useEffect, useMemo, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from '../../services/auth-service'
import { REACT_APP_BE_BASE_URL } from '../../constants/constant'
import { AppShell, useMantineTheme } from '@mantine/core'
import {
  MantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table'
import { IExerciseRowResponse } from '../../types/ExerciseTableResponse'

type Props = {}

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const theme = useMantineTheme()

  const initialValues: {
    accountName: string
    password: string
  } = {
    accountName: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  })

  const handleLogin = (formValue: {
    accountName: string
    password: string
  }) => {
    const { accountName, password } = formValue

    setMessage('')
    setLoading(true)

    login(accountName, password).then(
      () => {
        console.log(REACT_APP_BE_BASE_URL)

        navigate('/exercises')
        window.location.reload()
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      }
    )
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      // navbar={<NavbarSimpleColored />}
    >
      <div className='col-md-12'>
        <div className='card card-container'>
          <img
            src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
            alt='profile-img'
            className='profile-img-card'
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className='form-group'>
                <label htmlFor='accountName'>Account Name</label>
                <Field
                  name='accountName'
                  type='text'
                  className='form-control'
                />
                <ErrorMessage
                  name='accountName'
                  component='div'
                  className='alert alert-danger'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <Field
                  name='password'
                  type='password'
                  className='form-control'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='alert alert-danger'
                />
              </div>

              <div className='form-group'>
                <button
                  type='submit'
                  className='btn btn-primary btn-block'
                  disabled={loading}
                >
                  {loading && (
                    <span className='spinner-border spinner-border-sm'></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className='form-group'>
                  <div className='alert alert-danger' role='alert'>
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </AppShell>
  )
}

export default Login
function useMantineReactTable(arg0: {}) {
  throw new Error('Function not implemented.')
}
