
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
  const [loading, setLoading] = useState()

  const submitForm = async (data) => {
    setLoading(true)
    const res= await signupGymOwner(data)
    if(res.status==201){
      setMessage(res.message)
      setError(null)
    }else{
      setError(res.error)
      setMessage(null)
    }
    setLoading(false)
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100'

  const labelClass =
    'mb-1.5 block text-sm font-medium text-gray-700'

  const errorClass =
    'mt-1 text-xs text-red-500'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-xl font-bold text-white">
            G
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Get started by registering as a gym owner.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">

          {/* Name */}
          <div>
            <label htmlFor="ownerName" className={labelClass}>
              Full Name
            </label>
            <input
              id="ownerName"
              placeholder="John Doe"
              {...register('ownerName', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Min length is 2' },
              })}
              className={inputClass}
            />
            {errors.ownerName && (
              <p className={errorClass}>{errors.ownerName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="ownerEmail" className={labelClass}>
              Email Address
            </label>
            <input
              id="ownerEmail"
              type="email"
              placeholder="john@example.com"
              {...register('ownerEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email',
                },
              })}
              className={inputClass}
            />
            {errors.ownerEmail && (
              <p className={errorClass}>{errors.ownerEmail.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="ownerPhone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="ownerPhone"
              type="tel"
              placeholder="10-digit mobile number"
              {...register('ownerPhone', {
                required: 'Phone is required',
                maxLength: {
                  value: 10,
                  message: 'Phone number must be 10 digits',
                },
                minLength: {
                  value: 10,
                  message: 'Phone number must be 10 digits',
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              })}
              className={inputClass}
            />
            {errors.ownerPhone && (
              <p className={errorClass}>{errors.ownerPhone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="ownerPass" className={labelClass}>
              Password
            </label>
            <input
              id="ownerPass"
              type="password"
              placeholder="Create a strong password"
              {...register('ownerPass', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message:
                    'Include an uppercase letter, number, and symbol',
                },
              })}
              className={inputClass}
            />
            {errors.ownerPass && (
              <p className={errorClass}>{errors.ownerPass.message}</p>
            )}
            <p className="mt-1.5 text-xs text-gray-400">
              Minimum 8 characters, 1 uppercase, 1 number and 1 symbol.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading ? true : false}
            className={`${loading && "bg-red-200"} w-full rounded-lg bg-red-500 py-3 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-600 active:scale-[0.98]`}
          >
            {loading ? 'Creating Account, Please Wait' : 'Create Account'}
          </button>
        </form>

        {/* Response messages */}
        {message && (
          <p className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          Gym Management System · Owner Registration
        </p>
      </div>
    </div>
  )
}

export default SignupForm
