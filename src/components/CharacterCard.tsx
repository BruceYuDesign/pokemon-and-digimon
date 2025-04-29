import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaQuestion } from 'react-icons/fa';


export interface CharacterCardProps {
  /**
   * 角色的名稱
   */
  name: string;
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
  // 是否有錯誤
  const [hasError, setHasError] = useState(false);


  // 計算是否位於視窗內
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: '100px 0px 100px 0px',
  });


  // 圖片讀取失敗
  const imageOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    setHasError(true);
  }


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
          >
            {/* 圖片 */}
            <div className='h-3/4 flex items-center justify-center'>
              {
                (props.thumbnail && !hasError) ? (
                  // 顯示角色圖片
                  <img
                    className='h-3/4 w-auto object-contain pointer-events-none'
                    src={props.thumbnail}
                    alt={props.name || 'Unknown'}
                    onError={imageOnError}
                  />
                ) : (
                  // 顯示問號
                  <FaQuestion
                    className='w-1/2 h-1/2 opacity-25'
                    style={{
                      color: props.textColor,
                    }}
                  />
                )
              }
            </div>
            {/* 名稱 */}
            <h3
              className='h-1/4 shrink-0 text-center text-xl whitespace-nowrap text-ellipsis overflow-hidden'
              style={{
                color: props.textColor,
              }}
            >
              {props.name || 'Unknown'}
            </h3>
          </div>
        )
      }
    </div>
  );
}