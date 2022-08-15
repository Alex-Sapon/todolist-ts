import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {login} from '../../store/reducers/auth-reducer';
import {Navigate} from 'react-router';
import {selectIsLoggedIn} from '../../store/selectors/select-isLoggedIn';
import {LoginParamsType} from '../../api/todolist-api';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 2) {
                errors.password = 'Password should be more than 2 symbols';
            }

            return errors;
        },
        onSubmit: async (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
            const action = await dispatch(login(values));

            if (login.rejected.match(action)) {
                if (action.payload?.errors.length) {
                    const error = action.payload.errors;

                    formikHelpers.setFieldError('email', error[0]);
                }
            } else {
                formik.resetForm({values: {email: values.email, password: '', rememberMe: false}});
            }
        },
    });

    if (isLoggedIn) return <Navigate to="/"/>

    return (
        <Grid container justifyContent="center">
            <Grid item justifyContent="center">
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                {`To log in get registered `}
                                <b><a href="https://social-network.samuraijs.com/" target="_blank" rel="noreferrer">here</a></b>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                error={formik.touched.email && !!formik.errors.email}
                                helperText={formik.touched.email && !!formik.errors.email && formik.errors.email}
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            <TextField
                                error={formik.touched.password && !!formik.errors.password}
                                helperText={formik.touched.password && !!formik.errors.password && formik.errors.password}
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            <FormControlLabel
                                label="Remember me"
                                control={<Checkbox{...formik.getFieldProps('rememberMe')}/>}
                            />
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}