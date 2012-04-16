<?php

require_once('baseTest.php');

class QuailTests extends QuailBaseTest {

 protected $test_directory = '../../testfiles/quail/';
 
 function test_textIsNotSmall() {
		$results = $this->getTest('textIsNotSmall-fail.html', 'textIsNotSmall');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'p');
    }
    
		$results = $this->getTest('textIsNotSmall-pass.html', 'textIsNotSmall');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('textIsNotSmall-fail2.html', 'textIsNotSmall');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'p');
    }	
	}
	
	function test_documentIsReadable() {
    
		$results = $this->getTest('documentIsReadable-pass.html', 'documentIsReadable');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('documentIsReadable-fail.html', 'documentIsReadable');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'body');
    }


		$results = $this->getTest('documentIsReadable-fail2.html', 'documentIsReadable');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'body');
    }	
	}
	
	
	function test_svgContainsTitle() {
		$results = $this->getTest('svgContainsTitle-fail.html', 'svgContainsTitle');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'svg');
    }
		$results = $this->getTest('svgContainsTitle-pass.html', 'svgContainsTitle');
		$this->assertTrue(count($results) == 0);
	}
	
	function test_headersHaveText() {
		$results = $this->getTest('headersHaveText-fail.html', 'headersHaveText');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'h2');
    }
		$results = $this->getTest('headersHaveText-fail2.html', 'headersHaveText');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'h2');
    }
		$results = $this->getTest('headersHaveText-pass.html', 'headersHaveText');
		$this->assertTrue(count($results) == 0);
	
	}
	
	function test_imgAltTextNotRedundant() {
		$results = $this->getTest('imgAltTextNotRedundant-fail.html', 'imgAltTextNotRedundant');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'img');
    }
    
		$results = $this->getTest('imgAltTextNotRedundant-pass.html', 'imgAltTextNotRedundant');
		$this->assertTrue(count($results) == 0);
	
	}
	
	function test_selectJumpMenus() {
		$results = $this->getTest('selectJumpMenus-fail.html', 'selectJumpMenus');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'select');
    }
		$results = $this->getTest('selectJumpMenus-pass.html', 'selectJumpMenus');
		$this->assertTrue(count($results) == 0);

	}
	
  function test_cssTextHasContrast() {
		$results = $this->getTest('cssContrast.html', 'cssTextHasContrast');
		$this->assertTrue(is_object($results[0]));
		if(is_object($results[0])) {
  		$this->assertTrue($results[0]->elements[0]->tagName == 'p');
    }
	}
	
}