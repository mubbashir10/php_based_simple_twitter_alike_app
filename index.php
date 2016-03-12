<!DOCTYPE html>
<html lang="en">
  <head>
  
    <!--code fo meta tags-->  
    <meta charset="utf-8">
	
	<!--code for page title-->
    <title>Twitter</title>
	
	<!--code for stylesheets-->
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/skeleton.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="http://fonts.googleapis.com/css?family=Questrial" rel="stylesheet" type="text/css"/>
	
	<!--code for scripts-->
	<script src="js/angular.min.js"></script>
	<script src="js/jquery-1.11.3.min.js"></script>
	<script src="js/script.js"></script>
		
  </head>
  
  <body>

    <!--code for main wrapper-->
	<div class="wrapper">

		<h4>Welcome to Twitter</h4>
		<div class="calendar">

			<!--php-->
			<?php
	

				$servername = "localhost";
				$username = "root";
				$password = "ralf19";

				// Create connection
				$conn = new mysqli($servername, $username, $password);

				// Check connection
				if ($conn->connect_error) {
				    die("Connection failed: " . $conn->connect_error);
				} 

				//selecting DB
				mysqli_select_db($conn,"twitterDB");

				//if form is submitted
				if(isset($_POST['submit'])){

					$email = $_POST['email'];
					$tweet = $_POST['tweet'];

					//updating DB
					$query = "INSERT INTO data (email,tweet) VALUES ('$email','$tweet')";
					mysqli_query($conn,$query);

					//updating DB
					$query = "SELECT * FROM data";
					$result = mysqli_query($conn,$query);

					if ($result->num_rows > 0) {
					    // output data of each row
					    while($row = $result->fetch_assoc()) {
					        echo "<strong>Email: </strong>".$row['email']."<br>";
					        echo "<strong><i class='fa fa-twitter' style='color:#1EAEDB'></i> Tweet: </strong>".$row['tweet']."<br><br><br>";
					    }
					} else {
					    echo "0 results";
					}

					$script = '<script>$("#inputForm").hide;$("#feed").show;<script>';
					echo($script);

				}

			?>
			<span class="u-pull-left">Enter your email in the field below to make a tweet!</span>
			<br>
			<form action="" method="post" id="inputForm">
			<div class="row">
			<div class="twelve columns">
			<input class="u-full-width" type="email" placeholder="email@example.com" name="email" required>
			<textarea class="u-full-width" placeholder="Your Tweet...!" name="tweet" required></textarea>
			<input class="button-primary u-pull-right" type="submit" value="Submit" name="submit">
			</div>
			</form>

			<div id="feed" style="display:none;">
				<?php



				?>
			</div>				
										
		</div>
	
	</div>

  </body>
</html>