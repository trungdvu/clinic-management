import { Skeleton } from 'antd';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const SkeletonListing = ({ className }: Props) => {
  return (
    <div className={classNames('flex flex-col gap-2 mt-5', className)}>
      <Skeleton.Button active={true} className="h-14 w-56" />
      <Skeleton.Button active={true} className="h-14" block={true} />
      <Skeleton.Button active={true} className="h-14" block={true} />
    </div>
  );
};
