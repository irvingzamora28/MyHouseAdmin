import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import Sidebar from '@/Components/Sidebar';
import { SearchContext } from '@/Contexts/SearchContext';

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
                {/* Sidebar */}
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} />

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
                                        {isSidebarOpen ? null : <HiMenu className="h-6 w-6" />}
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

                                {/* Search Bar */}
                                <div className="flex items-center">
                                    <form onSubmit={(e) => e.preventDefault()} className="flex">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
                                        />
                                    </form>

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

                                    {/* Toggle button for sidebar (small screens) */}
                                    <div className="lg:hidden flex items-center ml-2">
                                        <button
                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        >
                                            {isSidebarOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                                        </button>
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

                    {/* Pass searchQuery as a prop to the children */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </SearchContext.Provider>
    );
}
