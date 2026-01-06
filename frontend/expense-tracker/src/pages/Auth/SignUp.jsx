import React from 'react'
import AuthLayout from '../../components/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  return (
    <div>SignUp</div>
  )
}

export default SignUp