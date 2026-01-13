import React, { useState } from 'react';
import { FaAppleAlt, FaWallet, FaTrash, FaHistory } from 'react-icons/fa';

const DailyPlanner = () => {
  // Calorie State
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [foodHistory, setFoodHistory] = useState([]);
  const [foodItem, setFoodItem] = useState('');
  const [foodCal, setFoodCal] = useState('');

  // Budget State
  const [budgetLimit, setBudgetLimit] = useState(1000);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [expenseItem, setExpenseItem] = useState('');
  const [expenseCost, setExpenseCost] = useState('');

  // Derived Totals
  const totalConsumed = foodHistory.reduce((acc, item) => acc + item.cal, 0);
  const totalSpent = expenseHistory.reduce((acc, item) => acc + item.cost, 0);

  const addFood = () => {
    if (foodCal && foodItem) {
      setFoodHistory([...foodHistory, { id: Date.now(), item: foodItem, cal: parseInt(foodCal) }]);
      setFoodItem(''); setFoodCal('');
    }
  };

  const removeFood = (id) => {
    setFoodHistory(foodHistory.filter(item => item.id !== id));
  };

  const addExpense = () => {
    if (expenseCost && expenseItem) {
      setExpenseHistory([...expenseHistory, { id: Date.now(), item: expenseItem, cost: parseInt(expenseCost) }]);
      setExpenseItem(''); setExpenseCost('');
    }
  };

  const removeExpense = (id) => {
    setExpenseHistory(expenseHistory.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <h1 className="text-4xl font-extrabold text-center text-slate-800 my-12 md:my-20 tracking-tight">Daily Dashboard</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Calorie Planner */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2"><FaAppleAlt /> Nutrition</h2>
                <p className="text-slate-400 text-sm mt-1">Goal: {calorieGoal} kcal</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-slate-700">{totalConsumed}</span>
              <span className="text-sm text-slate-400"> / {calorieGoal}</span>
              <p className={`text-sm font-semibold mt-1 ${totalConsumed > calorieGoal ? 'text-red-500' : 'text-green-500'}`}>
                {calorieGoal - totalConsumed} left
              </p>
            </div>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
            <div className={`h-3 rounded-full transition-all duration-500 ${totalConsumed > calorieGoal ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${Math.min((totalConsumed/calorieGoal)*100, 100)}%` }}></div>
          </div>

          <div className="flex gap-3 mb-6">
            <input type="text" placeholder="e.g., Oatmeal" value={foodItem} onChange={e=>setFoodItem(e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <input type="number" placeholder="Kcal" value={foodCal} onChange={e=>setFoodCal(e.target.value)} className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <button onClick={addFood} className="bg-orange-500 text-white px-6 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">+</button>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl p-4 overflow-y-auto max-h-64">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FaHistory /> Today's Log</h3>
            {foodHistory.length === 0 ? <p className="text-center text-slate-300 text-sm py-4">No meals added yet.</p> : 
             foodHistory.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 group">
                    <span className="text-slate-700 font-medium">{item.item}</span>
                    <div className="flex items-center gap-3">
                        <span className="text-orange-600 font-bold text-sm">{item.cal} kcal</span>
                        <button onClick={() => removeFood(item.id)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash size={12} /></button>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Budget Planner */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
             <div>
                <h2 className="text-2xl font-bold text-emerald-600 flex items-center gap-2"><FaWallet /> Wallet</h2>
                <p className="text-slate-400 text-sm mt-1">Budget: ₹{budgetLimit.toLocaleString()}</p>
             </div>
             <div className="text-right">
              <span className="text-3xl font-black text-slate-700">₹{totalSpent.toLocaleString()}</span>
              <p className={`text-sm font-semibold mt-1 ${totalSpent > budgetLimit ? 'text-red-500' : 'text-emerald-500'}`}>
                ₹{(budgetLimit - totalSpent).toLocaleString()} remaining
              </p>
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
            <div className={`h-3 rounded-full transition-all duration-500 ${totalSpent > budgetLimit ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((totalSpent/budgetLimit)*100, 100)}%` }}></div>
          </div>

          <div className="flex gap-3 mb-6">
            <input type="text" placeholder="e.g., Taxi" value={expenseItem} onChange={e=>setExpenseItem(e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            <input type="number" placeholder="₹" value={expenseCost} onChange={e=>setExpenseCost(e.target.value)} className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            <button onClick={addExpense} className="bg-emerald-600 text-white px-6 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">+</button>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl p-4 overflow-y-auto max-h-64">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FaHistory /> Transactions</h3>
            {expenseHistory.length === 0 ? <p className="text-center text-slate-300 text-sm py-4">No expenses today.</p> : 
             expenseHistory.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 group">
                    <span className="text-slate-700 font-medium">{item.item}</span>
                    <div className="flex items-center gap-3">
                        <span className="text-emerald-600 font-bold text-sm">₹{item.cost}</span>
                        <button onClick={() => removeExpense(item.id)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash size={12} /></button>
                    </div>
                </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DailyPlanner;