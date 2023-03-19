/* eslint-disable no-undef */
import './index.css';
import { useState } from "react";

export default function App() {
  /* グローバル変数 */
  const [currentTab, setCurrentTab] = useState("tabIncome");
  const [itemName, setItemName] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const incomeItems = ["給料", "ボーナス", "投資"];
  const expenseItems = ["食費", "家賃", "光熱費"];
  
  /* 収入・支出のタブの切り替え */
  const switchIncomeTab = () => {
    if (currentTab === "tabIncome") {
      return;
    }
    setCurrentTab(currentTab === "tabIncome" ? "tabExpense" : "tabIncome");
  };
  
  const switchExpenseTab = () => {
    if (currentTab === "tabExpense") {
      return;
    }
    setCurrentTab(currentTab === "tabIncome" ? "tabExpense" : "tabIncome");
  };

  /* 給料などの項目の選択 */
  const onClickAdd = (selectItem) => {
    const newItems = [...itemName, selectItem];
    setItemName(newItems);
    setSelectedItem(selectItem); /* 項目を配列に入れないバージョン */
  };

  /* 項目と金額をテーブルに追加 */
  const handleAddTransaction = () => {
    if (itemName === "") {
      alert("項目が入力されていません");
      return;
    }
    if (amount === "") {
      alert("金額が入力されていません");
      return;
    }
    const newTransaction = {
      id: transactions.length + 1,
      description: itemName, /* itemNameが配列なのでクリックした分だけ表示されてしまう */
      amount: parseFloat(amount)
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setItemName([]);
    setTotalAmount(totalAmount + parseFloat(amount)); /* 合計金額 */
  };
  
  /* テーブルからの削除 */
  const handleDeleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
    setTotalAmount(totalAmount - parseFloat(amount)); /* 合計金額-削除項目の金額にしたいけどNaNと表示されてしまう… */
  };

  return (
    <>
      <h1>家計簿アプリ</h1>
      <button
        type="button"
        onClick={switchIncomeTab}
      >
        収入
      </button>
      <button
        type="button"
        onClick={switchExpenseTab}
      >
        支出
      </button>
      {currentTab === "tabIncome" ? (
        <div className="caseInIncome">
          {incomeItems.map((incomeItem) => (
            <button 
              type="button"
              key={incomeItem}
              value={incomeItem}
              onClick={() => onClickAdd(incomeItem)}
            >
              {incomeItem}
            </button>
          ))}
          <form
            action="income.php"
            method="post"
          >
            <p>選択項目{selectedItem}</p>
            {/* {itemName.map((item) => (
              <div
                key={item}
              >
                {item}
              </div>
            ))} */}
            <label
              for="amount"
              required
            >
              金額
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                id="amount"
                required
              />
            </label>
            <button
              type="button"
              onClick={handleAddTransaction}
            >
              追加
            </button>
          </form>
          <div className="itemList">
            <h2>項目一覧</h2>
            <table>
              <tr>
                <th>項目</th>
                <th>金額</th>
              </tr>
              {transactions.map((transactions, index) => (
                <tr key={transactions.id}>
                  <td>{transactions.description}</td>
                  <td>{transactions.amount}</td>
                  <td>
                    <button 
                      type="button"
                      onClick={() => handleDeleteTransaction(index)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <dl>
              <dt>合計金額</dt>
              <dd>{totalAmount}円</dd>
            </dl>
          </div> {/* /.itemList */}
        </div> /* /.caseInIncome */
        ) : (
        <div className="caseInExpense">
          {expenseItems.map((expenseItem) => (
              <button
                type="button"
                key={expenseItem}
                value={expenseItem}
                onClick={() => onClickAdd(expenseItem)}
              >
                {expenseItem}
              </button>
          ))}
          <form
            action="expense.php"
            method="post"
          >
            <p>選択項目{selectedItem}</p>{/* (これは選択されたボタンの色を目立つ色に変えるだけでもいいかも) */}
            {/* {itemName.map((item) => (
              <div
                key={item}
              >
                {item}
              </div>
            ))} */}
            <label>
              金額
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>
            <button
              type="button"
              onClick={handleAddTransaction}
            >
              追加
            </button>
          </form>
          <div className="itemList">
            <h2>項目一覧</h2>
            <table>
              <tr>
                <th>項目</th>
                <th>金額</th>
              </tr>
              {transactions.map((transactions, index) => (
                <tr key={transactions.id}>
                  <td>{transactions.description}</td>
                  <td>{transactions.amount}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteTransaction(index)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <dl>
              <dt>合計金額</dt>
              <dd>{totalAmount}円</dd>
            </dl>
          </div> {/* /.itemList */}
        </div> /* /.caseInExpense */
        )
      }
    </>
  );
}
