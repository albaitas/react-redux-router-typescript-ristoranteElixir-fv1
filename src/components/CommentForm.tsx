import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextError from './FormikTextError';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { postComment } from '../actions';
import { ICommentForm } from '../actions/types';

interface CommentFormProps {
  dishId: number;
}

function CommentForm({ dishId }: CommentFormProps) {
  const dispatch = useDispatch();

  const [state, setState] = useState({ isModalOpen: false });

  const initialValues: ICommentForm = {
    dishId: 0,
    rating: '',
    author: '',
    comment: ''
  };

  const validationSchema = Yup.object({
    rating: Yup.string().required('Required'),
    author: Yup.string().min(2, 'Too Short!').max(12, 'Too Long!').required('Required'),
    comment: Yup.string().min(3, 'Too Short!').required('Required')
  });

  const toggleModal = () => {
    setState({
      isModalOpen: !state.isModalOpen
    });
  };

  const handleSubmit = (values: ICommentForm, formikHelpers: FormikHelpers<ICommentForm>) => {
    toggleModal();
    dispatch(postComment({ dishId: dishId, rating: values.rating, author: values.author, comment: values.comment }));
    formikHelpers.resetForm();
  };

  return (
    <>
      <Modal isOpen={state.isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => {
              return (
                <Form>
                  <div>
                    <label htmlFor='rating'>Rating</label>
                    <Field name='rating' as='select' className='forma'>
                      <option value=''>- select -</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </Field>
                    <ErrorMessage name='rating' component={FormikTextError} />
                  </div>

                  <div>
                    <label htmlFor='author'>Author</label>
                    <Field type='text' id='author' name='author' placeholder='author' />
                    <ErrorMessage name='author' component={FormikTextError} />
                  </div>

                  <div>
                    <label htmlFor='comment'>Comment</label>
                  </div>
                  <div>
                    <Field as='textarea' id='message' name='comment' placeholder='comment' />
                    <ErrorMessage name='comment' component={FormikTextError} />
                  </div>

                  <Button type='submit' color='primary' disabled={!formik.isValid || formik.isSubmitting}>
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
      <Button outline onClick={toggleModal}>
        <span className='fa fa-pencil fa-lg'></span> Add Comment
      </Button>
    </>
  );
}

export default CommentForm;
