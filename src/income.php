<?php
$itemName = isset($_POST["itemName"]) ? $_POST["itemName"] : "";
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <td><?php echo $itemName; ?></td>
  <p></p>
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
      <dd>{result}円</dd>
    </dl>
  </div> <!-- /.itemList -->
</body>
</html>