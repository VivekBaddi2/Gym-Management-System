import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signupGymOwner } from '../actions/auth'

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [message, setMessage] = useState()
  const [error, setError] = useState()

  const submitForm = async (data) => {
    const res = await signupGymOwner(data)
    console.log(res)
    setMessage(res?.message)
    setError(res?.error)
  }
  return (
    <div>
      <div>
        <h1>Signup</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="ownerName" className="block">
            Name
          </label>
          <input
            id="ownerName"
            {...register('ownerName', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Min length is 2' },
            })}
            className="border p-2 rounded"
          />
          <p>{errors.ownerName?.message}</p>

          <label htmlFor="ownerEmail" className="block">
            Email
          </label>
          <input
            id="ownerEmail"
            {...register('ownerEmail', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
            className="border p-2 rounded"
          />
          <p>{errors.ownerEmail?.message}</p>

          <label htmlFor="ownerPhone" className="block">
            Phone
          </label>
          <input
            id="ownerPhone"
            {...register('ownerPhone', {
              required: 'Phone is required',
              maxLength: 10,
            })}

            className="border p-2 rounded"
          />
          <p>{errors.ownerPhone?.message}</p>
          <label htmlFor="ownerPass" className="block">
            Password
          </label>
          <input
            id="ownerPass"
            type="password"
            {...register('ownerPass', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be atleast 8 characters',
              },
            })}

            className="border p-2 rounded"
          />
          <p>{errors.ownerPass?.message}</p>
          <button
            type="submit"
            className=" px-3 py-1 text-sm border bg-red-500 text-white rounded-full"
          >
            Sign Up
          </button>
        </form>

        {message && (<p>{message}</p>)}
        {error && (<p>{error}</p>)}
      </div>
    </div>
  )
}

export default SignupForm
