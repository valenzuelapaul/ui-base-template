import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import s from './layouts.module.scss';

import Container from '@/components/layouts/Container';
import Main from '@/components/layouts/Main';
import Loading from '@/components/Loading';
import Seo from '@/components/Seo';
import TitleBar from '@/components/TitleBar';
import mockData from '@/components/SideNav/side-nav-data.json';


export default function AccountLayout({
  children,
  className,
  mainBGColor,
  title,
  header,
}: {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  mainBGColor?: string;
  title?: string;
}) {
  const [isLoading, setLoading] = useState<boolean>(false);
  // const { data: session }: any = useSession();
  const dispatch = useDispatch();
  // TODO: set currentCompanyId to actual company ID based on clientInfo state

  // useEffect(() => {
  //   const firstName = session?.user?.first_name || 'John',
  //     lastName = session?.user?.last_name || 'Doe',
  //     fullName = session?.user?.name || 'John doe';
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session]);

  const mainStyle = clsx({ '--white': mainBGColor === 'white' });

  return (
    <div className={`${s.Profile} ${className}`}>
      <Seo
        templateTitle='Profile'
        description='Profile pages and sub pages'
      />
      {/* <SideNav /> */}
      {header && header}
      <Main className={mainStyle}>
        {title && <TitleBar title={title} />}
        <Container>
          {isLoading ?
            <Loading />
            :
            children
          }
        </Container>
      </Main>
    </div>
  );
}
