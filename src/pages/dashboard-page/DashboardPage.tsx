import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Empty } from 'antd';
import { WomanOutlined } from '@ant-design/icons';
import { BackToTop, Text } from 'components';
import { useTitle } from 'hooks';

interface DashboardPageProps {
  title?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ title }) => {
  useTitle(title);

  return (
    <div className="flex flex-row gap-3 mb-10">
      <div className="flex flex-col w-2/3">
        <div className="flex flex-col justify-center w-full gap-1">
          <Text className="text-xs font-medium text-tertiary">SUMMARY FOR TODAY</Text>
          <div className="flex items-center justify-center gap-20 px-10 py-5 bg-white rounded-md shadow-sm">
            <div className="flex flex-col items-center">
              <Text className="font-light text-center text-tertiary whitespace-nowrap">
                PENDING BOOKINGS
              </Text>
              <Text className="py-2 text-4xl font-bold">12</Text>
            </div>
            <div className="flex flex-col items-center">
              <Text className="font-light text-center whitespace-nowrap text-tertiary">
                ACTIVE BOOKINGS
              </Text>
              <Text className="py-2 text-4xl font-bold ">121312</Text>
            </div>
            <div className="flex flex-col items-center">
              <Text className="font-light text-center whitespace-nowrap text-tertiary">
                COMPLETED BOOKINGS
              </Text>
              <Text className="py-2 text-4xl font-bold">736</Text>
            </div>
          </div>
        </div>
        <div className="w-full gap-1 mt-10">
          <Text className="text-xs font-medium text-tertiary">BOOKINGS THAT I'M IN CHARGE</Text>
          <div className="px-5 py-5 bg-white rounded-md shadow-sm">
            <Text className="text-tertiary">All my patients.</Text>
            <div className="flex flex-col min-h-[720px] gap-2 mt-2">
              {/* Content goes here */}

              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
              <Row className="flex items-center justify-between px-3 py-5 border-t border-brd">
                <div>
                  <WomanOutlined className="mr-3 text-2xl text-tertiary" />
                  <Text className="font-medium">Jonathan Vu</Text>
                </div>
                <Text>
                  <Text className="text-tertiary">at</Text> 20/10/2022
                </Text>
                <Link to={'#go-to-booking-detail'}>Go to booking</Link>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 gap-1">
        <Text className="w-full text-xs font-medium text-tertiary">NOTIFICATIONS</Text>
        <div className="w-full px-5 py-5 bg-white rounded-md shadow-sm">
          <Text className="text-tertiary">
            You could dismiss notification to remove from this view.
          </Text>
          <div className="flex flex-col mt-2 h-[560px] overflow-auto">
            <Empty description="Empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            {/* Content goes here */}
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};
