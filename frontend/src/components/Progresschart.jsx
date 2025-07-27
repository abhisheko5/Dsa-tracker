import react from 'react';
import {LineChart,Line,CartesianGrid,XAxis,YAxis,Legend,Tooltip} from 'recharts';

const data=[{name:'two pointer',uv:400, pv:2400, amt:10},
  {name:'sliding window',uv:400, pv:2400, amt:20},
  {name:'binary',uv:400, pv:2400, amt:4},
  {name:'queue',uv:400, pv:2400, amt:7},
  {name:'stack',uv:400, pv:2400, amt:6},
  {name:'recursion',uv:400, pv:2400, amt:13}


];

const MyChart=()=>{
  return(
  <LineChart width={600} height={300} data={data} margin={{top:5, right:20, botton:5, left:0}}>
    <CartesianGrid stroke="#8884d8" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="amt" stroke="purple" strokeWidth={2} name="Problem Solved" />
    <XAxis dataKey="name"/>
    <YAxis/>
   <Legend align="right" />
    <Tooltip />
  </LineChart>
  )
}

function Progressbar(){
  return(

    <div className="text-blue-500">
      <MyChart/>
      <h1>bdbhyuavbcshjabshb</h1>
    </div>
  )

}

export default Progressbar;