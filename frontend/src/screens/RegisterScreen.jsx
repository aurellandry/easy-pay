import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Les mots de passes ne sont pas identiques.')
    } else {
      try {
        const response = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...response }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Inscription</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nom'
            value={name}
            onChange={ (e) => setName(e.target.value) }
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Email'
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Mot de passe'
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirmer le mot de passe'
            value={confirmPassword}
            onChange={ (e) => setConfirmPassword(e.target.value) }
          ></Form.Control>
        </Form.Group>

        { isLoading && <Loader /> }

        <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
          Inscription
        </Button>

        <Row className='py-3'>
          <Col>
            Déjà inscrit ? <Link to='/login'>Connectez-vous</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen