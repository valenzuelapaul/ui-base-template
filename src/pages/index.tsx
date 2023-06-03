import * as React from 'react';
import Link from 'next/link';

import Container from '@/components/layouts/Container';
import KitchenSinkLayout from '@/components/layouts/KitchenSinkLayout';

import components from "./kitchen-sink/links-components.json";

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4'>Peregrine Base UI Template</h1>
            <p className='mt-2 text-sm text-gray-700'>
              <ArrowLink href='https://paulreggieevalenzuela.github.io/'>
                See the repository
              </ArrowLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='light'>
              See all components
            </ButtonLink>

            <div className='flex flex-col gap-5'>
              <h3 className='mb-3'>Components:</h3>
              {
                components.components.map((component) => {
                  return <Link key={component.label} href={component.link}>{component.label}</Link>
                })
              }
            </div>

            <UnstyledLink
              href='https://paulreggieevalenzuela.github.io/'
              className='mt-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              />
            </UnstyledLink>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://paulreggieevalenzuela.github.io/'>
                Paul Reggie Valenzuela
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
