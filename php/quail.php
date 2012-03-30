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
  
  protected $path;
  
  /**
   * Class constructor. 
   * @param string $contents The HTML contents to check for accessibility
   * @param mixed $guideline Either an array of test names, or a string indicating a guideline file
   *   should be loaded dynamically.
   */
  public function __construct($contents, $path = '', $guideline = 'test', $charset = 'utf-8') {
    if(!is_array($guideline)) {
      $guideline = json_decode(file_get_contents('../resources/guidelines/'. $guideline .'.json'));
      if(!$guideline) {
        throw new QuailConfigurationException('Guideline JSON file does not exist or is invalid.');
      }
    }
    $this->path = parse_url($path);
    $this->html = $contents;
    $this->guideline = $guideline;
    $this->charset = $charset;
    $this->document = phpQuery::newDocumentXHTML($contents, $charset);
  }
  
  public function runTests() {
    $this->getQuailTests();
    foreach($this->guideline as $test_name) {
      $test_description = (array)$this->quail_tests[$test_name];
      $test = false;
      if($test_description['type'] == 'custom') {
          $test = new $test_description['callback']($test_description, $this->document, $this->path);
      }
      elseif($test_description['type'] == 'selector') {
        $test = new QuailSelectorTest($test_description['selector'], $this->document, $this->path);
      }
      else {
        $test_class_name = 'Quail'. ucfirst($test_description['type']) .'Test';
        $test = new $test_class_name($test_description, $this->document, $this->path);
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
    if(!is_array($this->results)) {
      return $this->document->htmlOuter();
    }
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
  
  protected $path;
  
  function __construct($document, $path) {
    $this->document = $document;
    $this->path = $path;
    if(!method_exists($this, 'run') && $this->selector) {
      $this->reportSingleSelector($this->selector);
      return;
    }
    $this->run();
  }
  
  function reportSingleSelector($selector) {
    foreach(pq($selector) as $object) {
      $this->objects[] = pq($object);
    }
  }
  
  function getResults() {
    return $this->objects;
  }
  
  /**
   * Helper function that returns the last filename of a path.
   */
  protected function getFilename($path) {
    return array_pop(explode('/', $path));
  }
  
  /**
   * Utility function to sanity-check URLs
   */
  protected function validURL($url) {
    return (strpos($url, ' ') === FALSE);
  }
  
  /**
   * Utility function to remove non-readable elemnts from a string
   * indicating that for practical purposes it's empty.
   */
  protected function unreadable($string) {
    $string = trim(strip_tags($string));
    return (strlen($string) > 0) ? FALSE : TRUE;
  }
  
  /**
   * Returns if the element or any children are readable
   */
  function containsReadableText($element, $children = TRUE) {
		if(!$this->unreadable($element->text())) {
		  return TRUE;
		}
		if(!$this->unreadable($element->attr('alt'))) {
		  return TRUE;
		}
		if($children) {
		  foreach($element->children() as $child) {
		    if($this->containsReadableText(pq($child), $child)) {
		      return TRUE;
		    }
		  }
		}
		return FALSE;
	}
    
  /**
	*	Retrieves the full path for a file.
	*	@param string $file The path to a file
	*	@return string The absolute path to the file.
	*/	
	function getPath($file) {
	  $url = parse_url($file);
		if(isset($url['scheme'])) {
			return $file;
		}
		$path = $this->path;
    if(substr($file, 0, 1) == '/') {
      $path['path'] = $file;
    }
    elseif(substr($path['path'], -1, 1) == '/') {
      $path['path'] .= $file;
    }
    else {
      $path['path'] = explode('/', $path['path']);
      array_pop($path['path']);
      $path['path'] = implode('/', $path['path']);
      $path['path'] .= '/'. $file;
    }
    $port = ($path['port']) ? ':'. $path['port'] : '';
    return $path['scheme'] . '://'. $path['host'] . $port . $path['path'];
	}
	
	/**
	 * Helper function where we guess if a provided table
	 * is used for data or layout
	 */
	 function isDataTable($table) {
	   return ($table->find('th')->length && $table->find('tr')->length > 2) ? TRUE : FALSE;
	 }
	 
	 function convertFontSize($size) {
	   if(strpos($size, 'px') !== false) {
	     return floatval(str_replace('px', '', $size));
	   }
	   if(strpos($size, 'em') !== false) {
	     return floatval(str_replace('em', '', $size)) * 16;
	   }
	 }
}


class QuailCustomTest extends QuailTest{
  
  function __construct($options, $document, $path) {
    $this->options = $options;
    $this->document = $document;
    $this->path = $path;
    $this->run();
  }
}

/**
 * Exception for when the configuration of a Quail instance is wrong.
 */
class QuailConfigurationException extends Exception {

}