import react from 'react';
import {PieChart,Pie,Tooltip,Cell } from 'recharts';


const data=[
  {name:'completed',progress:70, },
  {name:'remaining',progress:30, }

];


const DonutChart=()=>{
  return(
    <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
        ></Pie>
  </PieChart>

  )
}

function (){
  return(

    <div className="text-blue-500">
      <DonutChart/>
      <h1>bdbhyuavbcshjabshb</h1>
    </div>
  )

}
export default Progressbar;