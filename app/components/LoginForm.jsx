import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../actions/auth'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const submitForm = async (data) => {
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await loginUser(data)

      if (res.status === 200) {
        setMessage(res.message)
      } else {
        setError(res.error)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100'

  const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

  const errorClass = 'mt-1 text-xs text-red-500'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-xl font-bold text-white">
            G
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to access your gym management dashboard.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address',
                },
              })}
              className={inputClass}
            />

            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                })}
                className={`${inputClass} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-red-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-500 py-3 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login to Account'}
          </button>
        </form>

        {/* Response Messages */}
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

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Gym Management System · Account Login
        </p>
      </div>
    </div>
  )
}

export default LoginForm
