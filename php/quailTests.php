<?php

//namespace Quail\Tests;

class QuailSelectorTest extends QuailTest {
  
  var $selector;
  
  function __construct($selector, $document) {
    $this->selector = $selector;
    parent::__construct($document);
  }
}

class imgAltIsDifferent extends QuailTest {
  
  function run() {
    foreach(pq('img', $this->document) as $object) {
      if(pq($object)->attr('src') == pq($object)->attr('alt')) {
        $this->objects[] = pq($object);
      }
    }
  }
}