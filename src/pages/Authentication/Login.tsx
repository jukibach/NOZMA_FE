import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  MantineTheme,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import CommonTemplate from '../../common/CommonTemplate'
import { login } from '../../services/auth-service'
import { ApiResponse } from '../../types/ExerciseTableResponse'
import ILoginResponse from '../../types/LoginResponse'

type Props = {}

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate()
  const theme = useMantineTheme()

  const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  })

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      accountName: '',
      password: '',
    },
    validate: yupResolver(validationSchema),
  })

  const handleLogin = (formValue: {
    accountName: string
    password: string
  }) => {
    const { accountName, password } = formValue

    login(accountName, password).then(
      (res: ApiResponse<ILoginResponse>) => {
        if (res) {
          navigate('/exercises', { state: { showSuccessNotification: true } })
        }
      },
      (error) => {
        handleErrorMessage(error, theme)
      }
    )
  }
  const handleErrorMessage = (error: any, theme: MantineTheme) => {
    const resMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    notifications.show({
      title: error.response.data.status === 'BAD_REQUEST' ? 'Bad request' : '',
      message: resMessage,
      color: 'red',
      autoClose: 2500,
      radius: theme.radius.md,
      styles: (theme) => ({
        root: {
          fontWeight: 600,
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },
        title: {
          color: theme.colors.red[6],
          fontWeight: 600,
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },
      }),
      sx: { backgroundColor: theme.black, color: 'red' },
    })
  }
  const navigateToRegisterPage = () => {
    navigate('/register')
  }

  return (
    <CommonTemplate>
      <Container size={500}>
        <Paper withBorder shadow='md' p={30} mt={50} radius={10}>
          <Box maw={340} mx='auto'>
            <form onSubmit={form.onSubmit(handleLogin)}>
              <Title
                align='center'
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900,
                })}
              >
                Sign in
              </Title>
              <TextInput
                withAsterisk
                label='Account name'
                placeholder='Enter your account name'
                {...form.getInputProps('accountName')}
                required
              />
              <PasswordInput
                label='Password'
                mt={theme.spacing.md}
                withAsterisk
                placeholder='Enter your password'
                {...form.getInputProps('password')}
                required
              />
              <Group mt={theme.spacing.md}>
                <Anchor<'a'>
                  onClick={(event) => event.preventDefault()}
                  href='#'
                  size={theme.fontSizes.sm}
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button
                type='submit'
                mt={theme.spacing.md}
                fullWidth
                mb={theme.spacing.sm}
              >
                Submit
              </Button>
              <Text
                size={theme.fontSizes.md}
                align='center'
                mt={5}
                color='dimmed'
              >
                Do not have an account yet?{' '}
                <Anchor<'a'>
                  href='#'
                  size={theme.fontSizes.sm}
                  onClick={navigateToRegisterPage}
                >
                  Create account
                </Anchor>
              </Text>
            </form>
          </Box>
        </Paper>
      </Container>
    </CommonTemplate>
  )
}

export default Login
