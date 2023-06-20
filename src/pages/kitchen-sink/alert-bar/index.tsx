import s from './page.module.scss';

import Alertbar from '@/components/AlertBar';
import KitchenSinkLayout from '@/components/layouts/KitchenSinkLayout';
import TitleBar from '@/components/TitleBar';

export default function PageAlertBar() {
  return (
    <KitchenSinkLayout className={s.Page}>
      <TitleBar
        title='Alert Bar'
        description='Different kind of notifications to alert you.'
      />
      <Alertbar
        className='mt-5'
        title='Info'
        subTitle={
          <span>
            Notification message. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt consectetur.{' '}
            <a>Click here</a>
          </span>
        }
      />
      <Alertbar
        className='mt-5'
        kind='success'
        title='Success'
        subTitle={
          <span>
            Success notification. <a>Click here</a>
          </span>
        }
      />
      <Alertbar
        className='mt-5'
        kind='error'
        title='Error'
        subTitle={
          <span>
            Error notification. <a>Click here</a>
          </span>
        }
      />

      <Alertbar className='mt-10' title='Notification Message' size='small' />
      <Alertbar
        className='mt-5'
        kind='success'
        title='Notification Message'
        size='small'
      />
      <Alertbar
        className='mt-5'
        kind='error'
        title='Notification Message'
        size='small'
      />
    </KitchenSinkLayout>
  );
}
