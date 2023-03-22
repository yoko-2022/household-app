import "./style.css";
import { useState, useEffect } from "react";

/* functionの形から */
export const App = () => {
  /* グローバル変数 */
  const [currentTab, setCurrentTab] = useState("tabIncome");
  const [selectItem, setSelectItem] = useState(""); 
  /* itemName　→　selectItem　中身を文字列に変更 */
  const [selectDate, setSelectDate] = useState(""); /* 追加 */
  const [inputAmount, setInputAmount] = useState(0); /* 名前と初期値を変更 */
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0); 
  const [inputMemo, setInputMemo] = useState(""); /* 追加 */
  const [incTransactions, setIncTransactions] = useState([]); /* 名前変更 */
  const [expTransactions, setExpTransactions] = useState([]); /* 名前変更 */
  const [totalAmount, setTotalAmount] = useState(0);

  
  //※item内のデータを単純な文字列からnameとvalueに変更しました
  const incomeItem = [
    { name: "給料", value: "income" },
    { name: "おこづかい", value: "income" },
    { name: "賞与", value: "income" },
    { name: "副業", value: "income" },
    { name: "投資", value: "income" },
    { name: "臨時収入", value: "income" }
  ];
  
  const expenseItem = [
    { name: "食費", value: "expense" },
    { name: "日用品", value: "expense" },
    { name: "衣服", value: "expense" },
    { name: "美容", value: "expense" },
    { name: "交際費", value: "expense" },
    { name: "医療費", value: "expense" },
    { name: "教育費", value: "expense" },
    { name: "光熱費", value: "expense" },
    { name: "交通費", value: "expense" },
    { name: "通信費", value: "expense" },
    { name: "家賃", value: "expense" }
  ];
  
  /* 配列バージョン
  const incomeItems = ["給料", "ボーナス", "投資", "おこづかい", "副業", "臨時収入"];
  const expenseItems = ["食費", "日用品", "衣服", "美容", "交際費", "医療費", "教育費", "交通費", "通信費","光熱費", "家賃"]; */


  ////【1. タブの切り替え処理】 
  /* ①変数のケバブケースをキャメルケースに変更
  ②三項演算子の形に変更してすっきりさせた。もっと他にいい方法がないか募集中 */ 
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

  ////【2. 項目表示処理】収支アイテムのボタンを押した際、項目欄にアイテムを表示させる
  const displayItem = (item) => {
    setSelectItem(item);
  };

  ////【3. 追加ボタンを押した際の処理】項目のvalueを参照して追加先の分岐+金額計算
  const addTransaction = () => {
    if (selectItem === "") {
      alert("項目がありません");
      return;
    }
    if (!inputAmount) {
      alert("金額がありません");
      return;
    }

    //※selectItemからvalueを取り出してvalueと命名⇒selectItemを渡すだけでは[Object]として渡されてしまうので、以下のようにmapで展開してあげると[Object]の中に入っているvalueを取り出せるとのこと...むずい
    const value = selectItem.map((item) => item.value)[0];
    //※同じくselectItemからnameを取り出してnameと命名
    const name = selectItem.map((item) => item.name);
    ////【value=incomeだった時の処理】
    if (value === "income") {
      const newTransaction = {
        id: incTransactions.length + 1,
      //※前の処理で取り出したnameを渡す
        date: {selectDate},
        description: {name},
        amount: parseFloat(inputAmount),
        memo: {inputMemo},
      //※同じくvalueを渡す⇒展開場所に文字列として表示するのではなく、データとして渡すだけならvalue:{value}の記述じゃなくてok
        value
      };
      //※収入一覧にデータを渡す！！
      setIncTransactions([...incTransactions, newTransaction]);
      //※収入合計を計算する！！
      setIncomeAmount(incomeAmount + parseFloat(inputAmount));
      ////【value=incomeだった時の処理】ここまで！
      ////【value=expenseだった時の処理】各関数が支出用に変わっただけで、↑とほぼ同じ処理です
    } else if (value === "expense") {
      const newTransaction = {
        id: expTransactions.length + 1,
        date: {selectDate},
        description: {name},
        amount: parseFloat(inputAmount),
        memo: {inputMemo},
        value
      };
      setExpTransactions([...expTransactions, newTransaction]);
      setExpenseAmount(expenseAmount + parseFloat(inputAmount));
      ////【value=expenseだった時の処理】ここまで！
    }
    setSelectItem("");
    setSelectDate("");
    setInputAmount(0);
    setInputMemo("");
    setTotalAmount(totalAmount + parseFloat(inputAmount)); /* 合計金額 */
  };
  ////【3. 追加ボタンを押した際の処理】ここまで！

  ////【4. 削除ボタンを押下した際の処理】削除を押したアイテムのvalueを参照して条件分岐+金額の計算
  const deleteTransaction = (delTransaction) => {
  ////【value=incomeだった時の処理】
    if (delTransaction.value === "income") {
      setIncomeAmount(incomeAmount - delTransaction.amount);
      setIncTransactions(
        incTransactions.filter(
          (transaction) => transaction.id !== delTransaction.id
        )
      );
      ////【value=incomeだった時の処理】ここまで！
      ////【value=expenseだった時の処理】
    } else if (delTransaction.value === "expense") {
      setExpenseAmount(expenseAmount - delTransaction.amount);
      setExpTransactions(
        expTransactions.filter(
          (transaction) => transaction.id !== delTransaction.id
        )
      );
    }
    ////【value=expenseだった時の処理】ここまで！
  };
  
    ////【収支計の処理】⇒useEffectを使用。収入or支出合計の内容に変化があった場合のみ、収支計を計算するという処理です
    useEffect(() => {
      setTotalAmount(incomeAmount - expenseAmount);
    }, [incomeAmount, expenseAmount]);
    ////【収支計の処理】ここまで！
  return (
    <>
      <h1>家計簿アプリ</h1>
      <div>
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
          <div>
            {incomeItem.map((item,index) => (
              <button
                key={index}
                type="button"
                onClick={() => displayItem(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
          ) : (
          <div>
            {expenseItem.map((item,index) => (
              <button
                key={index}
                type="button"
                onClick={() => displayItem(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )
        }
      <form action="inc-exp.php" method="post">
        <input
          type="date"
          value={selectDate}
          onChange={(e) => {
            setSelectDate(e.target.value);
          }}
        />
        <div>
          <p>選択項目</p>
          <input
            type="text"
            value={selectItem}
            required
          />
        </div>
        <div>
          <p>金額</p>
          <input
            type="number"
            value={inputAmount}
            min="0"
            onChange={(e) => {
              setInputAmount(e.target.value);
            }}
            required
          />
        </div>
        <div>
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
          type="submit"
          value="追加"
          onClick={addTransaction}
        />
      </form>
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
            {incTransactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{transaction.tab}</td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.memo}</td>
                <td>
                  <button
                    type="button"
                    onClick={()=>deleteTransaction(index)}
                    >
                      削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      <dl>
        <dt>収入計</dt>
        <dd>{incomeAmount}円</dd>
        <dt>支出計</dt>
        <dd>{expenseAmount}円</dd>
        <dt>収支合計</dt>
        <dd>{totalAmount}円</dd>
      </dl> 
    </>
  )
}
