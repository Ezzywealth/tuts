import React, { useState, useRef, useEffect } from 'react';
import Controls from './Controls';
import './mediastyles.css';
import { handleUpload } from './generateBlob';
import { useNavigate } from 'react-router-dom';

const MediaRecorder = ({ setIsAudio, setIsVideo, isVideo, isAudio, pauseRecording, resetRecording, resumeRecording, startRecording, status, stopRecording, blobUrl }) => {
	const videoRef = useRef(null);
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const startCamera = async () => {
		console.log('video called');
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (isVideo) {
				videoRef.current.srcObject = stream;
			} else {
				console.error('videoRef is undefined');
			}
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
	};

	function stopCamera() {
		if (videoRef) {
			const tracks = videoRef.current.srcObject?.getTracks();
			tracks?.forEach((track) => {
				track.stop();
			});
			videoRef.current.srcObject = null;
		}
	}

	const handleStopRecording = async () => {
		if (status === 'recording' || status === 'paused') {
			stopRecording();
			stopCamera();
			try {
				const result = await handleUpload(blobUrl);
				console.log(result);
				if (!result) {
					throw new Error('Error Uploading Video');
				}
				alert('Video Uploaded Successfully');
				navigate(`/completed/${result}`);
			} catch (error) {
				alert(error.message);
			}
		}
	};

	useEffect(() => {
		if (status === 'recording' && isVideo) {
			startCamera();
		}
	}, [status, isVideo]);

	return (
		<div>
			<div>
				{blobUrl && <video src={blobUrl} controls className='w-full ' />}
				<div className='video-container'>{isVideo && <video ref={videoRef} autoPlay playsInline className='video-element'></video>}</div>
				{status !== 'permission-requested' && status !== 'stopped' && (
					<section>
						<Controls handleStopRecording={handleStopRecording} pauseRecording={pauseRecording} resumeRecording={resumeRecording} resetRecording={resetRecording} status={status} seconds={seconds} setSeconds={setSeconds} minutes={minutes} setMinutes={setMinutes} hours={hours} setHours={setHours} isRunning={isRunning} setIsRunning={setIsRunning} setIsAudio={setIsAudio} setIsVideo={setIsVideo} isVideo={isVideo} isAudio={isAudio} />
					</section>
				)}
			</div>
		</div>
	);
};

export default MediaRecorder;
