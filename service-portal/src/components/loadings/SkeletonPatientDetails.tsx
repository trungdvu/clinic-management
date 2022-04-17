import { Skeleton } from 'antd';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const SkeletonPatientDetails = ({ className }: Props) => {
  return (
    <div className={classNames('', className)}>
      <div className="flex mt-2">
        <Skeleton.Button active={true} className="mt-1 h-32 w-32 rounded-md" />
        <div className="flex flex-col mt-2">
          <Skeleton.Button active={true} className="ml-2 h-8 w-64" />
          <Skeleton.Button active={true} className="mt-1 ml-2 h-4 w-52" />
          <Skeleton.Button active={true} className="mt-1.5 ml-2 h-4 w-80" />
        </div>
      </div>
      <Skeleton.Button active={true} className="h-8 mt-6" block={true} />
      <Skeleton.Button active={true} className="h-8 mt-4" block={true} />
    </div>
  );
};
