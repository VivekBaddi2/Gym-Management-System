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
      `SELECT * FROM gym_owner where gym_owner_phone=$1 or gym_owner_email=$2`, [ownerPhone, ownerEmail]
    )
    for (const row of res?.rows) {
      if (row.gym_owner_phone === ownerPhone) {
        return { status: 409,success: false, error: 'This phone number is already linked to a different account. Please use another number.' }
      }
      if (row.gym_owner_email === ownerEmail) {
        return { status: 409, success: false, error: 'This email is already linked to a different account. Please use another email.' }
      }
    }
  } catch (error) {
    console.error('Data validation failed', error)
    return { status: 500, success: false, error: 'Data validation failed. Please try again.' }
  }

  try {
    const res = await pool.query(
      `INSERT INTO gym_owner (gym_owner_id, gym_owner_name, gym_owner_phone, gym_owner_email, gym_owner_password) VALUES ($1, $2, $3, $4, $5)`,
      [ownerId, ownerName, ownerPhone, ownerEmail, hashedPass],
    )
    return { status: 201, success: true, message: 'Account created successfully.' }
  } catch (error) {
    console.error('Signup failed: ', error)
    return { status: 500, success: false, error: 'Signup failed. Please try again.' }
  }
}
