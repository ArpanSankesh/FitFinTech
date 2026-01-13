import React, { useState } from 'react';
import { FaRulerCombined, FaListUl, FaMale, FaFemale, FaTag } from 'react-icons/fa';

const BodyFatExpense = () => {
  
  // Body Fat (Navy Method - Enhanced)
  const [gender, setGender] = useState('male');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState(''); // Needed for females
  const [height, setHeight] = useState('');
  const [bfResult, setBfResult] = useState(null);
  const [bfCategory, setBfCategory] = useState('');

  const calculateBodyFat = () => {
    if (waist && neck && height && (gender === 'male' || hip)) {
        let val = 0;
        // Formulas (approximate US Navy Method)
        if (gender === 'male') {
            val = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            val = 495 / (1.29579 - 0.35004 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) + 0.22100 * Math.log10(height)) - 450;
        }
        
        const result = val.toFixed(1);
        setBfResult(result);

        // Simple categorization
        if (gender === 'male') {
            if (result < 14) setBfCategory('Athletic');
            else if (result < 25) setBfCategory('Average');
            else setBfCategory('Obese');
        } else {
             if (result < 21) setBfCategory('Athletic');
            else if (result < 32) setBfCategory('Average');
            else setBfCategory('Obese');
        }
    }
  };

  // Expense List
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [category, setCategory] = useState('General');

  const addExp = () => {
    if(desc && amt) {
        setExpenses([{ id: Date.now(), desc, amt: parseFloat(amt), category }, ...expenses]);
        setDesc(''); setAmt('');
    }
  }

  const totalExp = expenses.reduce((acc, curr) => acc + curr.amt, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 my-12 md:my-20">Tracker Suite</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Body Fat Estimator */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-indigo-500">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><FaRulerCombined className="text-indigo-500"/> Body Composition</h2>
             <div className="flex bg-gray-100 rounded-lg p-1">
                <button onClick={() => setGender('male')} className={`px-4 py-1 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${gender==='male' ? 'bg-indigo-500 text-white shadow' : 'text-gray-500'}`}><FaMale /> Men</button>
                <button onClick={() => setGender('female')} className={`px-4 py-1 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${gender==='female' ? 'bg-pink-500 text-white shadow' : 'text-gray-500'}`}><FaFemale /> Women</button>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Waist (cm)</label>
                <input type="number" value={waist} onChange={e=>setWaist(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none" />
            </div>
            <div className="col-span-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Neck (cm)</label>
                <input type="number" value={neck} onChange={e=>setNeck(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none" />
            </div>
            {gender === 'female' && (
                 <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Hip (cm)</label>
                    <input type="number" value={hip} onChange={e=>setHip(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none" />
                </div>
            )}
            <div className="col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Height (cm)</label>
                <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none" />
            </div>
          </div>
          
          <button onClick={calculateBodyFat} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold mb-6 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Calculate Estimates</button>
          
          {bfResult && (
             <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div>
                    <p className="text-sm text-indigo-400 font-bold uppercase">Body Fat</p>
                    <p className="text-4xl font-extrabold text-indigo-700">{bfResult}%</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-indigo-400 font-bold uppercase">Category</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${bfCategory === 'Obese' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {bfCategory}
                    </span>
                </div>
             </div>
          )}
        </div>

        {/* Expense List Tracker */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-rose-500 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><FaListUl className="text-rose-500"/> Quick Expenses</h2>
          
          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
              <div className="flex gap-2 mb-3">
                <input type="text" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} className="flex-1 p-2 border rounded focus:outline-none focus:border-rose-400" />
                <input type="number" placeholder="₹" value={amt} onChange={e=>setAmt(e.target.value)} className="w-24 p-2 border rounded focus:outline-none focus:border-rose-400" />
              </div>
              <div className="flex justify-between items-center">
                  <select value={category} onChange={e=>setCategory(e.target.value)} className="text-sm p-2 bg-white border rounded text-gray-600 focus:outline-none">
                      <option>General</option>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Bills</option>
                  </select>
                  <button onClick={addExp} className="bg-rose-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-600 transition-colors shadow-md shadow-rose-200">Add Entry</button>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-60 pr-2">
            {expenses.map(exp => (
                <div key={exp.id} className="flex justify-between items-center p-3 mb-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">{exp.desc}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaTag size={10}/> {exp.category}</span>
                    </div>
                    <span className="font-bold text-rose-600">₹{exp.amt}</span>
                </div>
            ))}
            {expenses.length === 0 && <div className="text-center py-10 text-gray-400 opacity-50 italic">No transactions yet</div>}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
            <span className="text-gray-500 font-medium">Total Spent</span>
            <span className="text-3xl font-black text-rose-600">₹{totalExp.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BodyFatExpense;