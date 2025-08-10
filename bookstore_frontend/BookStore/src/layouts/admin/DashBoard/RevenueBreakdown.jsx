import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { FaChartPie } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const COLORS = ['#4f8cff', '#00cec9', '#fdcb6e', '#a29bfe', '#fab1a0'];
const ANIMATION_DURATION = 1400;

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0];
    return (
      <div
        style={{
          background: '#fff',
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          border: `1px solid ${d.color}`,
        }}
      >
        <div style={{ fontWeight: 'bold', color: '#333' }}>{d.name}</div>
        <div style={{ color: d.color }}>
          <FaDollarSign size={10} style={{ marginRight: 4 }} />
          {d.value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

const RevenueBreakdown = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: '28px 24px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        flex: 1,
        minWidth: 360,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <FaChartPie size={20} style={{ color: '#4f8cff', marginRight: 10 }} />
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#2d3436' }}>
          Revenue Breakdown
        </h3>
      </div>

      {/* Pie chart */}
      <div style={{ height: 320, position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              dataKey="value"
              nameKey="label"
              labelLine={true} // 👉 Bật thanh chỉa ra
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              } // 👉 Label ngoài
              animationDuration={ANIMATION_DURATION}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>

        </ResponsiveContainer>

        {/* Tổng tiền giữa biểu đồ */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 13, color: '#888' }}>Total Revenue</div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#2d3436',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <FaDollarSign size={14} />
            {total.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Legend dưới cùng */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginTop: 24,
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: '#2d3436',
              background: '#f9f9f9',
              padding: '6px 12px',
              borderRadius: 10,
              border: `1px solid ${COLORS[i]}33`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 4,
                backgroundColor: COLORS[i],
              }}
            />
            <span style={{ fontWeight: 500 }}>{d.label}</span>
            <span style={{ fontSize: 13, color: '#888' }}>
              ({((d.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RevenueBreakdown;
