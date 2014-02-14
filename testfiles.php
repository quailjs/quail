<?php

$open = '<!doctype html>
<html>
	<head>
		<title>%s</title>
	</head>
	<body>
';

$close = '
		<script src="../testrunner.js"></script>
	</body>
</html>
';

$tests = array();
foreach(glob('test/testfiles/quail/*.html') as $file) {
	$name = explode('/', $file);
	$name = explode('-', array_pop($name));
	$type = (strpos($file, '-pass')) ? 'pass' : 'fail';
	$tests[$name[0]][] = array('type' => $type, 'file' => file_get_contents($file));
}
foreach($tests as $testname => $files) {
	$t = fopen('test/move/'. $testname .'.html', 'w');
	fwrite($t, sprintf($open, $testname));
	foreach($files as $file) {
		if($file['type'] == 'pass') {
			fwrite($t, '		<div class="quail-test" data-expected="pass" data-accessibility-test="'. $testname .'">' . "\n");
		}
		else {
			fwrite($t, '		<div class="quail-test" data-expected="fail" data-accessibility-test="'. $testname .'">' . "\n");
		}
		$r = $file['file'];
		$r = preg_replace('/<\!(.*)>/', '', $r);
		$r = preg_replace('/<html(.*)<\/head>/s', '', $r);
		$r = preg_replace('/<body(.*)>/', '', $r);
		$r = preg_replace('/<script(.*)<\/html>/s', '', $r);
		

		fwrite($t, "\n" . trim($r) ."\n");

		fwrite($t, '		</div>' . "\n");
	}
	fwrite($t, $close);
	fclose($t);
	print $testname . "\n";
}