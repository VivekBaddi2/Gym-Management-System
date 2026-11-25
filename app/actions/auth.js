'use server'

import { v4 as uuidv4 } from 'uuid'
import { pool } from '../lib/db'
import bcrypt from 'bcrypt'

export async function signupGymOwner(data) {
  const userId = uuidv4()
  const ownerName = data.ownerName?.trim()
  const ownerPhone = data.ownerPhone?.trim()
  const ownerEmail = data.ownerEmail?.trim()
  const ownerPass = data.ownerPass

  if (!ownerName || !ownerPhone || !ownerEmail || !ownerPass) {
    return {
      status: 400,
      success: false,
      error: 'Name, phone, email, and password are required.',
    }
  }

  try {
    const hashedPass = await bcrypt.hash(ownerPass, 12)
    await pool.query(
      `INSERT INTO users (user_id, user_name, user_phone, user_email, user_password, role)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, ownerName, ownerPhone, ownerEmail, hashedPass, 'gym-owner'],
    )
    return {
      status: 201,
      success: true,
      message: 'Account created successfully.',
    }
  } catch (error) {
    if (error.code === '23505') {
      return {
        status: 409,
        success: false,
        error: 'This phone number or email is already linked to an account.',
      }
    }
    console.error('Signup failed: ', error)
    return {
      status: 500,
      success: false,
      error: 'Signup failed. Please try again.',
    }
  }
}

export async function loginUser(data) {
  const email = data.email?.trim()
  const password = data.password

  if (!email || !password) {
    return {
      status: 400,
      success: false,
      error: 'Email and password are required.',
    }
  }

  try {
    const res = await pool.query(
      `SELECT user_id, user_name, user_email, user_password, role
       FROM users
       WHERE user_email = $1`,
      [email],
    )
    if (res.rowCount === 0) {
      return {
        status: 400,
        success: false,
        error: 'There is no account associated with the given email',
      }
    }

    const user = res.rows[0]
    const passwordMatches = await bcrypt.compare(password, user.user_password)
    if (!passwordMatches) {
      return {
        status: 400,
        success: false,
        error: 'Invalid email or password.',
      }
    }

    return {
      status: 200,
      success: true,
      message: 'Successfully logged in.',
      user: {
        userId: user.user_id,
        userName: user.user_name,
        userEmail: user.user_email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error('Login Failed, Please try again.', error)
    return { status: 500, success: false, error: 'Server Error' }
  }
}
