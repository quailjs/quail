<?php 

  $tests = (array)json_decode(file_get_contents('../../src/resources/tests.json'));
  $stats = json_decode(file_get_contents('data/stats.json'));
  
  foreach($tests as $testname => &$test) {
    if(file_exists('../../docs/tests/'. $testname .'.rst')) {
      $file = file('../../docs/tests/'. $testname .'.rst');
      $test->readableName = $file[1];
    }
  }
  if($_POST) {
    $guideline = array(); 
    foreach($_POST['guideline'] as $testname => $status) {
      if($status == 'on') {
        $guideline[] = $testname;
      }
    }
    $file = fopen('data/guideline.json', 'w');
    fwrite($file, json_encode($guideline));
    fclose($file);
  }
  else {
    $guideline = json_decode(file_get_contents('data/guideline.json'));
  } 
?><!DOCTYPE>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Settings | My CMS</title>
		<link rel="stylesheet" href="../common/style.css"/>
		<link rel="stylesheet" href="../common/bootstrap.css"/>
	</head>
	<body>
	<div class="container">
	<div class="navbar navbar-fixed">
    <div class="navbar-inner">
      <a class="brand" href="#">My CMS</a>
      <ul class="nav">
        <li class="active"><a href="index.php">Settings</a></li>
        <li><a href="sample.html">Sample page</a></li>
      </ul>
    </div>
  </div>
	<h1 class="title">My awesome CMS</h1>
	
	<div class="row">
  	<div class="span9">
    	<form method="post">
    	<table class="table table-striped table-bordered">
    	  <thead>
    	    <tr>
    	      <th>Enabled</th>
    	      <th>Test name</th>
    	    </tr>
    	  </thead>
    	  <tbody>
    	    <?php foreach($tests as $testname => $test): ?>
    	      <tr>
    	        <td>
    	          <input type="checkbox" name="guideline[<?php print $testname; ?>]" id="<?php print $testname; ?>"<?php if(in_array($testname, $guideline)) print ' checked="checked"'; ?>>
    	          
    	        </td>
    	        <td>
    	          <label for="<?php print $testname; ?>">
    	            <?php if($test->readableName) 
    	                    print $test->readableName; 
    	                  else
    	                    print $testname;  ?>
    	          </label>
    	        </td>
    	      </tr>
    	    <?php endforeach; ?>
    	  </tbody>
    	</table>
    	<input type="submit" class="btn btn-primary" value="Save settings">
    	</form>
  	</div>
  	<aside class="span3">
  	  <h2>Statistics</h2>
  	  <?php if($stats && $stats->severe ): ?>
  	    <ul>
  	      <li>
  	        <strong>Severe errors: </strong> <?php print $stats->severe; ?>
  	      </li>
  	      <li>
  	        <strong>Moderate errors: </strong> <?php print $stats->moderate; ?>
  	      </li>
  	      <li>
  	        <strong>Suggestions: </strong> <?php print $stats->suggestion; ?>
  	      </li>
  	    </ul>
  	  <?php else: ?>
  	    <div class="alert alert-error">
  	      Once you check accessibility on the sample page, you will see stats here.
  	    </div>
  	   <?php endif; ?>
  	  <h2>Note</h2>
  	  <p>
  	    This is just a listing of all tests from the <code>tests.json</code> file, you will
  	    probably want to create your own database of test names and descriptions to make
  	    these make sense to your users. You can view all the default text for these tests
  	    in the <code>docs</code> directory, which is where the titles from this example comes from.
  	  </p>
  	</aside>
	</div>
	</div>
	</body>
</html>
