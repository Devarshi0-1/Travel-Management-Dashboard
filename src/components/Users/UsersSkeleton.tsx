'use client';

import { Skeleton } from '@/components/ui/skeleton';

const UsersSkeleton = () => {
	const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

	console.log('Hellow');

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
				{skeletonRows.map((_, index) => {
					const isEven = index % 2 === 0;
					return (
						<tr key={index}>
							<td>
								<span>
									<Skeleton
										className={`tw:h-12 tw:w-12 tw:rounded-full ${
											isEven ? 'tw:invert-25' : ''
										}`}
									/>
								</span>
							</td>
							<td>
								<div className='tw:space-y-2'>
									<Skeleton
										className={`tw:h-4 tw:w-24 ${isEven ? 'tw:invert-25' : ''}`}
									/>
									<Skeleton
										className={`tw:h-4 tw:w-16 ${isEven ? 'tw:invert-25' : ''}`}
									/>
								</div>
							</td>
							<td>
								<Skeleton
									className={`tw:h-4 tw:w-28 ${isEven ? 'tw:invert-25' : ''}`}
								/>
							</td>
							<td>
								<Skeleton
									className={`tw:h-4 tw:w-20 ${isEven ? 'tw:invert-25' : ''}`}
								/>
							</td>
							<td>
								<Skeleton
									className={`tw:h-4 tw:w-32 ${isEven ? 'tw:invert-25' : ''}`}
								/>
							</td>
							<td>
								<Skeleton
									className={`tw:h-4 tw:w-24 ${isEven ? 'tw:invert-25' : ''}`}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UsersSkeleton;
