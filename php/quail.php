<?php

//namespace Quail;

require_once __DIR__ . '/phpquery/phpQuery/phpQuery.php';
require_once 'quailTests.php';

class Quail {
  
  /**
   * An array of test object names that should be run against this content.
   */
  protected $guideline = array();
  
  
  /**
   * An array of quail tests, usually loaded fromt he test.json file.
   */
  public $quail_tests;
  
  /**
   * The charset to use for the current document.
   */
  public $charset = 'utf-8';
  
  /**
   * The actual HTML document to check
   */
  protected $html;
  
  /**
   * An array of test objects
   */
  protected $tests;
  
  /**
   * An array of result objects
   */
  protected $results;
  
  /**
   * The current PHPQuery document object
   */
  protected $document;
  
  /**
   * Class constructor. 
   * @param string $contents The HTML contents to check for accessibility
   * @param mixed $guideline Either an array of test names, or a string indicating a guideline file
   *   should be loaded dynamically.
   */
  public function __construct($contents, $guideline = 'test', $charset = 'utf-8') {
    if(!is_array($guideline)) {
      $guideline = json_decode(file_get_contents('../resources/guidelines/'. $guideline .'.json'));
      if(!$guideline) {
        throw new QuailConfigurationException('Guideline JSON file does not exist or is invalid.');
      }
    }
    $this->html = $contents;
    $this->guideline = $guideline;
    $this->charset = $charset;
    $this->document = phpQuery::newDocumentXHTML($contents, $charset);
  }
  
  public function runTests() {
    $this->getQuailTests();
    foreach($this->guideline as $test_name) {
      $test_description = $this->quail_tests[$test_name];
      if($test_description === false) {
        if(class_exists($test_name)) {
          $this->results[$test_name] = new $test_name($test_description, $this->document);
        }
      }
      elseif(is_string($test_description)) {
        $test = new QuailSelectorTest($test_description, $this->document);
      }
      if($test) {
        $this->results[$test_name] = $test->getResults();
      }
    }
  }
  
  protected function getQuailTests() {
    if(!$this->quail_tests) {
      $this->quail_tests = (array)json_decode(file_get_contents('../../resources/tests.json'));
    }
  }
  
  public function getRawResults($testname = false) {
    if($testname) {
      return $this->results[$testname];
    }
    return $this->results;
  }
  
  public function getReport($reporter) {
    $reporter->html = $this->html;
    $reporter->results = $this->results;
    $reporter->document = $this->document;
    return $reporter->getReport();
  }
  
}

class QuailReport {
  
  public $results;
  
  public $html;
  
  public $document;
  
  public function getReport() {
  
  }
}

class QuailHTMLReporter extends QuailReport {
  
  public function getReport() {
    foreach($this->results as $test => $objects) {
      foreach($objects as $node) {
        $node->addClass('quail-problem')
             ->addClass('quail-'. $test);
      }
    }
    return $this->document->htmlOuter();
  }
  
}

class QuailTest {
  
  protected $objects = array();
  
  protected $status = TRUE;
  
  protected $document;
  
  function __construct($document) {
    $this->document = $document;
    if(!method_exists($this, 'run') && $this->selector) {
      $this->reportSingleSelector($this->selector);
      return;
    }
    $this->run();
  }
  
  function reportSingleSelector($selector) {
    foreach(pq($selector, $this->document) as $object) {
      $this->objects[] = pq($object);
    }
  }
  
  function getResults() {
    return $this->objects;
  }
  
  /**
   * Helper function that returns the last filename of a path.
   */
  function getFilename($path) {
    return array_pop(explode('/', $path));
  }
  
}

/**
 * Exception for when the configuration of a Quail instance is wrong.
 */
class QuailConfigurationException extends Exception {

}