import { useInView } from 'react-intersection-observer';
import ImageWithStatus from '~/components/ImageWithStatus';


export interface CharacterCardProps {
  /**
   * 角色的名稱
   */
  name?: string;
  /**
   * 角色的圖片
   */
  thumbnail: string;
  /**
   * 卡片文字顏色
   */
  textColor: string;
  /**
   * 卡片背景顏色
   */
  backgroundColor: string;
  /**
   * 卡片點選事件
   */
  onClick: () => void;
}


/**
 * 角色卡片，卡片會計算是否位於視窗內，決定渲染與否
 * @function CharacterCard
 * @param {CharacterCardProps} props
 */
export default function CharacterCard(props: CharacterCardProps) {
  // 計算是否位於視窗內
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: '100px 0px 100px 0px',
  });


  return (
    <div
      className='aspect-square'
      ref={ref}
    >
      {
        inView && (
          <div
            className='flex flex-col items-stretch px-4 justify-between aspect-square rounded-2xl overflow-hidden cursor-pointer'
            onClick={props.onClick}
            style={{
              backgroundColor: props.backgroundColor,
            }}
            data-testid='character-card-content'
          >
            {/* 圖片 */}
            <ImageWithStatus
              className='h-3/5 my-auto'
              src={props.thumbnail}
              alt={props.name}
            />
            {/* 名稱 */}
            <h3
              className='h-1/4 shrink-0 text-center text-xl whitespace-nowrap text-ellipsis overflow-hidden'
              style={{
                color: props.textColor,
              }}
              data-testid='character-card-name'
            >
              {props.name || 'Unknown'}
            </h3>
          </div>
        )
      }
    </div>
  );
}