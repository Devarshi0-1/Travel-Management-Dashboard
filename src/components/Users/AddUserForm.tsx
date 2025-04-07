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

type TGender = 'male' | 'female' | 'other';

type TRole = {
	id: 7;
	name: string;
	description: string;
	permissions: {
		tax: {
			view_tax: boolean;
			create_tax: boolean;
			delete_tax: boolean;
			update_tax: boolean;
		};
		role: {
			view_role: boolean;
			assign_role: boolean;
			delete_role: boolean;
			update_role: boolean;
		};
		user: {
			add_user: boolean;
			view_user: boolean;
			delete_user: boolean;
			update_user: boolean;
		};
		booking: {
			view_booking: boolean;
			create_booking: boolean;
			delete_booking: boolean;
			update_booking: boolean;
		};
		invoice: {
			view_invoice: boolean;
			create_invoice: boolean;
			delete_invoice: boolean;
			update_invoice: boolean;
		};
		selfuser: {
			view_selfuser: boolean;
			update_selfuser: boolean;
		};
		permission: {
			view_permissions: boolean;
			manage_permissions: boolean;
		};
		organization: {
			view_organization: boolean;
			create_organization: boolean;
			delete_organization: boolean;
			update_organization: boolean;
		};
		invoice_layout: {
			view_layout: boolean;
			create_layout: boolean;
			delete_layout: boolean;
			update_layout: boolean;
		};
		product_type_tax: {
			view_product_tax: boolean;
			create_product_tax: boolean;
			delete_product_tax: boolean;
			update_product_tax: boolean;
		};
		invoice_legal_term: {
			view_legal_term: boolean;
			create_legal_term: boolean;
			delete_legal_term: boolean;
			update_legal_term: boolean;
		};
		organization_member: {
			view_organization_member: boolean;
			create_organization_member: boolean;
			delete_organization_member: boolean;
			update_organization_member: boolean;
		};
	};
	organization: 2;
};

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
					password: password.toLowerCase(),
					confirm_password: confirmPassword.toLowerCase(),
					role: role.toLowerCase(),
					first_name: firstName.toLowerCase(),
					last_name: lastName.toLowerCase(),
					ph_number: phoneNumber.toLowerCase(),
					dob: dateOfBirth.toLowerCase(),
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
							{roles.map((role) => (
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
