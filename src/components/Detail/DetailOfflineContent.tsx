import OfflineMessage from '~/components/OfflineMessage';


/**
 * 角色介紹：網路離線
 * @function DetailOfflineContent
 */
export default function DetailOfflineContent() {
  return (
    <div className='min-h-dvh w-dvw flex flex-col items-center justify-center'>
      <OfflineMessage/>
    </div>
  );
}