export type TMember = {
	id: number;
	organization: number;
	user: {
		id: number;
		email: string;
		userprofile: {
			first_name?: string;
			last_name?: string;
			ph_number?: string;
			dob?: string;
			gender?: 'male' | 'female' | 'other';
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

export type TOrganizationMembersResponse = {
	count: number;
	next: null;
	previous: null;
	results: TMember[];
};
