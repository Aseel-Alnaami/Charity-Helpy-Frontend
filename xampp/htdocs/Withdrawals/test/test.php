<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Confirm Alert with Checkbox</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            margin: 0;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .alert-box {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        .alert-box h2 {
            margin: 0 0 15px;
        }
        .alert-box p {
            margin: 0 0 20px;
        }
        .alert-box .checkbox-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .alert-box .checkbox-container input {
            margin-left: 10px;
        }
        .alert-box button {
            padding: 10px 20px;
            margin: 0 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .alert-box button.confirm {
            background: #009688;
            color: #fff;
        }
        .alert-box button.cancel {
            background: #ccc;
        }
    </style>
</head>
<body>
    <button onclick="showConfirmAlert()">Click Me</button>

    <div class="overlay" id="overlay">
        <div class="alert-box">
            <h2>تأكيد</h2>
            <p>هل أنت متأكد أنك تريد المتابعة؟</p>
            <div class="checkbox-container">
                <label for="confirmCheckbox">تذكر خياري</label>
                <input type="checkbox" id="confirmCheckbox">
            </div>
            <button class="confirm" onclick="confirmAction()">تأكيد</button>
            <button class="cancel" onclick="cancelAction()">إلغاء</button>
        </div>
    </div>

    <script>
        function showConfirmAlert() {
            document.getElementById('overlay').style.display = 'flex';
        }

        function confirmAction() {
            const checkbox = document.getElementById('confirmCheckbox').checked;
            alert('تأكيد: ' + (checkbox ? 'تم التحديد' : 'لم يتم التحديد'));
            document.getElementById('overlay').style.display = 'none';
        }

        function cancelAction() {
            document.getElementById('overlay').style.display = 'none';
        }
    </script>
</body>
</html>
