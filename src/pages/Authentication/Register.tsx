import React, { useContext } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import CommonTemplate from '../../common/CommonTemplate'
import { DateInput } from '@mantine/dates'
import {
  RegisterRequest,
  RegisterResponse,
} from '../../interfaces/RegisterType'
import dayjs from 'dayjs'
import { LocalAccount, LocalDataClass } from '../../data-class/LocalDataClass'
import { NotificationContext } from '../../contexts/NotificationContext'
import { useCustomPostMutation } from '@query/useCustomMutation'
import { API_URLS } from '@constants/API_URLS'
type Props = {}

const Register: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate()
  const { addMessage } = useContext(NotificationContext)!
  const theme = useMantineTheme()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const parseDateString = (originalValue: any) => {
    return dayjs(originalValue).format('DD/MM/YYYY')
  }

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
      .max(11, 'There are more than 10 digits')
      .min(10, 'There are more than 10 digits'),
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
    birthdate: '',
  }
  const form = useForm({
    validateInputOnChange: true,
    initialValues: init,
    validate: yupResolver(validationSchema),
    transformValues: (values) => ({
      ...values,
      birthdate: parseDateString(values.birthdate),
    }),
  })

  const registerMutation = useCustomPostMutation<
    RegisterRequest,
    RegisterResponse
  >(API_URLS.ACCOUNT_USER_REGISTER, {
    onSuccess(result) {
      navigate('/login', {
        replace: true,
        state: {},
      })
      addMessage('Successful', result.data.message)
    },
  })

  const handleRegister = ({ ...values }: RegisterRequest) => {
    registerMutation.mutateAsync(values).then((result) => {
      LocalDataClass.user = {
        ...(result.data.result as LocalAccount),
        authStatus: 'SUCCESS',
      }
    })
  }

  return (
    <CommonTemplate>
      <Container size={500}>
        <Paper withBorder shadow='md' p={30} mt={50} radius={10}>
          <Box maw={340} mx='auto'>
            <form onSubmit={form.onSubmit(handleRegister)}>
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
                valueFormat='DD/MM/YYYY'
                label='Birth date (DD/MM/YYYY)'
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
                  onClick={() => navigate('/login')}
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
