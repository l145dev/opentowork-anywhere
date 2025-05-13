import { useEffect, useState } from 'react';
import './Navbar.css';
import { Github, Linkedin, Globe } from 'lucide-react';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1092);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1092);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav>
                <h1>
                    <span className='opentowork'>#OPENTOWORK</span>anywhere
                </h1>

                <div className='links'>
                    <a className='link github' href="https://github.com/l145dev/opentowork-anywhere" target='_blank'>
                        <Github />
                        {!isMobile && (
                            <>
                                <p>Github</p>
                            </>
                        )}
                    </a>

                    <a className='link portfolio' href="https://l145.be/" target='_blank'>
                        <Globe />
                        {!isMobile && (
                            <>
                                <p>Portfolio</p>
                            </>
                        )}
                    </a>

                    <a className='link linkedin' href="https://www.linkedin.com/in/aryan-shah-l145/" target='_blank'>
                        <Linkedin />
                        {!isMobile && (
                            <>
                                <p>LinkedIn</p>
                            </>
                        )}
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navbar;