import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { register } from '../../services/auth-service'
import {
  Anchor,
  Box,
  Button,
  Container,
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
import { DateInput } from '@mantine/dates'
import { RegisterRequest } from '../../types/RegisterType'

type Props = {}

const Register: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate()

  const theme = useMantineTheme()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
    confirmedPassword: Yup.string().required('This field is required!'),
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required!'),
    firstName: Yup.string().required('This field is required!'),
    middleName: Yup.string().required('This field is required!'),
    lastName: Yup.string().required('This field is required!'),
    phoneNumber: Yup.string()
      .required('This field is required!')
      .matches(phoneRegExp, 'Invalid phone number')
      .max(10, 'There are more than 10 digits'),
    birthdate: Yup.string().required('This field is required!'),
  })

  const init: RegisterRequest = {
    accountName: '',
    password: '',
    confirmedPassword: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    birthDate: '',
  }
  const form = useForm({
    validateInputOnChange: true,
    initialValues: init,
    validate: yupResolver(validationSchema),
  })

  const handleLogin = (values: RegisterRequest) => {
    register(values).then(
      () => {
        navigate('/exercises', { state: { showSuccessNotification: true } })
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

  const navigateToSignInPage = () => {
    navigate('/login')
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
                Register
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
              <PasswordInput
                label='Confirm Password'
                mt={theme.spacing.md}
                withAsterisk
                placeholder='Enter your password'
                {...form.getInputProps('confirmedPassword')}
                required
              />
              <TextInput
                withAsterisk
                label='Email'
                mt={theme.spacing.md}
                placeholder='Enter your email'
                {...form.getInputProps('email')}
                required
              />
              <TextInput
                withAsterisk
                label='First name'
                mt={theme.spacing.md}
                placeholder='Enter your first name'
                {...form.getInputProps('firstName')}
                required
              />
              <TextInput
                label='Middle name'
                mt={theme.spacing.md}
                placeholder='Enter your middle name'
                {...form.getInputProps('middleName')}
              />
              <TextInput
                withAsterisk
                label='Last name'
                mt={theme.spacing.md}
                placeholder='Enter your last name'
                {...form.getInputProps('lastName')}
                required
              />
              <TextInput
                withAsterisk
                label='Phone Number'
                mt={theme.spacing.md}
                placeholder='Enter your phone number'
                {...form.getInputProps('phoneNumber')}
                required
              />
              <DateInput
                valueFormat='YYYY MMMM DD'
                label='Birth date'
                placeholder='Enter your birth date'
                maw={400}
                mt={theme.spacing.md}
                withAsterisk
                required
                {...form.getInputProps('birthdate')}
                clearable
              />
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
                Already have an account ?{' '}
                <Anchor<'a'>
                  href='#'
                  size={theme.fontSizes.sm}
                  onClick={navigateToSignInPage}
                >
                  Sign in
                </Anchor>
              </Text>
            </form>
          </Box>
        </Paper>
      </Container>
    </CommonTemplate>
  )
}

export default Register
