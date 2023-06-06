import Add from '@carbon/icons-react/lib/Add';
import Folders from '@carbon/icons-react/lib/Folders';
import Help from '@carbon/icons-react/lib/Help';
import ListChecked from '@carbon/icons-react/lib/ListChecked';
import Notification from '@carbon/icons-react/lib/Notification';
import Receipt from '@carbon/icons-react/lib/Receipt';
import Search from '@carbon/icons-react/lib/Search';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import RoundedButton from '@/components/Button/RoundedButton';
import Elevations from '@/components/Elevations';
import Menu from '@/components/Menu';

import { useAppSelector } from '@/app/hooks';
import { selectSideNav, setSideNav } from '@/features/sideNavSlice';

import s from './SideNav.module.scss';

type SideNavProps = {
  items: SideNavItems;
};

type SideNavItems = {
  topPages?: MenuItemProps[];
  bottomPages?: MenuItemProps[];
  companyName: string;
  companyLogo?: string;
  companyUrl?: string;
  isCollapsed?: boolean;
  canToggle?: boolean;
  firstName: string;
  lastName: string;
  userAvatar?: string;
  isFixed?: boolean;
  role?: 'client' | 'manager' | 'admin' | null;
  designRequestEnabled?: boolean;
  navPopUp?: any[];
  userPopUp?: any[];
};

type MenuItemProps = {
  id: string;
  label: string;
  action?: string;
  icon: React.ReactNode;
  counter?: number;
  link?: string;
};

const SideNav = ({ items }: SideNavProps) => {
  const { data: session }: any = useSession();
  const dispatch = useDispatch();
  const navData = useAppSelector(selectSideNav).data;
  const { isCollapsed } = navData;

  const [activeLink, setActiveLink] = useState('');
  const router = useRouter();

  const onItemClick = (id: string, link?: string) => {
    setActiveLink(id);
    /*to update once pages are available */
    if (link) {
      router.push(link);
    } else {
      router.push(`/account/#`);
    }
  };

  const Icon = (icon: any) => {
    switch (icon.icon) {
      case 'checked':
        return <ListChecked />;
      case 'folder':
        return <Folders />;
      case 'notification':
        return <Notification />;
      case 'search':
        return <Search />;
      case 'help':
        return <Help />;
      case 'receipt':
        return <Receipt />;
      default:
        return <></>;
    }
  };

  const userPopUpItems = items?.userPopUp?.length ? items.userPopUp.map(d => {
    if (d.action === 'toggleSideNav') {
      return {
        ...d,
        label: isCollapsed ? "Expand Menu" : "Collapse Menu",
        onItemClick: () => dispatch(setSideNav({ ...navData, ...{ isCollapsed: !isCollapsed } }))
      }
    }
    if (d.action === 'logout') {
      return {
        ...d,
        onItemClick: () => signOut()
      }
    }
    return d;
  }) : [];

  return (
    <div
      className={clsx(s.SideNav,
        isCollapsed ? s.SideNavCollapsed : s.SideNavDefault,
        items.isFixed && 'fixed'
      )}
    >
      <div className={s.branding} >
        <Avatar mode='initials'>P</Avatar>
        {items.navPopUp && (
          <Elevations dp='00' className={s.popupContainer}>
            <Menu items={items.navPopUp} />
          </Elevations>
        )}
        {!isCollapsed && <span>Company Name</span>}
      </div>
      {items.designRequestEnabled && (
        <div className={s.designBtn}>
          {!isCollapsed ? (
            <Button
              style='link'
              size='lg'
              widthSizing='hug'
              darkMode={true}
              selected
            >
              <Add size={20} /> Design Request
            </Button>
          ) : (
              <RoundedButton
                style='link'
                size='lg'
                widthSizing='hug'
                darkMode={true}
                selected
              >
                {' '}
                <Add size={20} />{' '}
              </RoundedButton>
            )}
        </div>
      )}

      <div className={s.navlist}>
        <ul>
          {items.topPages &&
            <div className={s.topList}>
              {items.topPages.map((tpage, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => onItemClick(tpage.id, tpage.link)}
                    className={clsx(activeLink == tpage.id && 'selected')}
                  >
                    <Icon icon={tpage.icon} />
                    {!isCollapsed && <span>{tpage.label}</span>}
                    {tpage.counter && (
                      <div className={s.counter}>{tpage.counter}</div>
                    )}
                  </li>
                );
              })}
            </div>
          }
          {!isCollapsed && (
            <div className={s.bottomList}>
              {items.bottomPages &&
                items.bottomPages.map((bpage, key) => {
                  return (
                    <li
                      key={key}
                      onClick={() => onItemClick(bpage.id, bpage.link)}
                      className={clsx(activeLink == bpage.id && 'selected')}
                    >
                      <Icon icon={bpage.icon} />
                      <span>{bpage.label}</span>
                    </li>
                  );
                })}
            </div>
          )}
        </ul>
      </div>
      <div className={s.user}>
        <Avatar mode='initials'>PREV</Avatar>
        {items.userPopUp && (
          <Elevations dp='00' className={s.popupContainer}>
            <Menu items={userPopUpItems} />
          </Elevations>
        )}
        {!isCollapsed && <span>Paul Valenzuela</span>}
      </div>
    </div>
  );
};

export default SideNav;
