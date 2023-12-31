export default function NavBarWelcomePage({ userId, userType, changePage, validate_token }) {

    return (
        <>
            <header class="z-50 py-1 bg-white shadow-md dark:bg-gray-800 w-screen pb-0 -mt-0">
                <div
                    class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
                >
                    {/* Mobile hamburger */}
                    <button class="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple z-100" aria-label="Menu"
                        onClick={() => {
                            document.getElementById('mobile-sidebar-backdrop').style.display = document.getElementById('mobile-sidebar-backdrop').style.display === 'block' ? 'none' : 'block';
                            document.getElementById('mobile-sidebar').style.display = document.getElementById('mobile-sidebar').style.display === 'block' ? 'none' : 'block';;
                        }}>
                        <svg class="w-6 h-6 z-90" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    {/* Search */}
                    <div class="flex justify-center flex-1 lg:mr-32">
                    </div>

                    <ul class="flex items-center flex-shrink-0 space-x-6">

                        <li class="relative">
                            
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}