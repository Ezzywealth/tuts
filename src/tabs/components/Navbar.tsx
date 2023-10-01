import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
	return (
		<nav className=' p-4 px-4 lg:px-16 xl:px-48 flex items-center justify-between border-b-4 border-[#F4F6F8]'>
			<div className='flex items-center'>
				<Link to='/' className=''>
					<img src='logo.png' alt='Logo' width={160} height={70} className=' mr-2' />
				</Link>
			</div>
			<div className='flex gap-8'>
				<Link to='/#features' className='text-[#000000] font-semibold tracking-wider text-lg transition duration-300'>
					Features
				</Link>
				<Link to='/#works' className='text-[#000000] font-semibold tracking-wider text-lg  transition duration-300'>
					How it works
				</Link>
			</div>

			<Link to='/screenrecorder' className=' text-[#120B48] font-semibold text-xl px-4 py-2 rounded-md hover:text-[#29244e] transition duration-300'>
				Get Started
			</Link>
		</nav>
	);
};

export default Navbar;
