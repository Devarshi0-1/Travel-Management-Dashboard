'use client';
import { ImagePath } from '@/utils/Constant';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { MENUITEMS } from './MenuItems';
import MenuList from './SideBarItems';

const SideBarMenus = () => {
	const [isOpen, setIsOpen] = useState([]);
	const [activeMenu, setActiveMenu] = useState([]);

	const pathname = usePathname();
	// const [active, setActive] = useState(pathname ? pathname : "");
	// const [prev, setPrev] = useState<number>(0);
	// const handleOpen = (title : string, level: number=0) => {
	//   if (active.includes(title)) {
	//     if (active.includes("/")) {
	//       const activeString = active.split("/");
	//       if (activeString[0] === "") {
	//         activeString.splice(level + 1, activeString.length - 1);
	//         setPrev(prev - 1);
	//       } else {
	//         activeString.splice(level, activeString.length - 1);
	//         setPrev(prev - 1);
	//       }
	//       setActive(activeString.join("/"));
	//     } else {
	//       setActive("");
	//     }
	//   } else if (active && level > prev) {
	//     const concatString = active.concat(`/${title}`);
	//     setActive(concatString);
	//     setPrev(level);
	//   } else {
	//     setActive(title);
	//     setPrev(level);
	//   }
	// };
	return (
		<div id='sidebar-menu'>
			<ul className='sidebar-links'>
				<SimpleBar style={{ maxHeight: 300 }}>
					<li className='back-btn'>
						<Link
							href='/'
							className='active'>
							<Image
								height={34}
								width={120}
								className='img-fluid'
								src={`${ImagePath}/logo/logo-icon.png`}
								alt=''
							/>
						</Link>
						<div className='mobile-back text-end'>
							<span>Back</span>
							<i className='fa fa-angle-right ps-2' />
						</div>
					</li>
					<MenuList
						menu={MENUITEMS}
						activeMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						level={0}
					/>
					{/* <MenuList setActive={setActive} active={active} items={MENUITEMS} level={0} handleOpen={handleOpen}/> */}
				</SimpleBar>
			</ul>
		</div>
	);
};

export default SideBarMenus;
