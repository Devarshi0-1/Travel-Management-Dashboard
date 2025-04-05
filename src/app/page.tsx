'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			router.push('/login');
		} else router.push('/dashboard');
	}, [localStorage.getItem('token')]);

	return <></>;
};

export default Home;
