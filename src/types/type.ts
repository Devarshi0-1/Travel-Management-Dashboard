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

export type TGender = 'male' | 'female' | 'other';

export type TRole = {
    id: number;
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
