import "./style.css";
import { useState, useEffect } from "react";

export const App = () => {
  const [currentTab, setCurrentTab] = useState("tabIncome");
  const [selectItem, setSelectItem] = useState(["給料"]);
  const [selectDate, setSelectDate] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [inputMemo, setInputMemo] = useState("");
  const [incTransactions, setIncTransactions] = useState([]);
  const [expTransactions, setExpTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const incomeItem = ["給料", "おこづかい", "賞与", "副業", "投資", "臨時収入"];
  const expenseItem = ["食費","日用品","衣服","美容","交際費","医療費","教育費","光熱費","交通費","通信費","家賃"];

  const switchIncomeTab = () => {
    setCurrentTab("tabIncome");
    setSelectItem([""]);
  };

  const switchExpenseTab = () => {
    setCurrentTab("tabExpense");
    setSelectItem([""]);
  };

  const displayItem = (item) => {
    setSelectItem(item);
  };

  const addTransaction = () => {
    if (!selectItem[0]) return alert("項目を入力してください");
    if (!inputAmount) return alert("金額を入力してください");
    const newTransaction = {
      id:
        currentTab === "tabIncome"
          ? incTransactions.length + 1
          : expTransactions.length + 1,
      date: selectDate,
      name: selectItem,
      amount: parseFloat(inputAmount),
      memo: inputMemo,
      tab: currentTab
    };
    if (currentTab === "tabIncome") {
      setIncTransactions([...incTransactions, newTransaction]);
      setIncomeAmount(incomeAmount + parseFloat(inputAmount));
    } else {
      setExpTransactions([...expTransactions, newTransaction]);
      setExpenseAmount(expenseAmount + parseFloat(inputAmount));
    }
    setSelectItem([""]);
    setSelectDate("");
    setInputMemo("");
    setInputAmount(0);
  };

  const deleteTransaction = (del) => {
    if (del.tab === "tabIncome") {
      setIncomeAmount(incomeAmount - del.amount);
      setIncTransactions(
        incTransactions.filter((transaction) => transaction.id !== del.id)
      );
    } else {
      setExpenseAmount(expenseAmount - del.amount);
      setExpTransactions(
        expTransactions.filter((transaction) => transaction.id !== del.id)
      );
    }
  };

  useEffect(() => {
    setTotalAmount(incomeAmount - expenseAmount);
  }, [incomeAmount, expenseAmount]);

  return (
    <>
      <div className="App">
        <div className="headerTitle">
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
        </div>
        {currentTab === "tabIncome" ? (
          <div className="earn">
            {incomeItem.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => displayItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          <div className="payment">
            {expenseItem.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => displayItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <form>
          <input
            className="date"
            type="date"
            value={selectDate}
            onChange={(e) => {
              setSelectDate(e.target.value);
            }}
          />
          <div className="content">
            <p>選択項目</p>
            <input
              type="text"
              value={selectItem}
              onChange={() => {}}
              required
            />
          </div>
          <div className="money">
            <p>金額</p>
            <input
              type="number"
              value={inputAmount}
              min="0"
              onChange={(e) => setInputAmount(e.target.value)}
              required
            />
          </div>
          <div className="memorandum">
            <p>メモ</p>
            <input
              type="text"
              value={inputMemo}
              placeholder="例) 誕生日プレゼント代"
              onChange={(e) => {
                setInputMemo(e.target.value);
              }}
            />
          </div>
          <input
            className="submitButton"
            type="button"
            value="追加"
            onClick={addTransaction}
          />
        </form>
        <div className="listSection">
          <div className="earnList">
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
                {incTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.memo}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteTransaction(transaction)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="paymentList">
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
                {expTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.memo}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteTransaction(transaction)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <dl className="moneyList">
          <dt>収支計</dt>
          <dd>{totalAmount}円</dd>
          <dt>収入合計</dt>
          <dd>{incomeAmount}円</dd>
          <dt>支出合計</dt>
          <dd>{expenseAmount}円</dd>
        </dl>
      </div>
    </>
  );
}
