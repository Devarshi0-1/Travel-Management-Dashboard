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
import { TGender, TRole } from '@/types/type';

const genders = ['Male', 'Female', 'Other'];

const AddUserForm = () => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [role, setRole] = useState<TRole['name'] | null>(null);
	const [roles, setRoles] = useState<TRole[]>([]);
    const [gender, setGender] = useState<TGender | null>(null);

	const resetForm = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhoneNumber('');
		setDateOfBirth('');
		setPassword('');
		setConfirmPassword('');
		setRole(null);
	};

	const handleCreateUser = async () => {
		if (
			!email ||
			!password ||
			!confirmPassword ||
			!role ||
			!firstName ||
			!lastName ||
			!phoneNumber ||
			!dateOfBirth ||
			!gender
		) {
			toast.error('Please fill all the fields');
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Password and Confirm Password don't match!");
			return;
		}

		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/organization/members/`,
				{
					email: email.toLowerCase(),
					password: password,
					confirm_password: confirmPassword,
					role: role.toLowerCase(),
					first_name: firstName,
					last_name: lastName,
					ph_number: phoneNumber,
					dob: dateOfBirth,
					gender: gender.toLowerCase(),
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
			toast.error('An Error Occurred!');
		}
	};

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const { data } = await axios.get<TRole[]>(
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
			<div className='mb-3 tw:flex tw:justify-between'>
				<div>
					<Select
						onValueChange={(id) => setRole(id as TRole['name'])}
						required>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Role' />
						</SelectTrigger>
						<SelectContent>
							{roles
								.filter((role) => role.name !== 'OWNER')
								.map((role) => (
									<SelectItem
										key={role.id}
										value={role.name}>
										{role.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						onValueChange={(gender) => setGender(gender as TGender)}
						required>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Gender' />
						</SelectTrigger>
						<SelectContent>
							{genders.map((gender) => (
								<SelectItem
									key={gender}
									value={gender}>
									{gender}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='mb-3 tw:flex tw:gap-3'>
				<div className='tw:flex-1'>
					<label className='form-label-title'>First Name</label>
					<input
						className='form-control'
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder='John'
						required
					/>
				</div>
				<div className='tw:flex-1'>
					<label className='form-label-title'>Last Name</label>
					<input
						className='form-control'
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder='Doe'
						required
					/>
				</div>
			</div>
			<div className='mb-3 tw:flex tw:gap-3'>
				<div className='tw:flex-1'>
					<label className='form-label-title'>Phone Number</label>
					<input
						className='form-control'
						type='text'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						placeholder='987654XXXX'
						required
					/>
				</div>
				<div className='tw:flex-1'>
					<label className='form-label-title'>Date of Birth</label>
					<input
						className='form-control'
						type='text'
						value={dateOfBirth}
						onChange={(e) => setDateOfBirth(e.target.value)}
						placeholder='2002-12-17'
						required
					/>
				</div>
			</div>
			<div className='mb-3'>
				<label className='form-label-title'>Email</label>
				<input
					className='form-control'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email Address'
					required
				/>
			</div>
			<div className='mb-3 tw:flex tw:gap-3'>
				<div className='tw:flex-1'>
					<label className='form-label-title'>Password</label>
					<input
						className='form-control'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password@123'
						required
					/>
				</div>
				<div className='tw:flex-1'>
					<label className='form-label-title'>Confirm Password</label>
					<input
						className='form-control'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder='Password@123'
						required
					/>
				</div>
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
