import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormHelperText,
  Grid,
  MenuItem,
  Typography
} from '@mui/material';
import { gtm } from 'src/lib/gtm';
import { AuthGuard } from 'src/components/authentication/auth-guard';
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout';
import { OrganizationLayout } from 'src/components/dashboard/organization/organization-layout';
import { InputField } from 'src/components/input-field';

const companySizeOptions = ['1', '2-10', '11-30', '31-50', '50+'];

const FormsGeneral: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      companyName: 'ACME Corp LLC.',
      companySize: '2-10',
      submit: null
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().max(255).required('OrganizationLayout name is required'),
      companySize: Yup
        .string()
        .max(255)
        .oneOf(companySizeOptions)
        .required('Size is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Settings saved');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          User: General | Carpatin Dashboard
        </title>
      </Head>
      <div>
        <Card>
          <CardContent>
            <div>Forms Content</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

FormsGeneral.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Forms
            </Typography>
          </Box>
        </Box>
        {page}
      </Container>
    </Box>
    </DashboardLayout>
  </AuthGuard>
);

export default FormsGeneral;