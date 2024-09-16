import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open for large screens

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out w-64 z-30`}
            >
                <nav className="mt-16">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                    {/* Additional Sidebar Links */}
                    <ResponsiveNavLink href={route('categories.index')} active={route().current('categories.index')} className="mt-4">
                        Categories
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('locations.index')} active={route().current('locations.index')} className="mt-4">
                        Locations
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('items.index')} active={route().current('items.index')} className="mt-4">
                        Items
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('tags.index')} active={route().current('tags.index')} className="mt-4">
                        Tags
                    </ResponsiveNavLink>

                    {/* User Info Dropdown (for small screens) */}
                    <div className="mt-4 lg:hidden">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex w-full">
                                    <button
                                        type="button"
                                        className="inline-flex w-full items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}
                                        <HiChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 relative z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                {/* Toggle button for sidebar (large screens) */}
                                <button
                                    className="hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none lg:block lg:ml-8 lg:mr-8"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                >
                                    {isSidebarOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                                </button>

                                {/* Application logo in the navbar */}
                                <Link href="/" className="ml-4 lg:ml-0">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>

                                {/* Navbar Links for larger screens */}
                                <div className="hidden lg:flex space-x-8 sm:ml-10">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>

                            {/* Toggle button for sidebar (small screens) */}
                            <div className="lg:hidden flex items-center">
                                <button
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                >
                                    {isSidebarOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                                </button>
                            </div>

                            {/* User Dropdown for larger screens */}
                            <div className="hidden lg:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}
                                                    <HiChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
