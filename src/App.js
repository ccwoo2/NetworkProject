import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [subnet1, setSubnet1]=useState("")
  const [subnet2, setSubnet2]=useState("")
  const [subnet3, setSubnet3]=useState("")
  const [subnet4, setSubnet4]=useState("")

  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");

  const [subnetBinary, setSubetbinary] = useState("");
  const [ipBinary, setIpBinary] = useState("");

  const[networkAddress, setNetworkAddress] = useState("")

  const[broadcastAddress, setBroadcastAddress]= useState("")



  const calculate=(e)=>{
    e.preventDefault();
    setSubetbinary((subnet1>>0).toString(2)+"."+(subnet2>>0).toString(2)+"."+(subnet3>>0).toString(2)+"."+(subnet4>>0).toString(2))
    setIpBinary((ip1>>0).toString(2)+"."+(ip2>>0).toString(2)+"."+(ip3>>0).toString(2)+"."+(ip4>>0).toString(2))

    setNetworkAddress((ip1 & subnet1).toString(2)+"."+(ip2 & subnet2).toString(2)+"."+(ip3 & subnet3).toString(2)+"."+(ip4 & subnet4).toString(2))

    console.log("hello")
    console.log(subnetBinary)
    console.log(ipBinary)
    console.log((ip1>>0).toString(2))
    
    let inverted = invertBinaryString(ipBinary)
    console.log(inverted)
  }

  const invertBinarySegment=(segment)=> {
    return segment.split('')
                  .map(bit => bit === '1' ? '0' : '1')
                  .join('');
  }
  
  const invertBinaryString=(binaryString)=> {
    return binaryString.split('.')
                       .map(invertBinarySegment)
                       .join('.');
  }
  
  return (
    <div className="App">
      <form onSubmit={calculate}>
      <label>IP address:  </label>
        <input type='number' onChange={e=>setIp1(e.target.value)}/>
        <label>.</label>
        <input type='number' onChange={e=>setIp2(e.target.value)}/>
        <label>.</label>
        <input type='number' onChange={e=>setIp3(e.target.value)}/>
        <label>.</label>
        <input type='number' onChange={e=>setIp4(e.target.value)}/>
        <br/>

        <label>subnet:   </label>
        <input type="number" onChange={e=>setSubnet1(e.target.value)}/>
        <label>.</label>
        <input type='number' onChange={e=>setSubnet2(e.target.value)}/>
        <label>.</label>
        <input type='number' onChange={e=>setSubnet3(e.target.value)}/>
        <label>.</label><input type='number'onChange={e=>setSubnet4(e.target.value)}/>  
        <br/>


        
        <button type='submit'>input</button>
      </form>
      <div>
        <div>ip binary:{ipBinary}</div>
        <div>subnet Binary: {subnetBinary}</div>
        <div>Network Address: {networkAddress}</div>
        <div>broadcastAddress: {broadcastAddress}</div>
      </div>
    </div>
  );
}

export default App;
