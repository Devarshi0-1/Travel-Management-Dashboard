'use client';
import { Lightbulb, MoonIcon } from 'lucide-react';
import { useState } from 'react';

const DarkMode = () => {
	const [darkMode, setDarkMode] = useState(false);

	const DarkModeHandler = (name: string) => {
		setDarkMode(!darkMode);
		if (name === 'bulb') {
			document.body.classList.remove('dark-only');
			document.body.classList.remove('dark');
		} else if (name === 'Moon') {
			document.body.classList.add('dark-only');
			document.body.classList.add('dark');
		}
	};

	return (
		<li>
			<div className='mode'>
				{darkMode ? (
					<Lightbulb onClick={() => DarkModeHandler('bulb')} />
				) : (
					<MoonIcon onClick={() => DarkModeHandler('Moon')} />
				)}
			</div>
		</li>
	);
};

export default DarkMode;
