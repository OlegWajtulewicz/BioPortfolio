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

	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	//$mail->Username   = 'vajoleg@gmail.com';                     //SMTP username
	$mail->Password   = 'clknsvhejzanvlhl';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465; 

	//Від кого лист
	$mail->setFrom('vajoleg@gmail.com', 'Portfolio'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('vajoleg@gmail.com'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Portfolio';

		//Тело письма
		$body = '<h1>Portfolio News!</h1>';
	
		if(trim(!empty($_POST['name']))){
			$body .='<p>Name: <strong>'.$_POST['name'].'</strong></p>';
		}
		if(trim(!empty($_POST['first-name']))){
			$body .='<p>First Name: <strong>'.$_POST['first-name'].'</strong></p>';
		}
		if(trim(!empty($_POST['last-name']))){
			$body .='<p>Last Name: <strong>'.$_POST['last-name'].'</strong></p>';
		}
		if(trim(!empty($_POST['email']))){
			$body.='<p>E-mail: <strong>'.$_POST['email'].'</strong></p>';
		}
		if(trim(!empty($_POST['phone']))){
			$body.='<p>Phone: <strong>'.$_POST['phone'].'</strong></p>';
		}
		if(trim(!empty($_POST['like']))){
			$body.='<p>Chcesz wziąć udział? <strong>'.$_POST['like'].'</strong></p>';
	   	}
		if(trim(!empty($_POST['message']))){
			$body.='<p>Message: <strong>'.$_POST['message'].'</strong></p>';
		}
		if(trim(!empty($_POST['url']))){
			$body.='<p>Your website URL: <strong>'.$_POST['url'].'</strong></p>';
		}
		if(trim(!empty($_POST['company']))){
			$body .='<p>Company: <strong>'.$_POST['company'].'</strong></p>';
		}
		if(trim(!empty($_POST['position']))){
			$body .='<p>Position: <strong>'.$_POST['position'].'</strong></p>';
		}

		// Добавляем данные из табов
		if (!empty($_POST['selected-tab'])) {
			$body .= '<p>Selected Tab: <strong>' . $_POST['selected-tab'] . '</strong></p>';
		}
		if (!empty($_POST['range-from']) && !empty($_POST['range-to'])) {
			$body .= '<p>Range: <strong>' . $_POST['range-from'] . ' - ' . $_POST['range-to'] . '</strong></p>';
		}
		
		// if(trim(!empty($_POST['hand']))){
		// 	$body.='<p><strong>Рука:</strong> '.$hand.'</p>';
		// }
		// if(trim(!empty($_POST['age']))){
		// 	$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
		// }
		
		// if(trim(!empty($_POST['message']))){
		// 	$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
		// }

	//if(trim(!empty($_POST['email']))){
		//$body.=$_POST['email'];
	//}	
	
	//Прикрепить файл
	if(trim(!empty($_FILES['image']['tmp_name'])))  {
		$fileTmpName = $_FILES['image']['tmp_name'];
		$fileName = $_FILES['image']['name'];
		$mail->addAttachment($fileTmpName, $fileName);
	//путь загрузки файла
		// $filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
		// //грузим файл
		// if (copy($_FILES['image']['tmp_name'], $filePath)){
		// 	$fileAttach = $filePath;
		// 	$body.='<p><strong>Фото в приложении</strong>';
		// 	$mail->addAttachment($fileAttach);
		// }
		}

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Erroe';
	} else {
		$message = 'Sand Mail!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>