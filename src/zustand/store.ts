import { TRole } from '@/types/type';
import { create } from 'zustand';

interface IStore {
	roles: TRole[];
	// Function to set the entire roles array
	setRoles: (roles: TRole[]) => void;
	// Function to get the current roles array
	getRoles: () => TRole[];
}

// Create the zustand store using the RoleStore interface.
// Note: The getRoles function uses the internal get() method to retrieve the current state.
export const useStore = create<IStore>((set, get) => ({
	roles: [],
	setRoles: (roles: TRole[]) => set({ roles }),
	getRoles: () => get().roles,
}));
