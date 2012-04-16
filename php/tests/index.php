<?php
ini_set('max_execution_time', 200);

require_once 'PHPUnit.php';
require_once 'testfiles/quailTests.php';
require_once 'testfiles/oacTests.php';

require_once '../quail.php';


$reporterMethod = (php_sapi_name() == 'cli' && empty($_SERVER['REMOTE_ADDR']))
                    ? 'toString'
                    : 'toHTML'; 

$suite  = new PHPUnit_TestSuite('QuailTests');
$result = PHPUnit::run($suite);

print $result->$reporterMethod();

$suite  = new PHPUnit_TestSuite('QuailOACTests');
$result = PHPUnit::run($suite);

print $result->$reporterMethod();