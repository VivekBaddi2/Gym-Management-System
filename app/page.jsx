'use client'

import React from 'react'
import './globals.css'
import Link from 'next/link'

function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 md:px-16 lg:px-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-lg font-bold text-white">
            G
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Gym<span className="text-red-500">Flow</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-red-500"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-red-500"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-gray-600 transition hover:text-red-500"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-gray-600 transition hover:text-red-500"
          >
            Contact
          </Link>
        </div>

        {/* Navbar CTA */}
        <Link
          href="/authentication?type=signup"
          className="rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-600"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center gap-14 px-6 py-16 lg:flex-row lg:px-12">
        {/* Hero Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Manage Your Gym.
            <span className="block text-red-500">Build Your Community.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
            One powerful platform to manage memberships, track payments,
            organize your staff and keep your gym running smoothly.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/authentication?type=signup"
              className="rounded-full bg-red-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-600"
            >
              Get Started
            </Link>

            <Link
              href="/authentication?type=login"
              className="rounded-full border border-gray-300 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-500 hover:bg-gray-100"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative w-full max-w-xl flex-1">
          {/* Background decoration */}
          <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full bg-red-200/50 blur-3xl"></div>
          <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-orange-200/50 blur-3xl"></div>

          {/* Dashboard Card */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-300/50 sm:p-7">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Dashboard Overview
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Welcome back, Admin
                </p>
              </div>

              <div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-500">
                Overview
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Total Members
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">1,240</h3>
                <p className="mt-1 text-xs text-green-600">+12.5% this month</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Monthly Revenue
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">₹2.4L</h3>
                <p className="mt-1 text-xs text-green-600">+8.2% this month</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Active Members
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">986</h3>
                <p className="mt-1 text-xs text-gray-400">Currently enrolled</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">
                  Pending Payments
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">24</h3>
                <p className="mt-1 text-xs text-red-500">Requires attention</p>
              </div>
            </div>

            {/* Activity */}
            <div className="mt-6 rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">
                  Recent Activity
                </h3>
                <span className="text-xs text-gray-400">Today</span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                      A
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        New membership
                      </p>
                      <p className="text-[11px] text-gray-400">Alex Johnson</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +₹2,000
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      R
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        Membership renewed
                      </p>
                      <p className="text-[11px] text-gray-400">Rahul Sharma</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +₹3,500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
