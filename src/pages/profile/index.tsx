import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useState, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import s from './page.module.scss';

// Components
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import ProfileLayout from '@/components/layouts/ProfileLayout';
import Header from '@/components/Header';

// Hooks / States
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setProfileData, selectProfileData, initialState } from '@/features/profileSlice';

import data from './profile.json';

type FormValues = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};

const InputRef = forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref}>
      <Input {...props} />
    </div>
  );
});

export default function Profile() {
  const requiredMessage = 'This field is required';
  const [isEditing, setEditing] = useState(false);

  const dispatch = useAppDispatch();;
  const profileData = useAppSelector(selectProfileData).value;

  const values = profileData;

  const validation = yup.object().shape({
    firstName: yup.string().required(requiredMessage),
    lastName: yup.string().required(requiredMessage),
    email: yup
      .string()
      .email('Enter a valid email')
      .required(requiredMessage),
    phone: yup.string().required(requiredMessage),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(validation),
    defaultValues: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setProfileData(data));
    setEditing(false);
  };

  return (
    <ProfileLayout title="Profile Page" header={<Header />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formGroup}>
          {isEditing ? (
            <>
              <InputRef
                width='w-[400px]'
                label='First Name'
                {...register('firstName')}
                messageType={errors.firstName && 'error'}
                messageText={errors.firstName && errors.firstName.message}
              />
              <InputRef
                width='w-[400px]'
                label='Last Name'
                {...register('lastName')}
                messageType={errors.lastName && 'error'}
                messageText={errors.lastName && errors.lastName.message}
              />
            </>
          ) : (
              <>
                <div className={s.formContainer}>
                  <label>First Name</label>
                  <p className={s.formText}>
                    {values.firstName}
                  </p>
                </div>
                <div className={s.formContainer}>
                  <label>Last Name</label>
                  <p className={s.formText}>
                    {values.lastName}
                  </p>
                </div>
              </>
            )}
        </div>
        <div className={s.formGroup}>
          {isEditing ? (
            <>
              <InputRef
                width='w-[400px]'
                label='Email'
                {...register('email')}
                messageType={errors.email && 'error'}
                messageText={errors.email && errors.email.message}
              />
              <InputRef
                width='w-[400px]'
                label='Phone'
                {...register('phone')}
                messageType={errors.phone && 'error'}
                messageText={errors.phone && errors.phone.message}
              />
            </>
          ) : (
              <>
                <div className={s.formContainer}>
                  <label>Email</label>
                  <p className={s.formText}>
                    {values.email}
                  </p>
                </div>
                <div className={s.formContainer}>
                  <label>Phone</label>
                  <p className={s.formText}>
                    <span className="form__text-prefix">(+1)</span>
                    {values.phone}
                  </p>
                </div>
              </>
            )}
        </div>
        <div className={s.cta}>
          {isEditing ? (
            <Fragment>
              <Button
                className={s.ctaCancel}
                style="outline"
                size="lg"
                kind='primary'
                widthSizing='hug'
                onClick={() => {
                  dispatch(setProfileData(initialState.value));
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className={s.ctaSubmit}
                size="lg"
                kind='primary'
                widthSizing='hug'
                type='submit'
              >
                Save
              </Button>
            </Fragment>
          ) : (
              <Button
                className={s.ctaSubmit}
                size="lg"
                kind='primary'
                widthSizing='hug'
                type='submit'
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
        </div>
      </form>

      <h3 className="my-4">Profile State</h3>
      <section>
        {JSON.stringify(profileData)}
      </section>
    </ProfileLayout>
  );
}

/* TODO: after API auth have been finalized, move global page protections in middleware.ts,
for now just copy and paste this to protect a page
*/
// import { getSession } from 'next-auth/react'

// export async function getServerSideProps(context: any) {
//   const session: any = await getSession({ req: context.req });

//   if (session) {
//     return {
//       props: { session }
//     }

//   } else {
//     return {
//       redirect: {
//         destination: `/login?callbackUrl=${context.resolvedUrl}`,
//         permanent: false,
//       }
//     }
//   }
// }