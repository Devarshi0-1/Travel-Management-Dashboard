import DynamicFeatherIcon from '@/Common/DynamicFeatherIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideBarInterFace } from './SideBarInterFace';

const Menulist = ({
	menu,
	setActiveMenu,
	activeMenu,
	level,
	className,
}: SideBarInterFace) => {
	const ActiveNavLinkUrl = (path: any, active: any = 0) => {
		const pathname = usePathname();
		return pathname === path ? (active ? active : true) : '';
	};

	return (
		<>
			{menu.map((item, i) => (
				<li
					key={i}
					className={`${className ? '' : 'sidebar-list'} ${
						(item.menu
							? item.menu
									.map((innerItem) => ActiveNavLinkUrl(innerItem.url))
									.includes(true)
							: ActiveNavLinkUrl(item.url)) || activeMenu[level] === item.title
							? 'active'
							: ''
					} `}>
					<Link
						className={`${className ? '' : 'sidebar-link sidebar-title'}  ${
							(item.menu
								? item.menu
										.map((innerItem) => ActiveNavLinkUrl(innerItem.url))
										.includes(true)
								: ActiveNavLinkUrl(item.url)) ||
							activeMenu[level] === item.title
								? 'active'
								: ''
						}`}
						href={item?.url ? item.url : '#javascript'}
						onClick={() => {
							const temp = activeMenu;
							temp[level] = item.title !== temp[level] && item.title;
							setActiveMenu([...temp]);
						}}>
						{item.icon && <DynamicFeatherIcon iconName={item.icon} />}
						<span>{item.title}</span>
						{item.menu && (
							<div className='according-menu'>
								<i className='fa fa-angle-right' />
							</div>
						)}
					</Link>
					{item.menu && (
						<ul className='sidebar-submenu'>
							<Menulist
								menu={item.menu}
								activeMenu={activeMenu}
								setActiveMenu={setActiveMenu}
								level={level + 1}
								className='sidebar-submenu'
							/>
						</ul>
					)}
				</li>
			))}
			{/* {
                menu.map((mainMenu, i) => (
                    <li className={`${level === 0 ? 'sidebar-list' : ''}`} key={i}>
                        <>
                            <Link
                                href={mainMenu?.path ? layoutName ? (mainMenu.path + `?layout=${layoutName.toLowerCase()}`) : mainMenu.path : layoutName ? (`?layout=${layoutName.toLowerCase()}#javascript`) : '#javascript'}
                                className={`${level === 0 ? 'sidebar-link sidebar-title' : ''} ${level / 2 !== 0 ? 'submenu-title' : ''} ${activeMenu[level] === mainMenu.title ? "active" : ""}`}
                                onClick={(e) => {
                                    const temp = activeMenu;
                                    temp[level] = temp[level] !== mainMenu.title && mainMenu.title;
                                    setActiveMenu([...temp]);
                                }}>
                                {mainMenu.icon &&
                                    <>
                                        <SvgIcon className='stroke-icon' iconId={`stroke-${mainMenu.icon}`} />
                                        <SvgIcon className='fill-icon' iconId={`fill-${mainMenu.icon}`} />
                                    </>}
                                {level === 0 ? <span>{t(`${mainMenu.title}`)}</span> : t(`${mainMenu.title}`)}
                                {mainMenu.badge ? <label className={mainMenu.badge}>{mainMenu.badgetxt}</label> : ''}
                                {mainMenu.children && (activeMenu[level] === mainMenu.title ? <div className='according-menu'><i className='fa fa-angle-down'></i></div> : <div className='according-menu'><i className='fa fa-angle-right'></i></div>)}
                            </Link>
                            {mainMenu.children && (
                                <ul className={`${level / 2 === 0 ? 'sidebar-submenu' : 'nav-sub-childmenu submenu-content'} ${activeMenu[level] === mainMenu.title ? 'd-block' : 'd-none'}`}>
                                    <Menulist menu={mainMenu.children} level={level + 1} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
                                </ul>
                            )}
                        </>
                    </li>
                ))
            } */}
		</>
	);
};

export default Menulist;
