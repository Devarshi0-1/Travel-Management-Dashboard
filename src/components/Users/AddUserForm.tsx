'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

type TRole = 'admin' | 'higher_mgmt' | 'mid_level' | 'lower_level';

const Roles: {
	id: number;
	value: TRole;
	label: string;
}[] = [
	{
		id: 1,
		value: 'admin',
		label: 'Admin',
	},
	{
		id: 2,
		value: 'higher_mgmt',
		label: 'Higher Management',
	},
	{
		id: 3,
		value: 'mid_level',
		label: 'Mid Level',
	},
	{
		id: 4,
		value: 'lower_level',
		label: 'Lower Level',
	},
];

const AddUserForm = () => {
	const [userName, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [role, setRole] = useState<TRole | null>(null);
	const [roles, setRoles] = useState<TRole[]>([]);

	const resetForm = () => {
		setUserName('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
		setRole(null);
	};

	const handleCreateUser = async () => {
		if (!email || !password || !confirmPassword || !role) {
			console.table({ userName, email, password, confirmPassword, role });
			toast.error('Please fill all the fields');
			return;
		}

		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/organization/members/`,
				{
					email,
					password,
					confirm_password: confirmPassword,
					role,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			toast.success('User Created Successfully!');
			resetForm();
		} catch (error) {
			console.log(error);
			toast.success('An Error Occurred!');
		}
	};

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/roles/roles`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);

				setRoles(data);
			} catch (error) {
				console.log(error);
				toast.success('An Error While Getting Roles Occurred!');
			}
		};
		fetchRoles();
	}, []);

	return (
		<form
			className='theme-form mega-form'
			onSubmit={(e) => {
				e.preventDefault();
				handleCreateUser();
			}}>
			<div className='mb-3'>
				<Select onValueChange={(id) => setRole(id as TRole)}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Role' />
					</SelectTrigger>
					<SelectContent>
						{roles.map((role) => (
							<SelectItem
								key={role.id}
								value={role.name}>
								{''}
								{role.name.replace('_', ' ')}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className='mb-3 tw:hidden'>
				<label className='form-label-title'>User Name</label>
				<input
					className='form-control'
					type='text'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					placeholder='User Name'
				/>
			</div>
			<div className='mb-3'>
				<label className='form-label-title '>Email Name</label>
				<input
					className='form-control'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email Address'
				/>
			</div>
			<div className='mb-3'>
				<label className='form-label-title '>Password</label>
				<input
					className='form-control'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password@123'
				/>
			</div>
			<div className='mb-3'>
				<label className='form-label-title '>Confirm Password</label>
				<input
					className='form-control'
					type='password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder='Password@123'
				/>
			</div>

			<div className='tw:flex tw:gap-3'>
				<Button type='submit'>Submit</Button>
				<Button
					type='button'
					onClick={resetForm}
					variant='secondary'>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default AddUserForm;
