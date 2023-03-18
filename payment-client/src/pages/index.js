import Page from 'layout/page-auth';
import { useMainContext } from 'context/main';

import Banks from 'components/banks';
import BankDetails from 'components/bank-details';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function Home() {
  const { ctx } = useMainContext();

  const overviewData = [
    {
      title: 'Gross volume',
      value: '£278.96',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 178 }, { uv: 278 }, { uv: 60 }, { uv: 178 }, { uv: 278 }, { uv: 60 }],
    },

    {
      title: 'New customers',
      value: '12',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 278 }, { uv: 0 }],
    },
    {
      title: 'Net volume from sales',
      value: '£278.96',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 178 }, { uv: 278 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }],
    },
    {
      title: 'Successful payments',
      value: '12',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 178 }, { uv: 278 }, { uv: 60 }, { uv: 178 }, { uv: 278 }, { uv: 60 }],
    },
    {
      title: 'Spend per customer',
      value: '£278.96',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 178 }, { uv: 0 }, { uv: 0 }, { uv: 178 }, { uv: 278 }, { uv: 0 }],
    },
    {
      title: 'Dispute activity',
      value: '0%',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 178 }, { uv: 278 }, { uv: 60 }],
    },
    {
      title: 'Dispute count',
      value: '0',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }],
    },
    {
      title: 'High risk payments',
      value: '0',
      createdAt: 'Jul 2021',
      endAt: 'Jul 2022',
      chartData: [{ uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }],
    },
  ];

  return (
    <Page>
      <section className="container mx-auto px-2">
        {/* {!ctx.user?.banks && <BankDetails />} */}

        <div className="grid grid-cols-4">
          <Banks banks={ctx.user?.banks} />
        </div>
      </section>

      <section className="my-[30px]">
        <div className="container mx-auto px-2">
          <h2 className="font-semibold text-[25px] mb-[10px]">Today</h2>

          <div className="flex">
            <div className="w-[70%]">
              <ChartCard
                {...{
                  title: 'Gross volume',
                  value: '0',
                  createdAt: 'Jul 2021',
                  endAt: 'Jul 2022',
                  chartData: [{ uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }, { uv: 0 }],
                }}
              />
            </div>

            <div className="w-[30%] flex flex-col">
              <OverviewCards title="GBP Balance" value="£278.96" />
              <OverviewCards title="Payouts" value="....." />
            </div>
          </div>
        </div>
      </section>

      <section className="my-[30px]">
        <div className="container mx-auto px-2">
          <h2 className="font-semibold text-[25px] mb-[10px]">Reports overview</h2>

          <div className="grid grid-cols-4">
            {overviewData.map((el, idx) => {
              return <ChartCard key={idx} {...el} />;
            })}
          </div>
        </div>
      </section>
    </Page>
  );
}

const ChartCard = ({ title, chartData, value, createdAt, endAt }) => {
  return (
    <div className="pt-[16px] px-[15px] pb-[8px] overflow-hidden shadow-[inset_0_0_0_1px_#ebeef1]">
      <h3 className="text-[#404452] text-[14px] font-medium">{title}</h3>
      <p className="text-[16px] font-normal text-[#404452]">{value}</p>

      <div className="w-full h-[50px] my-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
            data={chartData}>
            <Tooltip />
            <Line dot={false} type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[#6a7383] text-[12px]">{createdAt}</p>
        <p className="text-[#6a7383] text-[12px]">{endAt}</p>
      </div>
    </div>
  );
};

const OverviewCards = ({ title, value, href }) => {
  return (
    <div className="py-[16px] px-[15px] overflow-hidden shadow-[inset_0_0_0_1px_#ebeef1] flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#404452] text-[14px] font-medium">{title}</h3>
          <p className="text-[16px] font-normal text-[#404452]">{value}</p>
        </div>

        <a href={href} className="text-[#404452] hover:text-[#8884d8] inline-block">
          View
        </a>
      </div>
    </div>
  );
};
