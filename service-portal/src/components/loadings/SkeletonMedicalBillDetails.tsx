import { Skeleton } from 'antd';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const SkeletonMedicalBillDetails = ({ className }: Props) => {
  return (
    <div className={classNames('', className)}>
      <Skeleton.Button active={true} className="h-8" block={true} />
      <div className="flex mt-2">
        <Skeleton.Button active={true} className="mt-1 h-32 w-32 rounded-md" />
        <div className="flex flex-col mt-4">
          <Skeleton.Button active={true} className="ml-2 h-8 w-64" />
          <Skeleton.Button active={true} className="mt-2 ml-2 h-8 w-52" />
        </div>
      </div>
    </div>
  );
};
