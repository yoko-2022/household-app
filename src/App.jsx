/* eslint-disable no-undef */
import './index.css';
import { useState } from 'react';

export default function App() {
  /* グローバル変数 */
  const [currentTab, setCurrentTab] = useState('tabIncome');
  const [selectedItem, setSelectedItem] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const incomeItems = ['給料', 'ボーナス', '投資'];
  const expenseItems = ['食費', '家賃', '光熱費'];

  /* 収入・支出のタブの切り替え */
  const switchIncomeTab = () => {
    if (currentTab === 'tabIncome') {
      return;
    }
    setCurrentTab(currentTab === 'tabIncome' ? 'tabExpense' : 'tabIncome');
  };

  const switchExpenseTab = () => {
    if (currentTab === 'tabExpense') {
      return;
    }
    setCurrentTab(currentTab === 'tabIncome' ? 'tabExpense' : 'tabIncome');
  };

  /* 選択された項目の取得 */
  const addItem = (selectItem) => {
    setSelectedItem(selectItem); /* 項目を配列に入れないバージョン */
  };

  /* 項目と金額をテーブルに追加 */
  const addTransaction = () => {
    const newTransactions = {
      id: transactions.length + 1,
      date: date,
      description:
        selectedItem /* itemNameが配列なのでクリックした分だけ表示されてしまうため変更 */,
      amount: parseFloat(amount),
      memo: memo,
    };
    setDate('');
    setAmount('');
    setMemo('');
    setTransactions([...transactions, newTransactions]);
    setTotalAmount(totalAmount + parseFloat(amount)); /* 合計金額 */
    setSelectedItem('');
  };

  /* テーブルからの削除 */
  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
    setTotalAmount(
      totalAmount - parseFloat(amount)
    ); /* 合計金額-削除項目の金額にしたいけどNaNと表示されてしまう… */
  };

  return (
    <>
      <h1>家計簿アプリ</h1>
      <button type='button' onClick={switchIncomeTab}>
        収入
      </button>
      <button type='button' onClick={switchExpenseTab}>
        支出
      </button>
      {currentTab === 'tabIncome' ? (
        <div className='caseInIncome'>
          {incomeItems.map((incomeItem) => (
            <button
              type='button'
              key={incomeItem}
              value={incomeItem}
              onClick={() => addItem(incomeItem)}
            >
              {incomeItem}
            </button>
          ))}
          <form action='income.php' method='post'>
            <input
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <p>選択項目{selectedItem}</p>
            <input type='hidden' value={selectedItem} required />
            <p>金額</p>
            <input
              type='number'
              value={amount}
              min='0'
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              required
            />
            <p>メモ</p>
            <input
              type='text'
              value={memo}
              placeholder='例) 誕生日プレゼント代'
              onChange={(e) => {
                setMemo(e.target.value);
              }}
            />
            <input type='submit' value='追加' onClick={addTransaction} />
          </form>
          <div className='itemList'>
            <h2>収入記録</h2>
            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>項目</th>
                  <th>金額</th>
                  <th>メモ</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transactions, index) => (
                  <tr key={transactions.id}>
                    <td>{transactions.date}</td>
                    <td>{transactions.description}</td>
                    <td>{transactions.amount}</td>
                    <td>{transactions.memo}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => deleteTransaction(index)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>合計金額{totalAmount}円</p>
          </div>{' '}
          {/* /.itemList */}
        </div> /* /.caseInIncome */
      ) : (
        <div className='caseInExpense'>
          {expenseItems.map((expenseItem) => (
            <button
              type='button'
              key={expenseItem}
              value={expenseItem}
              onClick={() => addItem(expenseItem)}
            >
              {expenseItem}
            </button>
          ))}
          <form action='expense.php' method='post'>
            <input
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <p>選択項目{selectedItem}</p>
            {/* (これは選択されたボタンの色を目立つ色に変えるだけでもいいかも) */}
            <input type='hidden' value={selectedItem} required />
            <p>金額</p>
            <input
              type='number'
              value={amount}
              min='0'
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              required
            />
            <p>メモ</p>
            <input
              type='text'
              value={memo}
              placeholder='例) 誕生日プレゼント代'
              onChange={(e) => {
                setMemo(e.target.value);
              }}
            />
            <input type='submit' value='追加' onClick={addTransaction} />
          </form>
          <div className='itemList'>
            <h2>支出記録</h2>
            <table>
              <thead>
                <tr>
                  <th>日付</th>
                  <th>項目</th>
                  <th>金額</th>
                  <th>メモ</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transactions, index) => (
                  <tr key={transactions.id}>
                    <td>{transactions.date}</td>
                    <td>{transactions.description}</td>
                    <td>{transactions.amount}</td>
                    <td>{transactions.memo}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => deleteTransaction(index)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>合計金額{totalAmount}円</p>
          </div>{' '}
          {/* /.itemList */}
        </div> /* /.caseInExpense */
      )}
    </>
  );
}
