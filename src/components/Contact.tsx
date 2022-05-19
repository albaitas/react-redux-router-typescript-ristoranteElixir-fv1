import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextError from './FormikTextError';
import { useDispatch } from 'react-redux';
import { postFeedback } from '../actions';
import { IFeedbackForm } from '../actions/types';
import { useFadeIn } from '../spring/animations';

function Contact() {
  const dispatch = useDispatch();

  const initialValues: IFeedbackForm = {
    firstName: '',
    lastName: '',
    telNumber: 0,
    email: '',
    agree: false,
    contactType: '',
    message: '',
    date: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, 'Too Short!').max(12, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(12, 'Too Long!').required('Required'),
    telNumber: Yup.string().min(2, 'Too Short!').max(12, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    message: Yup.string().min(3, 'Too Short!').max(150, 'Too Long!').required('Required')
  });

  const handleSubmit = (values: IFeedbackForm, formikHelpers: FormikHelpers<IFeedbackForm>) => {
    dispatch(
      postFeedback({
        firstName: values.firstName,
        lastName: values.lastName,
        telNumber: values.telNumber,
        email: values.email,
        agree: values.agree,
        contactType: values.contactType,
        message: values.message,
        date: values.date
      })
    );
    formikHelpers.resetForm();
  };

  const { animated, spring } = useFadeIn();

  return (
    <animated.div style={spring}>
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>

        <div className='row row-content'>
          <div className='col-12'>
            <h4>Location Information</h4>
          </div>
          <div className='col-12 col-sm-4 offset-sm-1'>
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className='fa fa-phone'></i>: +852 1234 5678
              <br />
              <i className='fa fa-fax'></i>: +852 8765 4321
              <br />
              <i className='fa fa-envelope'></i>: <a href='mailto:confusion@food.net'>confusion@food.net</a>
            </address>
          </div>
          <div className='col-12 col-sm-6 offset-sm-1'>
            <h5>Map of our Location</h5>
          </div>
          <div className='col-12 col-sm-11 offset-sm-1'>
            <div className='btn-group' role='group'>
              <a role='button' className='btn btn-primary' href='tel:+85212345678'>
                <i className='fa fa-phone'></i> Call
              </a>
              <a role='button' className='btn btn-info' href='skype:MySkypeName?call'>
                <i className='fa fa-skype'></i> Skype
              </a>
              <a role='button' className='btn btn-success' href='mailto:confusion@food.net'>
                <i className='fa fa-envelope-o'></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className='row row-content'>
          <div className='col-12'>
            <h4>Send us your feedback</h4>
          </div>
          <div className='col-12 col-md-9'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {(formik) => {
                return (
                  <Form>
                    <div>
                      <label htmlFor='firstName'>First Name</label>
                      <Field type='text' id='firstName' name='firstName' placeholder='first name' />
                      <ErrorMessage name='firstName' component={FormikTextError} />
                    </div>

                    <div>
                      <label htmlFor='lastName'>Last Name</label>
                      <Field type='text' id='lastName' name='lastName' placeholder='last name' />
                      <ErrorMessage name='lastName' component={FormikTextError} />
                    </div>

                    <div>
                      <label htmlFor='telNumber'>Telefon Nr.</label>
                      <Field type='number' id='telNumber' name='telNumber' placeholder='telefon Nr.' />
                      <ErrorMessage name='telNumber' component={FormikTextError} />
                    </div>

                    <div>
                      <label htmlFor='email'>Email</label>
                      <Field type='email' id='email' name='email' placeholder='email' />
                      <ErrorMessage name='email' component={FormikTextError} />
                    </div>

                    <div>
                      <label htmlFor='agree'>May we contact you?</label>
                      <Field type='checkbox' id='agree' name='agree' />
                      <ErrorMessage name='agree' component={FormikTextError} />
                    </div>

                    <div>
                      <label htmlFor='contactType'>Contact Type</label>
                      <Field name='contactType' as='select' className='forma'>
                        <option value=''>- select -</option>
                        <option value='Telefon'>Telefon</option>
                        <option value='Email'>Email</option>
                      </Field>
                      <ErrorMessage name='contactType' component={FormikTextError} />
                    </div>

                    <div>
                      <label htmlFor='feedback'>Feedback</label>
                    </div>
                    <div>
                      <Field component='textarea' id='message' name='message' placeholder='feedback' rows='3' />
                      <ErrorMessage name='message' component={FormikTextError} />
                    </div>

                    <Button type='submit' color='primary' disabled={!formik.isValid || formik.isSubmitting}>
                      Send Feedback
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Contact;
