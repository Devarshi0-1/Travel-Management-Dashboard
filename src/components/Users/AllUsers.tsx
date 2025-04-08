import { formatDate } from '@/lib/utils';
import { TGender, TOrganizationMembersResponse, TRole } from '@/types/type';
import { ImagePath } from '@/utils/Constant';
import axios from 'axios';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Href } from '../../utils/Constant';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const AllUsersTable = ({
	members,
}: {
	members?: TOrganizationMembersResponse['results'];
}) => {
	return (
		<table className='user-table table table-striped'>
			<thead>
				<tr>
					<th>User</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Role</th>
					<th>Email</th>
					<th>Joining Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{members?.map((member, index) => (
					<tr key={index}>
						<td>
							<span>
								<Image
									height={45}
									width={45}
									src={`${ImagePath}/users/${index + 1}.jpg`}
									alt='users'
								/>
							</span>
						</td>
						<td>
							<a href={Href}>
								<span className='d-block'>
									{member.user.userprofile?.first_name || 'N/A'}
								</span>
								<span>{member.user.userprofile?.last_name || 'N/A'}</span>
							</a>
						</td>
						<td>{member.user.userprofile?.ph_number || 'N/A'}</td>
						<td>{member.role_name}</td>
						<td>{member.user.email}</td>
						<td className='font-primary'>
							{formatDate(member.joined_at) || 'N/A'}
						</td>
						<td>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<EllipsisVertical className='tw:h-4 tw:w-4 tw:text-primary' />
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className='tw:w-40 tw:p-2'
									align='start'>
									<div className='tw-grid tw:gap-1'>
										<EditUserDialog memberId={member.id} />
										<Button
											variant='secondary'
											className='tw:w-full tw:bg-transparent tw:justify-start'>
											Delete
										</Button>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

type TMemberData = {
	id: number;
	organization: number;
	user: {
		id: number;
		email: string;
		userprofile: {
			first_name: string;
			last_name: string;
			ph_number: string;
			dob: string;
			gender: string;
			profile_pic?: string;
		};
	};
	role: number;
	role_name: string;
	owner: null;
	admin: null;
	higher_mgmt: null;
	mid_level: null;
	joined_at: Date;
};

const genders = ['Male', 'Female', 'Other'];

const EditUserDialog = ({ memberId }: { memberId: number }) => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
	// const [joiningDate, setJoiningDate] = useState<Date | null>(null);
	const [role, setRole] = useState<TRole['name'] | null>(null);
	const [roles, setRoles] = useState<TRole[]>([]);
	const [gender, setGender] = useState<TGender | null>(null);

	const [userData, setUserData] = useState<TMemberData>();

	const resetForm = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhoneNumber('');
		// setJoiningDate(null);
		setDateOfBirth(null);
		setRole('');
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { data } = await axios.get<TMemberData>(
					`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/api/organization-members/${memberId}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setUserData(data);
				setFirstName(data.user.userprofile.first_name);
				setLastName(data.user.userprofile.last_name);
				setEmail(data.user.email);
				setPhoneNumber(data.user.userprofile.ph_number);
				setRole(data.role_name);
				setDateOfBirth(new Date(data.user.userprofile.dob));
				// setJoiningDate(new Date(data.joined_at));
			} catch (error) {
				console.log(error);
				toast.error('An Error Occurred!');
			}
		};
		fetchUserData();
	}, [memberId]);

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
				toast.error('An Error While Getting Roles Occurred!');
			}
		};
		fetchRoles();
	}, []);

	// When the form is submitted, process the form data.
	const handleSubmit = async () => {
		console.log({
			firstName,
			lastName,
			email,
			role,
			gender,
			// joiningDate,
			dateOfBirth,
		});

		try {
			await axios.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/organization/members/${memberId}/`,
				{
					email: email.toLowerCase(),
					role: 10,
					first_name: firstName,
					last_name: lastName,
					ph_number: phoneNumber,
					dob: '2002-12-02',
					gender: gender?.toLowerCase(),
					// joining_date: joiningDate,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			toast.success('User Edited Successfully!');
			resetForm();
		} catch (error) {
			console.log(error);
			toast.error('An Error Occurred!');
		}
	};

	// Format Date for Input value (YYYY-MM-DD)
	const formatInputDate = (date: Date | null) => {
		if (!date) return '';
		return date.toISOString().split('T')[0];
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Button
					variant='secondary'
					className='tw:w-full tw:bg-transparent tw:justify-start'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='tw:w-1/2'>
				<DialogHeader>
					<DialogTitle>Edit User Info</DialogTitle>
					<DialogDescription>
						Make changes to the user profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form className='tw:space-y-4'>
					<div className='tw:grid tw:grid-cols-2 tw:gap-4'>
						<div>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								name='firstName'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder='Enter first name'
							/>
						</div>
						<div>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								name='lastName'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder='Enter last name'
							/>
						</div>
					</div>
					{/* Email */}
					<div className='tw:grid tw:grid-cols-2 tw:gap-4'>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Enter email address'
							/>
						</div>
						<div>
							<Label htmlFor='phoneNumber'>Phone Number</Label>
							<Input
								id='phoneNumber'
								name='phoneNumber'
								type='text'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								placeholder='Enter Phone Number'
							/>
						</div>
					</div>
					<div className='tw:grid tw:grid-cols-2 tw:gap-4'>
						<div>
							<Label htmlFor='role'>Role</Label>
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
							<Label htmlFor='gender'>Gender</Label>
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
					{/* Joining Date & Date of Birth using normal HTML calendar */}
					<div className='tw:grid tw:grid-cols-2 tw:gap-4'>
						{/* <div>
							<Label htmlFor='joiningDate'>Joining Date</Label>
							<Input
								id='joiningDate'
								name='joiningDate'
								type='date'
								value={formatInputDate(joiningDate)}
								onChange={(e) => setJoiningDate(new Date(e.target.value))}
							/>
						</div> */}
						<div>
							<Label htmlFor='dateOfBirth'>Date of Birth</Label>
							<Input
								id='dateOfBirth'
								name='dateOfBirth'
								type='date'
								value={formatInputDate(dateOfBirth)}
								onChange={(e) => setDateOfBirth(new Date(e.target.value))}
							/>
						</div>
					</div>
					<div className='tw:flex tw:justify-end tw:mt-4'>
						<Button
							type='button'
							onClick={handleSubmit}>
							Save Changes
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AllUsersTable;
