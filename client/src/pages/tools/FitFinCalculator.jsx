import React, { useState } from 'react';
import { FaDumbbell, FaMoneyBillWave, FaChartLine, FaArrowRight } from 'react-icons/fa';

const FitFinCalculator = () => {
  // BMI State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiData, setBmiData] = useState(null);

  // Finance State
  const [investment, setInvestment] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [sipData, setSipData] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      
      let status = '';
      let color = '';
      if(bmiValue < 18.5) { status = 'Underweight'; color = 'text-blue-500'; }
      else if(bmiValue < 24.9) { status = 'Normal Weight'; color = 'text-green-500'; }
      else if(bmiValue < 29.9) { status = 'Overweight'; color = 'text-orange-500'; }
      else { status = 'Obese'; color = 'text-red-500'; }

      setBmiData({ value: bmiValue, status, color });
    }
  };

  const calculateReturns = () => {
    if (investment && rate && years) {
      const i = rate / 100 / 12; 
      const n = years * 12;
      
      const fv = investment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const investedAmount = investment * n;
      const wealthGained = fv - investedAmount;

      setSipData({
          invested: investedAmount.toFixed(0),
          gain: wealthGained.toFixed(0),
          total: fv.toFixed(0)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 font-sans">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 md:my-20 my-12">Life Metrics</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* BMI Calculator */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-3 bg-teal-100 rounded-lg text-teal-600"><FaDumbbell size={24} /></div>
            <h2 className="text-2xl font-bold text-gray-800">BMI Check</h2>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-bold text-gray-400 ml-1">WEIGHT (KG)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-gray-700" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-400 ml-1">HEIGHT (CM)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-gray-700" />
                 </div>
            </div>

            <button onClick={calculateBMI} className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all">Analyze Health</button>
            
            {bmiData && (
              <div className="mt-6 p-6 bg-teal-50 rounded-2xl border border-teal-100 text-center animate-fade-in">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Your Result</p>
                <p className="text-5xl font-black text-teal-800 my-2">{bmiData.value}</p>
                <p className={`text-lg font-bold ${bmiData.color} flex justify-center items-center gap-2`}>
                    {bmiData.status}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Investment Calculator */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
           <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><FaMoneyBillWave size={24} /></div>
            <h2 className="text-2xl font-bold text-gray-800">SIP Predictor</h2>
          </div>

          <div className="space-y-4">
            <div>
                 <label className="text-xs font-bold text-gray-400 ml-1">MONTHLY (₹)</label>
                 <input type="number" value={investment} onChange={e => setInvestment(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                     <label className="text-xs font-bold text-gray-400 ml-1">RETURN (%)</label>
                     <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                     <label className="text-xs font-bold text-gray-400 ml-1">YEARS</label>
                     <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>

            <button onClick={calculateReturns} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2">
                Calculate Growth <FaChartLine />
            </button>
            
            {sipData && (
              <div className="mt-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">Invested</span>
                    <span className="font-bold text-gray-700">₹{parseInt(sipData.invested).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <span className="text-green-600 text-sm font-bold">Wealth Gained</span>
                    <span className="font-bold text-green-600">+₹{parseInt(sipData.gain).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                     <span className="text-gray-800 font-bold">Total Value</span>
                     <span className="text-2xl font-black text-blue-700">₹{parseInt(sipData.total).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FitFinCalculator;