import React from 'react'
import AuthLayout from '../../components/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = () => {
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
  }


  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to sign up</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              lang='Enter your email address'
              required
            />
            <div className='col-span-2'>
              <Input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}
            </div>
          </div>
          <button
            type="submit"
            className='btn-primary'
          >
            Sign Up
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>Already have an account?
            <Link className="font-medium text-primary underline " to="/login"> Log In </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp