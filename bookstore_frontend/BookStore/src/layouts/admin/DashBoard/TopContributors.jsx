import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FaChartBar } from 'react-icons/fa';

const TopContributors = ({ data }) => {
  return (
    <div style={{
      flex: 1,
      padding: '32px 28px 28px 28px',
      borderRadius: '28px',
      background: 'linear-gradient(135deg, #e3f0ff 60%, #f8fcff 100%)',
      boxShadow: '0 8px 32px #4f8cff22, 0 2px 8px #00000009',
      minHeight: 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      position: 'relative',
      overflow: 'hidden',
      border: 'none'
    }}>
      {/* Animated background circle */}
      <div style={{
        position: 'absolute',
        right: -60,
        top: -60,
        width: 180,
        height: 180,
        background: 'linear-gradient(135deg, #4f8cff 0%, #38b6ff 100%)',
        borderRadius: '50%',
        opacity: 0.10,
        zIndex: 0,
        filter: 'blur(0px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <h4 style={{
        fontWeight: 800,
        color: '#2563eb',
        marginBottom: 18,
        letterSpacing: 0.5,
        alignSelf: 'flex-start',
        fontSize: 22,
        display: 'flex',
        alignItems: 'center',
        zIndex: 1
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f8cff 0%, #38b6ff 100%)',
          borderRadius: '50%',
          width: 38,
          height: 38,
          marginRight: 12,
          boxShadow: '0 4px 16px #4f8cff33'
        }}>
          <FaChartBar style={{ color: '#fff', fontSize: 20 }} />
        </span>
        Top Revenue Contributors
      </h4>

      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="username" fontSize={14} tick={{ fill: '#2563eb', fontWeight: 600 }} />
            <YAxis fontSize={13} tickFormatter={v => `$${v / 1000}k`} tick={{ fill: '#2563eb', fontWeight: 600 }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, background: '#fff', border: '1px solid #e3f0ff', fontWeight: 600 }}
              formatter={v => `$${v.toLocaleString()}`}
              labelFormatter={label => `Người dùng: ${label}`}
            />
            <Legend iconType="circle" wrapperStyle={{ fontWeight: 700, color: '#2563eb' }} />
            <Bar
              dataKey="revenue"
              fill="url(#barGradient)"
              name="Revenue"
              barSize={36}
              radius={[12, 12, 0, 0]}
              label={{ position: 'top', fill: '#2563eb', fontWeight: 700, fontSize: 14 }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8cff" />
                <stop offset="100%" stopColor="#38b6ff" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginTop: 32,
          color: '#aaa',
          zIndex: 1
        }}>
          <span style={{ fontSize: 38, color: '#4f8cff' }}>No Data</span>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
            Chưa có dữ liệu doanh thu.
          </div>
        </div>
      )}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-18px);}
        }
      `}</style>
    </div>
  );
};

export default TopContributors;