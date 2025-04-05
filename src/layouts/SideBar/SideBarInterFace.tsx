export interface SideBarInterFace {
	menu: MenuItem[];
	// setIsOpen:React.Dispatch<React.SetStateAction<string[]>>,
	// isOpen:string[]
	className?: string;
	activeMenu: any;
	setActiveMenu: (temp: any) => void;
	// level: number;
	// handleOpen: (title: string, level: number) => void;
	level: number;
	// active: string | null;
	//  setActive: (value: React.SetStateAction<string>) => void;
}

export interface MenuItem {
	title: string;
	url?: string;
	icon?:
		| 'Home'
		| 'Users'
		| 'Map'
		| 'Briefcase'
		| 'Coffee'
		| 'Navigation'
		| 'Bookmark'
		| 'MessageSquare'
		| 'Settings'
		| 'LogIn'
		| 'PlusCircle';
	type: 'link' | 'sub';
	menu?: MenuItem[];
}
