import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCards from './SummaryCards';
import RevenueChart from './RevenueChart';
import RevenueBreakdown from './RevenueBreakdown';
import GenreInsights from './GenreInsights';
import TopContributors from './TopContributors';
import axios from 'axios';
import RequireAdmin from '../RequireAdmin';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const chartColors = ['#4f8cff', '#43e97b', '#f7971e', '#a770ef', '#ff6b6b', '#6dd5ed'];
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error('Fetch dashboard error', err);
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <Header userName={'Admin'} />

        <SummaryCards
          summary={{
            totalRevenue: data.totalRevenue,
            activeUsers: data.activeUsers,
            monthlyGrowth: data.monthlyRevenueGrowth,
            avgRevenuePerUser: data.averageRevenuePerUser,
          }}
        />

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {/* <RevenueChart data={data.monthlyRevenueChart} /> */}
          <RevenueChart
            data={[
              { month: 1, revenue: 12000 },
              { month: 2, revenue: 18000 },
              { month: 3, revenue: 15000 },
              { month: 4, revenue: 22000 },
              { month: 5, revenue: 27000 },
              { month: 6, revenue: 30000 },
              { month: 7, revenue: 25000 },
              { month: 8, revenue: 32000 },
              { month: 9, revenue: 28000 },
              { month: 10, revenue: 31000 },
              { month: 11, revenue: 29000 },
              { month: 12, revenue: 35000 },
            ]}
          />
          {/* <RevenueBreakdown
            data={data.monthlyRevenueChart.map((item, idx) => ({
              label: `Tháng ${item.month}`,
              value: item.revenue,
              color: chartColors[idx % chartColors.length],
            }))}
          /> */}
          <RevenueBreakdown
            data={[
              { label: 'Libraries', value: 55000 },
              { label: 'Bookstores', value: 35000 },
              { label: 'Penalties', value: 10000 },
            ]}
          />




        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <GenreInsights genreInsights={data.genrePopularity} />
          <TopContributors data={data.topUserRevenue} />

        </div>
      </div>
    </div>
  );
};

const AdminDashboard = RequireAdmin(Dashboard);
export default AdminDashboard;
