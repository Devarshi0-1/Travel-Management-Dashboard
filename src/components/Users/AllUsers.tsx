import { formatDate } from '@/lib/utils';
import { TOrganizationMembersResponse } from '@/types/type';
import { ImagePath } from '@/utils/Constant';
import Image from 'next/image';
import { Href } from '../../utils/Constant';

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
								<span className='d-block '>
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
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AllUsersTable;
