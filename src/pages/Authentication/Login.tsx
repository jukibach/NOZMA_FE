import React, { useContext } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import CommonTemplate from '@common/CommonTemplate'
import { LoginRequest, LoginResponse } from '@interfaces/Authentication'
import { NotificationContext } from '@contexts/NotificationContext'
import { API_URLS } from '@constants/API_URLS'
import { LocalAccount, LocalDataClass } from '@data-class/LocalDataClass'
import { useCustomPostMutation } from '@query/useCustomMutation'

type Props = {}

const Login: React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate()
  const { addMessage } = useContext(NotificationContext)!
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
    } as LoginRequest,
    validate: yupResolver(validationSchema),
  })

  const loginMutation = useCustomPostMutation<LoginRequest, LoginResponse>(
    API_URLS.ACCOUNT_LOGIN,
    {
      isAlert: true,
      onSuccess(result) {
        if (result?.data.status === 'OK') {
          LocalDataClass.user = {
            ...(result.data.result as LocalAccount),
            authStatus: 'SUCCESS',
          }
          navigate('/', {
            replace: true,
          })
          addMessage('Successful', result.data.message)
        }
      },
    }
  )

  const handleLogin = ({ ...formValue }: LoginRequest) => {
    loginMutation.mutateAsync(formValue)
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
                variant='gradient'
              >
                Sign in
              </Title>
              <TextInput
                withAsterisk
                label='Account name'
                placeholder='Enter your account name'
                {...form.getInputProps('accountName')}
              />
              <PasswordInput
                label='Password'
                mt={theme.spacing.md}
                withAsterisk
                placeholder='Enter your password'
                {...form.getInputProps('password')}
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
                variant='gradient'
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
