import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';


const Input = ({ value, onChange, placeholder, label, type }) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>

            <div className='input-box'>
                <input type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    value={value}
                    onChange={(e) => onChange(e)}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none '
                />
                {type == 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className='cursor-pointer text-primary'
                                onClick={() => togglePasswordVisibility()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className='cursor-pointer text-slate-400'
                                onClick={() => togglePasswordVisibility()}
                            />
                        )}
                    </>

                )}
            </div>

        </div>
    )
}

export default Input