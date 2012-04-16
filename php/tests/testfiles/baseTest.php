<?php

class QuailBaseTest extends PHPUnit_TestCase {
  
  protected $test_directory;
  
  function getTest($file, $test) {
   		$protocol = ($_SERVER['SERVER_PROTOCOL'] == 'HTTP/1.1')
   		            ? 'http'
   		            : 'https';
   		$contents = file_get_contents($this->test_directory . $file);
      $quail = new Quail($contents, $protocol .'://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . $this->test_directory . $file, array($test));
  		$quail->runTests();
  
  		return $quail->getRawResults($test);
   }
}