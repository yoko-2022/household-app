<?php
if(!(isset($_POST["item"]))) {
  header("Location:index.html");
  exit();
}

$item = ($_POST["item"]);
$amount = htmlspecialchars($_POST["amount"], ENT_QUOTES);
$date = $_POST["date"];
$memo = htmlspecialchars($_POST["memo"], ENT_QUOTES);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>household-app | データ受け取りページ</title>
</head>
<body>
<form id="g-form" action="https://docs.google.com/forms/d/e/1FAIpQLSeMtZMneEPG9Syb2azwxaccEwmf-X6EtqTfXNIHYdouOEGYHQ/viewform?usp=sf_link" method="post">
  <input type="date" name="entry.419545418_year"><?php echo $date; ?></input>
  <input type="date" name="entry.419545418_month"><?php echo $date; ?></input>
  <input type="date" name="entry.448033554"><?php echo $date; ?></input>
  <input type="hidden" name="entry.50576548"><?php echo $item; ?></input>
  <input type="number" name="entry.195387992"><?php echo $amount; ?></input>
  <input type="text" name="entry.448033554"><?php echo $memo; ?></input>
</body>
</html>