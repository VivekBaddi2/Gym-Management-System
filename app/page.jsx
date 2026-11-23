'use client'
import React from 'react'
import './globals.css'
import Link from 'next/link'

function Home() {
	return (
		<section className='h-screen w-screen space-y-2'>
			<nav className='h-[10%] w-full'>

			</nav>
			<div className="flex flex-col gap-2 justify-center items-center ">
				<h1 className='text-4xl'>Gym Management System</h1>
				<h2 className='text-sm'>One stop solution for managing your gym facility</h2>
			</div>
			<div className='flex gap-2 justify-center items-center'>
				<Link href={'/authentication?type=signup'}>
					<button type="button" className='px-4 py-2 bg-red-500 text-white rounded-full text-sm'>Sign Up</button>
				</Link>

				<Link href={'/authentication?type=login'}>
					<button type="button" className='px-4 py-2 border-black border-2 rounded-full text-sm'>Login</button>
				</Link>
			</div>
		</section>
	)
}

export default Home
