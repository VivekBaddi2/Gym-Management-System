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

  try {
    const res = await pool.query(
      `INSERT INTO gym_owner (gym_owner_id, gym_owner_name, gym_owner_phone, gym_owner_email, gym_owner_password) VALUES ($1, $2, $3, $4, $5)`,
      [ownerId, ownerName, ownerPhone, ownerEmail, hashedPass],
    )
    return { success: true, message: res }
  } catch (error) {
    console.error('Signup failed: ', error)
    return { success: false, error: 'Signup failed. Please try again.' }
  }
}
