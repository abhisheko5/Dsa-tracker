import react from 'react';
import {PieChart,Pie,Tooltip,Cell ,Legend} from 'recharts';


const data = [
  { name: 'array', problems:50  },
  { name: 'string', problems: 30 },
  { name: 'tree', problems: 20 },
  { name: 'graph', problems: 13 },
  { name: 'stack', problems: 12 },
  { name: 'queue', problems: 15 },
  { name: 'heap', problems: 7 },
  { name: 'Linked list', problems: 25 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF4D4F','#A020F0',
  '#DAA520','#FF1493','#00CED1'
];



function Donutbar(){
  return(
    <PieChart width={300} height={225}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={4}
        dataKey="problems"
      >
        <Tooltip
  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 6 }}
  formatter={(value, name) => [`${value} problems`, name]}
/>

      
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
        
    </PieChart>
  );
}

export default Donutbar;