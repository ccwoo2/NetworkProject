import React, { useState } from 'react';

//uploaded to github
const SubnetCalculator = () => {
  const [ip, setIp] = useState('');
  const [mask, setMask] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/calculate?ip=${encodeURIComponent(ip)}&mask=${encodeURIComponent(mask)}`);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const text = await response.text();
      console.log('Response text:', text);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('The server response was not valid JSON');
      }

      setResult(data);
      setError('');
    } catch (err) {
      console.error('Error details:', err);
      setError('Error calculating subnet: ' + err.message);
      setResult(null);
    }
  };

  return (
    <div style={styles.subnetCalculator}>
      <h2 style={styles.h2}>IPv4 Subnet Calculator</h2>
      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          placeholder="IP Address (e.g., 192.168.1.1)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Subnet Mask (e.g., 255.255.255.0)"
          value={mask}
          onChange={(e) => setMask(e.target.value)}
        />
        <button style={styles.button} onClick={calculate}>Calculate</button>
      </div>
      
      {error && (
        <div style={styles.errorMessage}>{error}</div>
      )}
      
      {result && (
        <div style={styles.result}>
          <p><strong>Network Address:</strong> {result.network_address}</p>
          <p><strong>Broadcast Address:</strong> {result.broadcast_address}</p>
          <p><strong>Number of Hosts:</strong> {result.number_of_hosts}</p>
          <p><strong>Usable Host Range:</strong> {result.usable_host_range}</p>
          <p><strong>Subnet Mask:</strong> {result.subnet_mask}</p>
          <p><strong>Wildcard Mask:</strong> {result.wildcard_mask}</p>
          <p><strong>Binary Subnet Mask:</strong> {result.binary_subnet_mask}</p>
          <p><strong>CIDR Notation:</strong> {result.cidr_notation}</p>
          <p><strong>Network Class:</strong> {result.network_class}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  // ... styles remain the same
};

export default SubnetCalculator;