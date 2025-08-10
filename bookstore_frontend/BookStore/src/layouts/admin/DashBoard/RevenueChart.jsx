import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FaChartLine, FaDollarSign } from 'react-icons/fa';

const RevenueChart = ({ data }) => {
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div style={{
      flex: 2,
      padding: '28px',
      borderRadius: '18px',
      background: 'linear-gradient(135deg, #ffffff 0%, #eaf6ff 100%)',
      boxShadow: '0 8px 32px rgba(79, 140, 255, 0.12)',
      minHeight: 320,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      border: '1px solid rgba(79, 140, 255, 0.1)'
    }}>
      {/* Tiêu đề */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: 'rgba(79, 140, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
          color: '#4f8cff'
        }}>
          <FaChartLine size={20} />
        </div>
        <div>
          <h4 style={{
            margin: 0,
            fontWeight: 600,
            color: '#2d3436',
            fontSize: 20
          }}>
            Monthly Revenue
          </h4>
          <p style={{
            margin: 0,
            fontSize: 14,
            color: '#636e72',
            opacity: 0.8
          }}>
            Overview for 12 months
          </p>
        </div>

        {/* Tổng doanh thu */}
        <div style={{
          marginLeft: 'auto',
          background: '#4f8cff',
          color: 'white',
          padding: '6px 14px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          fontSize: 14,
          fontWeight: 500,
          gap: 6,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }}>
          <FaDollarSign size={12} />
          {totalRevenue.toLocaleString()}
        </div>
      </div>

      {/* Biểu đồ */}
      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 3" vertical={false} />
            <XAxis dataKey="month" fontSize={13} tick={{ fill: '#333' }} />
            <YAxis fontSize={13} tickFormatter={v => `$${v / 1000}k`} tick={{ fill: '#333' }} />
            <Tooltip
              contentStyle={{ borderRadius: 10, borderColor: '#eee' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f8cff"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#4f8cff' }}
              activeDot={{ r: 6 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ width: '100%', textAlign: 'center', marginTop: 32, color: '#aaa' }}>
          <span style={{ fontSize: 38, color: '#4f8cff' }}>No Data</span>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>Chưa có dữ liệu doanh thu tháng.</div>
        </div>
      )}
    </div>
  );
};

export default RevenueChart;
