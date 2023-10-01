import React, { useState } from 'react';
import './popup.css';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle, AiOutlineSetting, AiOutlineAudio } from 'react-icons/ai';
import { BiVideo, BiCopy } from 'react-icons/bi';
import ToggleSwitch from './ToggleSwitch';
import { FiMonitor } from 'react-icons/fi';

const Popup = () => {
	const data = [
		{
			id: 1,
			name: 'Full screen',
			icon: <FiMonitor size={25} />,
		},
		{
			id: 2,
			name: 'Current Tab',
			icon: <BiCopy size={25} />,
		},
	];
	const [activeScreenType, setActiveScreenType] = useState('Full screen');
	// { setIsVideo, setIsAudio, startRecording, isVideo, isAudio }
	const [isVideo, setIsVideo] = useState(false);
	const [isAudio, setIsAudio] = useState(false);

	const startRecording = () => {
		chrome.runtime.sendMessage({ message: 'start-recording' });
	};

	const handleStartRecording = () => {
		if (isVideo || isAudio) {
			startRecording();
		}
	};

	return (
		<main className='fixed right-12 top-0'>
			<section className='shadow-2xl rounded-2xl space-y-6 w-full p-6'>
				<div className='flex justify-between'>
					<div className='flex items-center'>
						{/* <Link to='/'>
							<img src='/assets/images/logo.png' alt='Logo' width={160} height={70} className=' mr-2' />
						</Link> */}
					</div>
					{/* <div className='flex gap-4 p-4 '>
						<AiOutlineSetting size={30} className='text-[#120B48]' />
						<AiOutlineCloseCircle size={30} className='text-[#B6B3C6]' />
					</div> */}
				</div>
				<div>
					<p className='text-[#413C6D]'>This extension helps you record and share help videos with ease.</p>
				</div>
				<div className='flex justify-center gap-8'>
					{data.map((item) => (
						<section key={item.id} onClick={() => setActiveScreenType(item.name)} className={`flex cursor-pointer flex-col items-center gap-2 ${activeScreenType === item.name ? 'text-[#120B48]' : 'text-[#928FAB]'}`}>
							<span>{item.icon}</span>
							<h3 className={`font-semibold ${activeScreenType === item.name ? 'text-[#120B48]' : 'text-[#928FAB]'}`}>{item.name}</h3>
						</section>
					))}
				</div>
				<div className='w-full space-y-6'>
					<section className='flex items-center w-full justify-between rounded-[12px] p-3 border border-[#100A42]'>
						<div className='flex items-center gap-2 text-[#100A42]'>
							{/* <BiVideo size={25} /> */}
							<h3 className='text-[#100A42] text-lg font-semibold'>Camera</h3>
						</div>
						<ToggleSwitch setIsVideo={setIsVideo} />
					</section>
					<section className='flex items-center w-full justify-between rounded-[12px] p-3 border border-[#100A42]'>
						<div className='flex items-center gap-2 text-[#100A42]'>
							{/* <AiOutlineAudio size={25} /> */}
							<h3 className='text-[#100A42] text-lg font-semibold'>Audio</h3>
						</div>
						<ToggleSwitch setIsAudio={setIsAudio} />
					</section>
				</div>
				<div className=''>
					{/* <Link to='/helpmeout'> */}
					<a href='/helpmeout'>
						<button onClick={handleStartRecording} className='bg-[#120B48] text-white rounded-[10px] w-full p-4'>
							Start Recording
						</button>
					</a>
					{/* </Link> */}
				</div>
			</section>
		</main>
	);
};

export default Popup;
