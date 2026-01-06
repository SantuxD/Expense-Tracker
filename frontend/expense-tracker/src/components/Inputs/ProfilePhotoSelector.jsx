import React from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = React.useRef(null);
    const [preview, setPreview] = React.useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreview(preview);
        }
    }
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);

    }
    const onChoosefile = () => {
        inputRef.current.click();
    }
    return (
        <div className='flex justify-center mb-6 '>
            <input
                type="file"
                accept="image/*"
                className='hidden'
                ref={inputRef}
                onChange={handleImageChange}

            />
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative ' >
                    <LuUser className='text-4xl text-primary ' />
                    <button
                        type='button'
                        onClick={onChoosefile}
                        className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={preview}
                        alt="Profile Photo"
                        className='w-20 h-20 rounded-full object-cover'
                    />

                    <button
                        type='button'
                        onClick={handleRemoveImage}
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                    >
                        <LuTrash />
                    </button>
                </div>

            )}
        </div>

    )
}

export default ProfilePhotoSelector