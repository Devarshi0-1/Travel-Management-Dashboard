'use client';
import CommonCardHeader from '@/Common/CommonCardHeader';
import PaginationBox from '@/Common/PaginationBox';
import AllUsersTable from '@/components/Users/AllUsers';
import UsersSkeleton from '@/components/Users/UsersSkeleton';
import { TOrganizationMembersResponse } from '@/types/type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AllUsers = () => {
	const [members, setMembers] =
		useState<TOrganizationMembersResponse['results']>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchOrganizationMembers = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get<TOrganizationMembersResponse>(
					`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/api/organization-members/`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + localStorage.getItem('token'),
						},
					}
				);
				setMembers(data.results);
			} catch (error) {
				console.error('Error fetching organization members:', error);
				toast.error('An Error While Getting Organization Members Occurred!');
			} finally {
				setLoading(false);
			}
		};
		fetchOrganizationMembers();
	}, []);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-sm-12'>
					<div className='card'>
						<CommonCardHeader
							navigate='/users/adduser'
							tittle='All Users'
						/>
						<div className='card-body'>
							<div>
								<div className='table-responsive table-desi'>
									{loading ? (
										<UsersSkeleton />
									) : (
										<AllUsersTable members={members} />
									)}
								</div>
							</div>
						</div>
						<PaginationBox />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
