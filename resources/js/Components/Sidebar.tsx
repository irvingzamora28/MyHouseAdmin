import { ReactElement } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import ResponsiveNavLink from './ResponsiveNavLink';
import Dropdown from './Dropdown';
import { HiX } from 'react-icons/hi';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    user: { name: string };
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, user }: SidebarProps): ReactElement {
    return (
        <div
            className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out w-64 z-30`}
        >
            {/* Toggle button in the upper right corner */}
            <div className="absolute top-0 right-0 m-4">
                <button
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <div className="hidden lg:block">
                            <HiX className="h-6 w-6" />
                        </div>
                    ) : (
                        <></>
                    )}
                </button>
            </div>

            {/* Sidebar links */}
            <nav className="mt-16">
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                </ResponsiveNavLink>

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
    );
}
