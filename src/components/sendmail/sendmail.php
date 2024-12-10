<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

	//Від кого лист
	$mail->setFrom('from@gmail.com', 'Фрілансер по життю'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('to@gmail.com'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Вітання! Це "Фрілансер по життю"';

	//Тіло листа
	$body = '<h1>Зустрічайте супер листа!</h1>';

	//if(trim(!empty($_POST['email']))){
		//$body.=$_POST['email'];
	//}	
	
	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

	//======= проверка капчи на отправку =================================================================================================================================================
	// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// 	$recaptchaSecret = 'ВАШ_SECRET_KEY';
	// 	$recaptchaResponse = $_POST['g-recaptcha-response'];
	
	// 	// Запрос к Google для проверки reCAPTCHA
	// 	$recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}";
	// 	$response = file_get_contents($recaptchaUrl);
	// 	$responseKeys = json_decode($response, true);
	
	// 	// Если reCAPTCHA успешно пройдена
	// 	if ($responseKeys["success"]) {
	// 		$mail->Body = $body;
	
	// 		// Отправляем письмо
	// 		if (!$mail->send()) {
	// 			$message = 'Помилка';
	// 		} else {
	// 			$message = 'Дані надіслані!';
	// 		}
	// 	} else {
	// 		$message = 'Помилка: підтвердження reCAPTCHA не пройдено.';
	// 	}
	
	// 	// Ответ в формате JSON
	// 	$response = ['message' => $message];
	// 	header('Content-type: application/json');
	// 	echo json_encode($response);
	// }
	//========================================================================================================================================================
	
?>