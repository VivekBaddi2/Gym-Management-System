'use server'

import { v4 as uuidv4 } from 'uuid'
import { pool } from '../lib/db'
import bcrypt from 'bcrypt'

export async function signupGymOwner(data) {
  const ownerId = uuidv4()
  const ownerName = data.ownerName
  const ownerPhone = data.ownerPhone
  const ownerEmail = data.ownerEmail
  const ownerPass = data.ownerPass

  // Hash the password using bcrypt
  const hashedPass = await bcrypt.hash(ownerPass, 12)

  // Check if an account already exists for the given phone number and email because phone number must be unique
  try {
    const res = await pool.query(
      `SELECT * FROM gym_owner where gym_owner_phone=$1 or gym_owner_email=$2`,
      [ownerPhone, ownerEmail],
    )
    for (const row of res?.rows) {
      if (row.gym_owner_phone === ownerPhone) {
        return {
          status: 409,
          success: false,
          error:
            'This phone number is already linked to a different account. Please use another number.',
        }
      }
      if (row.gym_owner_email === ownerEmail) {
        return {
          status: 409,
          success: false,
          error:
            'This email is already linked to a different account. Please use another email.',
        }
      }
    }
  } catch (error) {
    console.error('Data validation failed', error)
    return {
      status: 500,
      success: false,
      error: 'Data validation failed. Please try again.',
    }
  }

  try {
    const res = await pool.query(
      `INSERT INTO gym_owner (gym_owner_id, gym_owner_name, gym_owner_phone, gym_owner_email, gym_owner_password) VALUES ($1, $2, $3, $4, $5)`,
      [ownerId, ownerName, ownerPhone, ownerEmail, hashedPass],
    )
    return {
      status: 201,
      success: true,
      message: 'Account created successfully.',
    }
  } catch (error) {
    console.error('Signup failed: ', error)
    return {
      status: 500,
      success: false,
      error: 'Signup failed. Please try again.',
    }
  }
}

export async function loginGymOwner(data) {
  const ownerEmail = data.ownerEmail
  const ownerPass = data.ownerPass
  let accountDetails
  // First check if an account with the given email exists or not, if doesn't exist, then return.
  try {
    const res = await pool.query(
      `select gym_owner_email, gym_owner_password from gym_owner where gym_owner_email=$1`,
      [ownerEmail],
    )
    // rowCount = 0 means, the sql query did not find any records for given mail, thus account doesn't exist
    if (res.rowCount === 0) {
      return {
        status: 400,
        success: false,
        error: 'There is no account associated with the given email',
      }
    } else {
      accountDetails = res.rows[0] // if accout exists, then store the data in accountDetails variable to avoid future db calls
    }
  } catch (error) {
    console.error('Unable to validate the given email', error)
    return { status: 500, success: false, error: 'Server Error' }
  }

  // If account exists then the following code will be executed
  try {
    const dehash = await bcrypt.compare(
      ownerPass,
      accountDetails.gym_owner_password,
    )
    if (dehash === true) {
      return { status: 200, success: true, message: 'Successfully Logged In!' }
    } else {
      return { status: 400, success: false, error: 'Incorrect Password' }
    }
  } catch (error) {
    console.error('Login Failed, Please try again.', error)
    return { status: 500, success: false, error: 'Server Error' }
  }
}
