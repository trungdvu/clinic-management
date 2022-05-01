import { WomanOutlined } from '@ant-design/icons';
import { Empty, Row } from 'antd';
import { BackToTop, Text } from 'components';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { defaultLayoutVariants } from 'utils';

interface Props {
  title?: string;
}

const DashboardPageContainer = ({ title }: Props): JSX.Element => {
  useTitle(title);

  return (
    <motion.div
      variants={defaultLayoutVariants}
      initial="initial"
      animate="animate"
      className="flex flex-row gap-3 mb-10"
    >
      <div className="flex flex-col w-2/3">
        <div className="flex flex-col justify-center w-full gap-1">
          <Text className="text-xs font-medium text-typo-tertiary">SUMMARY FOR TODAY</Text>
          <div className="flex items-center justify-center gap-20 px-10 py-5 bg-white rounded-md shadow-sm">
            <div className="flex flex-col items-center">
              <Text className="font-light text-center text-typo-tertiary whitespace-nowrap">
                PENDING MEDICAL BILLS
              </Text>
              <Text className="py-2 text-4xl font-bold">12</Text>
            </div>
            <div className="flex flex-col items-center">
              <Text className="font-light text-center whitespace-nowrap text-typo-tertiary">
                ACTIVE MEDICAL BILLS
              </Text>
              <Text className="py-2 text-4xl font-bold ">106</Text>
            </div>
            <div className="flex flex-col items-center">
              <Text className="font-light text-center whitespace-nowrap text-typo-tertiary">
                COMPLETED MEDICAL BILLS
              </Text>
              <Text className="py-2 text-4xl font-bold">16</Text>
            </div>
          </div>
        </div>
        <div className="w-full gap-1 mt-10">
          <Text className="text-xs font-medium text-typo-tertiary">TODAY'S PATIENTS</Text>
          <div className="px-5 py-5 bg-white rounded-md shadow-sm">
            <Text className="text-typo-tertiary">All my patients today.</Text>
            <div className="flex flex-col min-h-[720px] gap-2 mt-2">
              {/* Content goes here */}

              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-line-secondary">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-typo-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-typo-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 gap-1">
        <Text className="w-full text-xs font-medium text-typo-tertiary">NOTIFICATIONS</Text>
        <div className="w-full px-5 py-5 bg-white rounded-md shadow-sm">
          <Text className="text-typo-tertiary">
            You could dismiss notification to remove from this view.
          </Text>
          <div className="flex flex-col mt-2 h-[560px] overflow-auto">
            <Empty description="Empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            {/* Content goes here */}
          </div>
        </div>
      </div>
      <BackToTop />
    </motion.div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const DashboardPage = connect(mapState, mapDispatch)(DashboardPageContainer);
