import { RiWifiOffLine } from 'react-icons/ri';


/**
 * 網路斷線提示
 * @function OfflineMessage
 */
export default function OfflineMessage() {
  return (
    <div
      className='pt-1 flex flex-col items-center justify-center gap-2'
      data-testid='offline-message-container'
    >
      <RiWifiOffLine
        className='text-5xl'
      />
      <span className='text-sm'>
        Check your internet connection
      </span>
    </div>
  )
}