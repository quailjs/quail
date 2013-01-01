<?php
/*! QUAIL quail-lib.org | quail-lib.org/license */
/**
 * Processes all the OAC tests as well as the related QUAIL test name
 * and creates a markdown table for posterity. Only works on Mac/Linux.
 */

$tests = array();

foreach (glob("../test/testfiles/oac/*.html") as $filename) {
	$contents = file_get_contents($filename);
	$test_number = explode('/', $filename);
	$test_number = explode('-', array_pop($test_number));
	$test_number = $test_number[0];
	$test_name = array();
	preg_match("/test\(\'(?P<name>\w+)\',/i", $contents, $test_name);
	if($test_name['name']) {
	 $tests[$test_number] = $test_name['name'];
  }
}
ksort($tests);
print "|_. OAC Number |_. QUAIL Test | \n";
foreach($tests as $number => $name) {
  print "| ". $number . "| " . $name ."|\n";
}