export const NavBar = () => {
    return (
        <nav className="absolute top-[5%] z-30">
            <ul className="flex w-full justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg z-30">
                <li className="nav-item-smooth">
                    <a href="/" aria-label="Home" className="flex items-center text-white hover:text-orange-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"/>
                            <path d="M9 21V12h6v9"/>
                        </svg>
                    </a>
                </li>
                <li className="nav-item-smooth">
                    <a className="font-bold" href="/blog">Blog</a>
                </li>
                <li className="nav-item-smooth">
                    <a className="font-bold" href="/projects">Projects</a>
                </li>
                <li className="nav-item-smooth">
                    <a className="font-bold" href="/#contact">Contact</a>
                </li>
            </ul>
        </nav>

    )
}
