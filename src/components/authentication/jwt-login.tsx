import type { FC } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, FormHelperText, Grid, Typography } from '@mui/material';
import { InputField } from '../input-field';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

export const JWTLogin: FC = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await login(values.email, values.password);

        if (isMounted()) {
          const returnUrl = (router.query.returnUrl as string | undefined) || '/dashboard';
          router.push(returnUrl).catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mb: 3
        }}
      >
        <Typography
          color="textPrimary"
          variant="h4"
        >
          Login
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <NextLink
          href="/authentication/register"
          passHref
        >
          <Button
            color="primary"
            component="a"
            variant="text"
          >
            Sign Up
          </Button>
        </NextLink>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <InputField
            autoFocus
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <InputField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
        </Grid>
        {formik.errors.submit && (
          <Grid
            item
            xs={12}
          >
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Grid>
        )}
        <Grid
          item
          xs={12}
        >
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <NextLink
            href="/authentication/password-recovery"
            passHref
          >
            <Button
              color="primary"
              component="a"
              variant="text"
            >
              Forgot password
            </Button>
          </NextLink>
        </Grid>
      </Grid>
      <Alert
        severity="info"
        sx={{ mt: 3 }}
      >
        You can use
        &nbsp;
        <strong>demo@devias.io</strong>
        &nbsp;
        and password
        &nbsp;
        <strong>Password123!</strong>
      </Alert>
    </form>
  );
};
