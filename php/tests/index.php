<?php
error_reporting(E_WARNING);
if(!file_exists('simpletest/unit_tester.php')) {
	die('You must install simpletest [http://www.simpletest.org/] in the directory "tests".');
}
require_once('../quail/quail.php');
require_once('simpletest/unit_tester.php');
require_once('simpletest/reporter.php');
require_once('cssTests.php');
require_once('quailTests.php');

class TestOfTests extends UnitTestCase {
 
 function getTest($file, $test) {
 		$name = explode('-', $file);
 		
 		$filename = 'testfiles/oac/'. $file;
        $quail = new quail($filename, 'wcag1a', 'file');
		$quail->runCheck();
	
		return $quail->getTest($test);
 }
 

 // 1
 function test1_imgHasAlt() {
		$results = $this->getTest('1-1.html', 'imgHasAlt');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		$results = $this->getTest('1-2.html', 'imgHasAlt');
		$this->assertTrue(count($results) == 0);
 }

 //2
 function test2_imgAltIsDifferent() {
		$results = $this->getTest('2-1.html', 'imgAltIsDifferent');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('2-2.html', 'imgAltIsDifferent');
		$this->assertTrue(count($results) == 0);
 }

 //3
 function test4_imgAltIsTooLong() {
		$results = $this->getTest('3-1.html', 'imgAltIsTooLong');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('3-2.html', 'imgAltIsTooLong');
		$this->assertTrue(count($results) == 0);
 }

 //4
 function test4_imgNonDecorativeHasAlt() {
		$results = $this->getTest('4-1.html', 'imgNonDecorativeHasAlt');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('4-2.html', 'imgNonDecorativeHasAlt');
		$this->assertTrue(count($results) == 0);
 }

 //5
 function test5_imgImportantNoSpacerAlt() {
		$results = $this->getTest('5-1.html', 'imgImportantNoSpacerAlt');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('5-2.html', 'imgImportantNoSpacerAlt');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('5-3.html', 'imgImportantNoSpacerAlt');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'big-fail.png');
 }

 //6
 function test6_imgAltNotPlaceHolder() {
		$results = $this->getTest('6-1.html', 'imgAltNotPlaceHolder');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('6-2.html', 'imgAltNotPlaceHolder');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('6-3.html', 'imgAltNotPlaceHolder');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');

		$results = $this->getTest('6-4.html', 'imgAltNotPlaceHolder');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');

		$results = $this->getTest('6-5.html', 'imgAltNotPlaceHolder');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('6-6.html', 'imgAltNotPlaceHolder');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('6-7.html', 'imgAltNotPlaceHolder');
		$this->assertTrue(count($results) == 0);
 }
 
 //7
 function test7_imgAltNotEmptyInAnchor() {
		$results = $this->getTest('7-1.html', 'imgAltNotEmptyInAnchor');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('7-2.html', 'imgAltNotEmptyInAnchor');
		$this->assertTrue(count($results) == 0);
 }

 //8
 function test8_imgHasLongDesc() {
		$results = $this->getTest('8-1.html', 'imgHasLongDesc');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'chart.gif');

		$results = $this->getTest('8-2.html', 'imgHasLongDesc');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('8-3.html', 'imgHasLongDesc');
		//$this->assertTrue($results[0]->element->getAttribute('src') == 'chart.gif');

		$results = $this->getTest('8-4.html', 'imgHasLongDesc');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('8-5.html', 'imgHasLongDesc');
		$this->assertTrue(count($results) == 0);
 }

 //9
 function test9_imgNeedsLongDescWDlink() {
		$results = $this->getTest('9-1.html', 'imgNeedsLongDescWDlink');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'rex.jpg');
		
		$results = $this->getTest('9-2.html', 'imgNeedsLongDescWDlink');
		$this->assertTrue(count($results) == 0);
 }

 //10
 function test10_imgGifNoFlicker() {
		$results = $this->getTest('10-1.html', 'imgGifNoFlicker');
		//$this->assertTrue($results[0]->element->getAttribute('src') == 'eatatjoes.gif');
		
		$results = $this->getTest('10-2.html', 'imgGifNoFlicker');
		$this->assertTrue(count($results) == 0);
 }


 //11
 function test11_imgAltIsSameInText() {
		$results = $this->getTest('11-1.html', 'imgAltIsSameInText');
		$this->assertTrue($results[0]->element->getAttribute('alt') == 'logo');
		
		$results = $this->getTest('11-2.html', 'imgAltIsSameInText');
		$this->assertTrue($results[0]->element->getAttribute('alt') == 'W3C Working Draft logo');
 }
 
  //12
 function test12_imgWithMapHasUseMap() {
		$results = $this->getTest('12-1.html', 'imgWithMapHasUseMap');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'image.gif');
		
		$results = $this->getTest('12-2.html', 'imgWithMapHasUseMap');
		$this->assertTrue(count($results) == 0);
 }

  //13
 function test13_imgMapAreasHaveDuplicateLink() {
		$results = $this->getTest('13-1.html', 'imgMapAreasHaveDuplicateLink');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'navigation.gif');
		
		$results = $this->getTest('13-2.html', 'imgMapAreasHaveDuplicateLink');
		$this->assertTrue(count($results) == 0);


		$results = $this->getTest('13-3.html', 'imgMapAreasHaveDuplicateLink');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'navigation.gif');		
 }

  //14
 function test14_imgNotReferredToByColorAlone() {
		$results = $this->getTest('14-1.html', 'imgNotReferredToByColorAlone');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'kids.jpg');
		
		$results = $this->getTest('14-2.html', 'imgNotReferredToByColorAlone');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'kids.jpg');

		$results = $this->getTest('14-3.html', 'imgNotReferredToByColorAlone');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'kids.jpg');
 }

  //15
 function test15_imgAltIdentifiesLinkDestination() {
		$results = $this->getTest('15-1.html', 'imgAltIdentifiesLinkDestination');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'topo.gif');
		
		$results = $this->getTest('15-2.html', 'imgAltIdentifiesLinkDestination');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'topo.gif');

 }

  //16
 function test16_imgAltEmptyForDecorativeImages() {
		$results = $this->getTest('16-1.html', 'imgAltEmptyForDecorativeImages');
		$this->assertTrue($results[0]->element->getAttribute('src') == '10pttab.gif');
		
		$results = $this->getTest('16-2.html', 'imgAltEmptyForDecorativeImages');
		$this->assertTrue($results[0]->element->getAttribute('src') == '10pttab.gif');

		$results = $this->getTest('16-3.html', 'imgAltEmptyForDecorativeImages');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'star.gif');

		$results = $this->getTest('16-4.html', 'imgAltEmptyForDecorativeImages');
		$this->assertTrue($results[0]->element->getAttribute('src') == 'star.gif');
 }


  //17
 function test17_aLinksToSoundFilesNeedTranscripts() {
		$results = $this->getTest('17-1.html', 'aLinksToSoundFilesNeedTranscripts');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'carol-talking.wav');
 }

  //18
 function test18_aLinksDontOpenNewWindow() {
		$results = $this->getTest('18-1.html', 'aLinksDontOpenNewWindow');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'newwindow.html');

		$results = $this->getTest('18-2.html', 'aLinksDontOpenNewWindow');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('18-3.html', 'aLinksDontOpenNewWindow');
		$this->assertTrue(count($results) == 0);
				
		$results = $this->getTest('18-4.html', 'aLinksDontOpenNewWindow');
		$this->assertTrue(count($results) == 0);
 }


  //19
 function test19_aLinksMakeSenseOutOfContext() {
		$results = $this->getTest('19-1.html', 'aLinksMakeSenseOutOfContext');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'dogs.html');


 }

  //20
 function test20_aLinksToMultiMediaRequireTranscript() {
		$results = $this->getTest('20-1.html', 'aLinksToMultiMediaRequireTranscript');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'movie.wmv');

		$results = $this->getTest('20-2.html', 'aLinksToMultiMediaRequireTranscript');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('20-3.html', 'aLinksToMultiMediaRequireTranscript');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'movie.mpg');
		
		$results = $this->getTest('20-4.html', 'aLinksToMultiMediaRequireTranscript');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'movie.mov');
		
		$results = $this->getTest('20-5.html', 'aLinksToMultiMediaRequireTranscript');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'movie.ram');
		
		$results = $this->getTest('20-6.html', 'aLinksToMultiMediaRequireTranscript');
		$this->assertTrue($results[0]->element->getAttribute('href') == 'movie.aif');
 } 

  //21
 function test21_appletsDoneUseColorAlone() {
 		
		$results = $this->getTest('21-1.html', 'appletsDoneUseColorAlone');
		$this->assertTrue($results[0]->element->tagName == 'applet');
	
		$results = $this->getTest('21-2.html', 'appletsDoneUseColorAlone');
		$this->assertTrue(count($results) == 0);
 }

  //22
 function test22_appletsDoNotFlicker() {
 		
		$results = $this->getTest('22-1.html', 'appletsDoNotFlicker');
		$this->assertTrue($results[0]->element->tagName == 'applet');
	
		$results = $this->getTest('22-2.html', 'appletsDoNotFlicker');
		$this->assertTrue($results[0]->element->tagName == 'applet');

 }

  //23
 function test23_appletContainsTextEquivalentInAlt() {
 		
		$results = $this->getTest('23-1.html', 'appletContainsTextEquivalentInAlt');
		$this->assertTrue($results[0]->element->tagName == 'applet');
	
		$results = $this->getTest('23-2.html', 'appletContainsTextEquivalentInAlt');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('23-3.html', 'appletContainsTextEquivalentInAlt');
		$this->assertTrue($results[0]->element->tagName == 'applet');
 }


  //24
 function test24_appletTextEquivalentsGetUpdated() {
 		
		$results = $this->getTest('23-1.html', 'appletTextEquivalentsGetUpdated');
		$this->assertTrue($results[0]->element->tagName == 'applet');
	
		$results = $this->getTest('23-2.html', 'appletTextEquivalentsGetUpdated');
		$this->assertTrue($results[0]->element->tagName == 'applet');

 }

  //25
 function test25_appletContainsTextEquivalent() {
 		
		$results = $this->getTest('25-1.html', 'appletContainsTextEquivalent');
		$this->assertTrue($results[0]->element->tagName == 'applet');
	
		$results = $this->getTest('25-2.html', 'appletContainsTextEquivalent');
		$this->assertTrue(count($results) == 0);

 }

  //26
 function test26_appletUIMustBeAccessible() {
 		
		$results = $this->getTest('26-1.html', 'appletUIMustBeAccessible');
		$this->assertTrue($results[0]->element->tagName == 'applet');
	
		$results = $this->getTest('26-2.html', 'appletUIMustBeAccessible');
		$this->assertTrue(count($results) == 0);

 }

  //27
 function test27_blinkIsNotUsed() {
 		
		$results = $this->getTest('27-1.html', 'blinkIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'blink');
	
		$results = $this->getTest('27-2.html', 'blinkIsNotUsed');
		$this->assertTrue(count($results) == 0);

 }

  //28
 function test28_skipToContentLinkProvided() {
 		
		$results = $this->getTest('28-1.html', 'skipToContentLinkProvided');
		$this->assertTrue($results[0]->pass === false);
	
		$results = $this->getTest('28-2.html', 'skipToContentLinkProvided');
		$this->assertTrue(count($results) == 0);

 }

  //29
 function test29_doctypeProvided() {
 		
		$results = $this->getTest('29-1.html', 'doctypeProvided');
		if(isset($results[0])) {
			$this->assertTrue($results[0]->pass == false);
		}
		$results = $this->getTest('29-2.html', 'doctypeProvided');
		$this->assertTrue(count($results) == 0);

 }

  //30
 function test30_objectDoesNotFlicker() {
 		
		$results = $this->getTest('30-1.html', 'objectDoesNotFlicker');
		$this->assertTrue($results[0]->element->tagName == 'object');
	
		$results = $this->getTest('30-2.html', 'objectDoesNotFlicker');
		$this->assertTrue($results[0]->element->tagName == 'object');

 }

  //31
 function test31_framesHaveATitle() {
 		
		$results = $this->getTest('31-1.html', 'framesHaveATitle');
		$this->assertTrue($results[0]->element->tagName == 'frame');
	
		$results = $this->getTest('31-2.html', 'framesHaveATitle');
		$this->assertTrue(count($results) == 0);

 }
 
  //32
 function test32_frameTitlesDescribeFunction() {
 		
		$results = $this->getTest('32-1.html', 'frameTitlesDescribeFunction');
		$this->assertTrue($results[0]->element->tagName == 'frame');
	
		$results = $this->getTest('32-2.html', 'frameTitlesDescribeFunction');
		$this->assertTrue($results[0]->element->tagName == 'frame');

		$results = $this->getTest('32-3.html', 'frameTitlesDescribeFunction');
		$this->assertTrue($results[0]->element->tagName == 'frame');

 }
 
  //33
 function test33_frameSrcIsAccessible() {
 		
		$results = $this->getTest('33-1.html', 'frameSrcIsAccessible');
		$this->assertTrue($results[0]->element->tagName == 'frame');
	
		$results = $this->getTest('32-2.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('32-3.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('32-4.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('32-5.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('32-6.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('32-7.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('32-8.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('32-9.html', 'frameSrcIsAccessible');
		$this->assertTrue(count($results) == 0);
		
 }
 
  //34
 function test34_frameRelationshipsMustBeDescribed() {
 		
		$results = $this->getTest('34-1.html', 'frameRelationshipsMustBeDescribed');
		$this->assertTrue($results[0]->element->tagName == 'frameset');
	
		$results = $this->getTest('34-2.html', 'frameRelationshipsMustBeDescribed');
		$this->assertTrue(count($results) == 0);

 }

  //35
 function test35_framesetMustHaveNoFramesSection() {
 		
		$results = $this->getTest('35-1.html', 'framesetMustHaveNoFramesSection');
		$this->assertTrue($results[0]->element->tagName == 'frameset');
	
		$results = $this->getTest('35-2.html', 'framesetMustHaveNoFramesSection');
		$this->assertTrue(count($results) == 0);

 }
 
  //36
 function test36_noframesSectionMustHaveTextEquivalent() {
 		
		$results = $this->getTest('36-1.html', 'noframesSectionMustHaveTextEquivalent');
		$this->assertTrue($results[0]->element->tagName == 'noframes');
	
		$results = $this->getTest('36-2.html', 'noframesSectionMustHaveTextEquivalent');
		$this->assertTrue($results[0]->element->tagName == 'frameset');

 }
 
  //37
 function test37_headerH1() {
 		
		$results = $this->getTest('37-1.html', 'headerH1');
		$this->assertTrue($results[0]->element->tagName == 'h3');
	
		$results = $this->getTest('37-2.html', 'headerH1');

		$this->assertTrue(count($results) == 0);

 }
 
  //38
 function test38_headerH2() {
 		
		$results = $this->getTest('38-1.html', 'headerH2');
		$this->assertTrue($results[0]->element->tagName == 'h4');

		$results = $this->getTest('38-2.html', 'headerH2');
		$this->assertTrue(count($results) == 0);

 }

  //39
 function test39_headerH3() {
 		
		$results = $this->getTest('39-1.html', 'headerH3');
		$this->assertTrue($results[0]->element->tagName == 'h5');
		
		$results = $this->getTest('39-2.html', 'headerH3');
		$this->assertTrue(count($results) == 0);

 }
 
  //40
 function test40_headerH4() {
 		
		$results = $this->getTest('40-1.html', 'headerH4');
		$this->assertTrue($results[0]->element->tagName == 'h6');
		
		$results = $this->getTest('40-2.html', 'headerH4');
		$this->assertTrue(count($results) == 0);

 }

  //41
 function test41_headerH5() {
 		
		$results = $this->getTest('41-1.html', 'headerH4');
		$this->assertTrue($results[0]->element->tagName == 'h6');
		
		$results = $this->getTest('41-2.html', 'headerH4');
		$this->assertTrue(count($results) == 0);

 }
 
  //42 - 47
  function test41_47_headerFormatting() {
  	for($i = 1; $i < 7; $i++) {
  	   $classname = 'headerH'. $i .'Format';
  	   $filename = ($i + 41) . '-1.html';
  	   $results = $this->getTest($filename, $classname);
  	   $this->assertTrue($results[0]->element->tagName == 'h'. $i);
  	
  	}
  }
  
  //48
  function test48_documentLangNotIdentified() {
		$results = $this->getTest('48-1.html', 'documentLangNotIdentified');
		$this->assertTrue($results[0]->pass == false);
		
		$results = $this->getTest('48-2.html', 'documentLangNotIdentified');
		$this->assertTrue(count($results) == 0);  	  
  }

  //49
  function test49_documentLangIsISO639Standard() {
		$results = $this->getTest('49-1.html', 'documentLangIsISO639Standard');
		if(isset($reuslts[0])) {
			$this->assertTrue($results[0]->pass == false);
		}
		$results = $this->getTest('49-2.html', 'documentLangIsISO639Standard');
		$this->assertTrue(count($results) == 0);  	  
  }

  //50
  function test50_documentHasTitleElement() {
		$results = $this->getTest('50-1.html', 'documentHasTitleElement');
		$this->assertTrue($results[0]->pass == false);  
	
		
		$results = $this->getTest('50-2.html', 'documentHasTitleElement');
		$this->assertTrue(count($results) == 0);  
  }

  //51
  function test51_documentTitleNotEmpty() {
		$results = $this->getTest('51-1.html', 'documentTitleNotEmpty');
		$this->assertTrue($results[0]->pass == false);  
	
		
		$results = $this->getTest('51-2.html', 'documentTitleNotEmpty');
		$this->assertTrue(count($results) == 0);  
		
		$results = $this->getTest('51-3.html', 'documentTitleNotEmpty');
		$this->assertTrue($results[0]->pass == false); 
  }

  //52
  function test52_documentTitleIsShort() {
		$results = $this->getTest('52-1.html', 'documentTitleIsShort');
		$this->assertTrue($results[0]->pass == false);  
	
		
		$results = $this->getTest('52-2.html', 'documentTitleIsShort');
		$this->assertTrue(count($results) == 0);  
  }

  //53
  function test53_documentTitleIsNotPlaceholder() {
		$results = $this->getTest('53-1.html', 'documentTitleIsNotPlaceholder');
		if(isset($results[0])) {
			$this->assertTrue($results[0]->pass == false);  
		}
		
		$results = $this->getTest('53-2.html', 'documentTitleIsNotPlaceholder');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('53-3.html', 'documentTitleIsNotPlaceholder');
		if(isset($results[0])) {
			$this->assertTrue($results[0]->pass == false);  
		}
		
		$results = $this->getTest('53-4.html', 'documentTitleIsNotPlaceholder');
		$this->assertTrue(!isset($results[0]->pass));   

		$results = $this->getTest('53-5.html', 'documentTitleIsNotPlaceholder');
		$this->assertTrue(!isset($results[0]->pass));   
  }
  
  //54
  function test54_documentTitleDescribesDocument() {
		$results = $this->getTest('54-1.html', 'documentTitleDescribesDocument');
		$this->assertTrue($results[0]->element->tagName == 'title');  
	
		
		$results = $this->getTest('54-2.html', 'documentTitleDescribesDocument');
		$this->assertTrue($results[0]->element->tagName == 'title');   
  }

  //55
  function test55_inputDoesNotUseColorAlone() {
		$results = $this->getTest('55-1.html', 'inputDoesNotUseColorAlone');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('55-2.html', 'inputDoesNotUseColorAlone');
		$this->assertTrue(count($results) == 0);  
  }
  
  //57
  function test57_inputTextHasLabel() {
		$results = $this->getTest('57-1.html', 'inputTextHasLabel');
		$this->assertTrue($results[0]->element->getAttribute('name') == 'firstname');  
	
		
		$results = $this->getTest('57-2.html', 'inputTextHasLabel');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('57-3.html', 'inputTextHasLabel');
		$this->assertTrue(count($results) == 0);  
		
		$results = $this->getTest('57-4.html', 'inputTextHasLabel');
		$this->assertTrue(count($results) == 0);  
  }
  
  //58
  function test58_inputImageHasAlt() {
		$results = $this->getTest('58-1.html', 'inputImageHasAlt');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('58-2.html', 'inputImageHasAlt');
		$this->assertTrue(count($results) == 0);  
  }

  //59
  function test59_inputImageAltIdentifiesPurpose() {
		$results = $this->getTest('59-1.html', 'inputImageAltIdentifiesPurpose');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('59-2.html', 'inputImageAltIdentifiesPurpose');
		$this->assertTrue($results[0]->element->tagName == 'input');  
  }

  //60
  function test60_inputImageAltIsShort() {
		$results = $this->getTest('60-1.html', 'inputImageAltIsShort');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('60-2.html', 'inputImageAltIsShort');
		$this->assertTrue(count($results) == 0);  
  }

  //61
  function test61_inputImageAltIsNotFileName() {
		$results = $this->getTest('61-1.html', 'inputImageAltIsNotFileName');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('61-2.html', 'inputImageAltIsNotFileName');
		$this->assertTrue(count($results) == 0);  
  }

  //62
  function test62_inputImageAltIsNotPlaceholder() {
		$results = $this->getTest('62-1.html', 'inputImageAltIsNotPlaceholder');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('62-2.html', 'inputImageAltIsNotPlaceholder');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('62-3.html', 'inputImageAltIsNotPlaceholder');
		$this->assertTrue($results[0]->element->tagName == 'input');  


		$results = $this->getTest('62-4.html', 'inputImageAltIsNotPlaceholder');
		$this->assertTrue($results[0]->element->tagName == 'input');  

  }
  
  //63
  function test63_inputTextHasValue() {
		$results = $this->getTest('63-1.html', 'inputTextHasValue');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('63-2.html', 'inputTextHasValue');
		$this->assertTrue(count($results) == 0);  
  }

  //64
  function test64_areaHasAltValue() {
		$results = $this->getTest('64-1.html', 'areaHasAltValue');
		$this->assertTrue($results[0]->element->tagName == 'area');  
	
		
		$results = $this->getTest('64-2.html', 'areaHasAltValue');
		$this->assertTrue(count($results) == 0);  
  }

  //65
  function test65_areaAltIdentifiesDestination() {
		$results = $this->getTest('65-1.html', 'areaAltIdentifiesDestination');
		$this->assertTrue($results[0]->element->tagName == 'area');  
	
		
		$results = $this->getTest('65-2.html', 'areaAltIdentifiesDestination');
		$this->assertTrue($results[0]->element->tagName == 'area');   
  }

  //66
  function test66_areaLinksToSoundFile() {
		$results = $this->getTest('66-1.html', 'areaLinksToSoundFile');
		$this->assertTrue($results[0]->element->tagName == 'area');  
	
		
		$results = $this->getTest('66-2.html', 'areaLinksToSoundFile');
		$this->assertTrue($results[0]->element->tagName == 'area');   
  }
  
  //68
  function test68_areaDontOpenNewWindow() {
		$results = $this->getTest('68-1.html', 'areaDontOpenNewWindow');
		$this->assertTrue($results[0]->element->tagName == 'area');  
		
		$results = $this->getTest('68-2.html', 'areaDontOpenNewWindow');
		$this->assertTrue(count($results) == 0);   

		$results = $this->getTest('68-3.html', 'areaDontOpenNewWindow');
		$this->assertTrue(count($results) == 0);   
		
		$results = $this->getTest('68-4.html', 'areaDontOpenNewWindow');
		$this->assertTrue(count($results) == 0);   
  }
  
  //69
  function test69_marqueeIsNotUsed() {
		$results = $this->getTest('69-1.html', 'marqueeIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'marquee');  
	
		
		$results = $this->getTest('69-2.html', 'marqueeIsNotUsed');
		$this->assertTrue(count($results) == 0);   
  }

  //70
  function test70_menuNotUsedToFormatText() {
		$results = $this->getTest('70-1.html', 'menuNotUsedToFormatText');
		$this->assertTrue($results[0]->element->tagName == 'menu');  
	
		
		$results = $this->getTest('70-2.html', 'menuNotUsedToFormatText');
		$this->assertTrue(count($results) == 0);   
  }

  //71
  function test71_documentAutoRedirectNotUsed() {
		$results = $this->getTest('71-1.html', 'documentAutoRedirectNotUsed');
		if(isset($reuslts[0])) {
			$this->assertTrue($results[0]->pass == false);  
	 	}
		
		$results = $this->getTest('71-2.html', 'documentAutoRedirectNotUsed');
		$this->assertTrue(count($results) == 0);   
  }

  //72
  function test72_documentMetaNotUsedWithTimeout() {
		$results = $this->getTest('72-1.html', 'documentMetaNotUsedWithTimeout');
		if(isset($results[0])) {
		 	$this->assertTrue($results[0]->pass == false);  
		}
		
		$results = $this->getTest('72-2.html', 'documentMetaNotUsedWithTimeout');
		$this->assertTrue(count($results) == 0);   

		$results = $this->getTest('72-2.html', 'documentMetaNotUsedWithTimeout');
		$this->assertTrue(count($results) == 0);  
  }

  //73
  function test73_objectDoesNotUseColorAlone() {
		$results = $this->getTest('73-1.html', 'objectDoesNotUseColorAlone');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('73-2.html', 'objectDoesNotUseColorAlone');
		$this->assertTrue(count($results) == 0);   
  }

  //74
  function test74_objectTextUpdatesWhenObjectChanges() {
		$results = $this->getTest('74-1.html', 'objectTextUpdatesWhenObjectChanges');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('74-2.html', 'objectTextUpdatesWhenObjectChanges');
		$this->assertTrue(count($results) == 0);   
  }

  //75
  function test75_objectContentUsableWhenDisabled() {
		$results = $this->getTest('75-1.html', 'objectContentUsableWhenDisabled');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('75-2.html', 'objectContentUsableWhenDisabled');
		$this->assertTrue(count($results) == 0);   
  }

  //76
  function test76_objectInterfaceIsAccessible() {
		$results = $this->getTest('76-1.html', 'objectInterfaceIsAccessible');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('76-2.html', 'objectInterfaceIsAccessible');
		$this->assertTrue(count($results) == 0);   
  }
  
  //77
  function test77_objectLinkToMultimediaHasTextTranscript() {
		$results = $this->getTest('77-1.html', 'objectLinkToMultimediaHasTextTranscript');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('77-2.html', 'objectLinkToMultimediaHasTextTranscript');
		$this->assertTrue(count($results) == 0);   
  }

  //78
  function test78_objectMustHaveTitle() {
		$results = $this->getTest('78-1.html', 'objectMustHaveTitle');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('78-2.html', 'objectMustHaveTitle');
		$this->assertTrue(count($results) == 0);   
  }

 //79
  function test79_objectMustHaveValidTitle() {
		$results = $this->getTest('79-1.html', 'objectMustHaveValidTitle');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('79-2.html', 'objectMustHaveValidTitle');
		$this->assertTrue($results[0]->element->tagName == 'object'); 

		$results = $this->getTest('79-3.html', 'objectMustHaveValidTitle');
		$this->assertTrue($results[0]->element->tagName == 'object'); 
  }

 //80
  function test80_objectMustContainText() {
		$results = $this->getTest('80-1.html', 'objectMustContainText');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('80-2.html', 'objectMustContainText');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('80-3.html', 'objectMustContainText');
		$this->assertTrue($results[0]->element->tagName == 'object'); 
  }

 //81
  function test81_listNotUsedForFormatting() {
		$results = $this->getTest('81-1.html', 'listNotUsedForFormatting');
		$this->assertTrue($results[0]->element->tagName == 'ol');  
	
		
		$results = $this->getTest('81-2.html', 'listNotUsedForFormatting');
		$this->assertTrue(count($results) == 0);
  }

 //82
  function test82_pNotUsedAsHeader() {
		$results = $this->getTest('82-1.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p');  
	
		
		$results = $this->getTest('82-2.html', 'pNotUsedAsHeader');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('82-3.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p'); 

		$results = $this->getTest('82-4.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p'); 

		$results = $this->getTest('82-5.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p'); 

		$results = $this->getTest('82-6.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p'); 

		$results = $this->getTest('82-7.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p'); 

		$results = $this->getTest('82-8.html', 'pNotUsedAsHeader');
		$this->assertTrue($results[0]->element->tagName == 'p'); 

		$results = $this->getTest('82-9.html', 'pNotUsedAsHeader');
		$this->assertTrue(count($results) == 0);

  }
  
  //86
  function test86_scriptsDoNotUseColorAlone() {
		$results = $this->getTest('86-1.html', 'scriptsDoNotUseColorAlone');
		$this->assertTrue($results[0]->element->tagName == 'script');  
	
		
		$results = $this->getTest('86-2.html', 'scriptsDoNotUseColorAlone');
		$this->assertTrue(count($results) == 0);
  }  

  //87
  function test87_scriptsDoNotFlicker() {
		$results = $this->getTest('87-1.html', 'scriptsDoNotFlicker');
		$this->assertTrue($results[0]->element->tagName == 'script');  
	
		
		$results = $this->getTest('87-2.html', 'scriptsDoNotFlicker');
		$this->assertTrue(count($results) == 0);
  }  

  //88
  function test88_scriptContentAccessibleWithScriptsTurnedOff() {
		$results = $this->getTest('88-1.html', 'scriptContentAccessibleWithScriptsTurnedOff');
		$this->assertTrue($results[0]->element->tagName == 'script');  
	
		
		$results = $this->getTest('88-2.html', 'scriptContentAccessibleWithScriptsTurnedOff');
		$this->assertTrue(count($results) == 0);
  }

  //89
  function test89_scriptUIMustBeAccessible() {
		$results = $this->getTest('89-1.html', 'scriptUIMustBeAccessible');
		$this->assertTrue($results[0]->element->tagName == 'script');  
	
		
		$results = $this->getTest('89-2.html', 'scriptUIMustBeAccessible');
		$this->assertTrue(count($results) == 0);
  }

  //90
  function test90_scriptInBodyMustHaveNoscript() {
		$results = $this->getTest('90-1.html', 'scriptInBodyMustHaveNoscript');
		$this->assertTrue($results[0]->element->tagName == 'script');  
	
		
		$results = $this->getTest('90-2.html', 'scriptInBodyMustHaveNoscript');
		$this->assertTrue(count($results) == 0);
  }

  //91
  function test91_selectHasAssociatedLabel() {
		$results = $this->getTest('91-1.html', 'selectHasAssociatedLabel');
		$this->assertTrue($results[0]->element->tagName == 'select');  
	
		
		$results = $this->getTest('91-2.html', 'selectHasAssociatedLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('91-3.html', 'selectHasAssociatedLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('91-4.html', 'selectHasAssociatedLabel');
		$this->assertTrue(count($results) == 0);
  }

  //92
  function test92_selectDoesNotChangeContext() {
		$results = $this->getTest('92-1.html', 'selectDoesNotChangeContext');
		$this->assertTrue($results[0]->element->tagName == 'select');  
	
		
		$results = $this->getTest('92-2.html', 'selectDoesNotChangeContext');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('92-3.html', 'selectDoesNotChangeContext');
		$this->assertTrue($results[0]->element->tagName == 'select'); 
  }
  
  //93
  function test95_textareaHasAssociatedLabel() {
		$results = $this->getTest('95-1.html', 'textareaHasAssociatedLabel');
		$this->assertTrue($results[0]->element->tagName == 'textarea');  
	
		
		$results = $this->getTest('95-2.html', 'textareaHasAssociatedLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('95-3.html', 'textareaHasAssociatedLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('95-4.html', 'textareaHasAssociatedLabel');
		$this->assertTrue(count($results) == 0);
  }
  
  //96
   function test96_textareaLabelPositionedClose() {
		$results = $this->getTest('96-1.html', 'textareaLabelPositionedClose');
		$this->assertTrue($results[0]->element->tagName == 'textarea');  
	
		
		$results = $this->getTest('96-2.html', 'textareaLabelPositionedClose');
		$this->assertTrue($results[0]->element->tagName == 'textarea');
  } 


  //97
   function test97_cssDocumentMakesSenseStyleTurnedOff() {
		$results = $this->getTest('97-1.html', 'cssDocumentMakesSenseStyleTurnedOff');
		$this->assertTrue($results[0]->element->tagName == 'link');  
	
		
		$results = $this->getTest('97-2.html', 'cssDocumentMakesSenseStyleTurnedOff');
		$this->assertTrue(count($results) == 0);
  }   

  //98
   function test98_documentAbbrIsUsed() {
		$results = $this->getTest('98-1.html', 'documentAbbrIsUsed');
		$this->assertTrue($results[0]->element->tagName == 'p');  
	
		
		$results = $this->getTest('98-2.html', 'documentAbbrIsUsed');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('98-3.html', 'documentAbbrIsUsed');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('98-4.html', 'documentAbbrIsUsed');
		$this->assertTrue(count($results) == 0);

  }

  //99
   function test99_documentAcronymsHaveElement() {
		$results = $this->getTest('99-1.html', 'documentAcronymsHaveElement');
		$this->assertTrue($results[0]->element->tagName == 'p');  
	
		
		$results = $this->getTest('99-2.html', 'documentAcronymsHaveElement');
		$this->assertTrue(count($results) == 0);
  }

  //100
   function test100_blockquoteNotUsedForIndentation() {
		$results = $this->getTest('100-1.html', 'blockquoteNotUsedForIndentation');
		$this->assertTrue($results[0]->element->tagName == 'blockquote');  
	
		
		$results = $this->getTest('100-2.html', 'blockquoteNotUsedForIndentation');
		$this->assertTrue(count($results) == 0);
  }

  //102
   function test102_scriptOnclickRequiresOnKeypress() {
		$results = $this->getTest('102-1.html', 'scriptOnclickRequiresOnKeypress');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('102-2.html', 'scriptOnclickRequiresOnKeypress');
		$this->assertTrue(count($results) == 0);
  }

  //103
   function test103_scriptOndblclickRequiresOnKeypress() {
		$results = $this->getTest('103-1.html', 'scriptOndblclickRequiresOnKeypress');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('103-2.html', 'scriptOndblclickRequiresOnKeypress');
		$this->assertTrue(count($results) == 0);
  }

  //104
   function test104_scriptOnmousedownRequiresOnKeypress() {
		$results = $this->getTest('104-1.html', 'scriptOnmousedownRequiresOnKeypress');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('104-2.html', 'scriptOnmousedownRequiresOnKeypress');
		$this->assertTrue(count($results) == 0);
  }

  //105
   function test105_scriptOnmousemove() {
		$results = $this->getTest('105-1.html', 'scriptOnmousemove');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('105-2.html', 'scriptOnmousemove');
		$this->assertTrue(count($results) == 0);
  }


  //106
    function test106_scriptOnmouseoutHasOnmouseblur() {
		$results = $this->getTest('106-1.html', 'scriptOnmouseoutHasOnmouseblur');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('106-2.html', 'scriptOnmouseoutHasOnmouseblur');
		$this->assertTrue(count($results) == 0);
  }

  //107
    function test107_scriptOnmouseoverHasOnfocus() {
		$results = $this->getTest('107-1.html', 'scriptOnmouseoverHasOnfocus');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('107-2.html', 'scriptOnmouseoverHasOnfocus');
		$this->assertTrue(count($results) == 0);
  }

  //108
    function test108_scriptOnmouseupHasOnkeyup() {
		$results = $this->getTest('108-1.html', 'scriptOnmouseupHasOnkeyup');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('108-2.html', 'scriptOnmouseupHasOnkeyup');
		$this->assertTrue(count($results) == 0);
  }

  //109
    function test109_documentContentReadableWithoutStylesheets() {
		$results = $this->getTest('109-1.html', 'documentContentReadableWithoutStylesheets');
		$this->assertTrue($results[0]->pass === false);  
	
		
		$results = $this->getTest('109-2.html', 'documentContentReadableWithoutStylesheets');
		$this->assertTrue(count($results) == 0);
  }

  //110
    function test110_documentWordsNotInLanguageAreMarked() {
		$results = $this->getTest('110-1.html', 'documentWordsNotInLanguageAreMarked');
		$this->assertTrue($results[0]->pass === false);  
	
		
		$results = $this->getTest('110-2.html', 'documentWordsNotInLanguageAreMarked');
		$this->assertTrue($results[0]->pass === false);
  }

  //111
    function test111_tableComplexHasSummary() {
		$results = $this->getTest('111-1.html', 'tableComplexHasSummary');
		$this->assertTrue($results[0]->element->tagName == 'table');  
	
		
		$results = $this->getTest('111-2.html', 'tableComplexHasSummary');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('111-3.html', 'tableComplexHasSummary');
		$this->assertTrue(count($results) == 0);
  }

  //112
    function test112_tableSummaryIsEmpty() {
		$results = $this->getTest('112-1.html', 'tableSummaryIsEmpty');
		$this->assertTrue($results[0]->element->tagName == 'table');  
	
		
		$results = $this->getTest('112-2.html', 'tableSummaryIsEmpty');
		$this->assertTrue(count($results) == 0);

  }

  //113
    function test113_tableSummaryIsEmpty() {
		$results = $this->getTest('113-1.html', 'tableSummaryIsSufficient');
		$this->assertTrue($results[0]->element->tagName == 'table');  
	
		
		$results = $this->getTest('113-2.html', 'tableSummaryIsSufficient');
		$this->assertTrue(count($results) == 0);

  }

  //114
    function test114_tableLayoutHasNoSummary() {
		$results = $this->getTest('114-1.html', 'tableLayoutHasNoSummary');
		$this->assertTrue($results[0]->element->tagName == 'table');  
	
		
		$results = $this->getTest('114-2.html', 'tableLayoutHasNoSummary');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('114-3.html', 'tableLayoutHasNoSummary');
		$this->assertTrue(count($results) == 0);

  }

  //115
    function test115_tableLayoutHasNoCaption() {
		$results = $this->getTest('115-1.html', 'tableLayoutHasNoCaption');
		$this->assertTrue($results[0]->element->tagName == 'table');  
	
		
		$results = $this->getTest('115-2.html', 'tableLayoutHasNoCaption');
		$this->assertTrue(count($results) == 0);


  }

  //116
    function test116_boldIsNotUsed() {
		$results = $this->getTest('116-1.html', 'boldIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'bold');  
	
		
		$results = $this->getTest('116-2.html', 'boldIsNotUsed');
		$this->assertTrue(count($results) == 0);


  }

  //117
    function test117_iIsNotUsed() {
		$results = $this->getTest('117-1.html', 'iIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'i');  
	
		
		$results = $this->getTest('117-2.html', 'iIsNotUsed');
		$this->assertTrue(count($results) == 0);


  }

  //118
    function test118_passwordHasLabel() {
		$results = $this->getTest('118-1.html', 'passwordHasLabel');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('118-2.html', 'passwordHasLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('118-3.html', 'passwordHasLabel');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('118-4.html', 'passwordHasLabel');
		$this->assertTrue(count($results) == 0);

  }

  //119
    function test119_checkboxHasLabel() {
		$results = $this->getTest('119-1.html', 'checkboxHasLabel');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('119-2.html', 'checkboxHasLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('119-3.html', 'checkboxHasLabel');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('119-4.html', 'checkboxHasLabel');
		$this->assertTrue(count($results) == 0);

  }


  //120
    function test120_fileHasLabel() {
		$results = $this->getTest('120-1.html', 'fileHasLabel');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('120-2.html', 'fileHasLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('120-3.html', 'fileHasLabel');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('120-4.html', 'fileHasLabel');
		$this->assertTrue(count($results) == 0);

  }

  //121
    function test121_radioHasLabel() {
		$results = $this->getTest('121-1.html', 'radioHasLabel');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('121-2.html', 'radioHasLabel');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('121-3.html', 'radioHasLabel');
		$this->assertTrue(count($results) == 0);
		
		$results = $this->getTest('121-4.html', 'radioHasLabel');
		$this->assertTrue(count($results) == 0);

  }
  
  //122
    function test122_passwordLabelIsNearby() {
		$results = $this->getTest('122-1.html', 'passwordLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('122-2.html', 'passwordLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  


  }  

  //123
    function test123_checkboxLabelIsNearby() {
		$results = $this->getTest('123-1.html', 'checkboxLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('123-2.html', 'checkboxLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  


  } 

  //124
    function test124_fileLabelIsNearby() {
		$results = $this->getTest('124-1.html', 'fileLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('124-2.html', 'fileLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  


  }   

  //125
    function test125_radioIsNearby() {
		$results = $this->getTest('125-1.html', 'radioLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('125-2.html', 'radioLabelIsNearby');
		$this->assertTrue($results[0]->element->tagName == 'input');  
  } 

  //126
    function test126_inputTextValueNotEmpty() {
		$results = $this->getTest('126-1.html', 'inputTextValueNotEmpty');
		$this->assertTrue($results[0]->element->tagName == 'input');  
	
		
		$results = $this->getTest('126-2.html', 'inputTextValueNotEmpty');
		$this->assertTrue(count($results) == 0);  
  }
  
  //127 && 128
    function test127_objectWithClassIDHasNoText() {
		$results = $this->getTest('127-1.html', 'objectWithClassIDHasNoText');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('127-2.html', 'objectWithClassIDHasNoText');
		$this->assertTrue(count($results) == 0);  
  } 
  
  //129
  function test129_objectUIMustBeAccessible() {
		$results = $this->getTest('128-1.html', 'objectUIMustBeAccessible');
		$this->assertTrue($results[0]->element->tagName == 'object');  
	
		
		$results = $this->getTest('128-2.html', 'objectUIMustBeAccessible');
		$this->assertTrue($results[0]->element->tagName == 'object'); 
  } 
  
  //131
  function test131_blockquoteUseForQuotations() {
		$results = $this->getTest('131-1.html', 'blockquoteUseForQuotations');
		$this->assertTrue($results[0]->element->tagName == 'p');  
	
		
		$results = $this->getTest('131-2.html', 'blockquoteUseForQuotations');
		$this->assertTrue(count($results) == 0); 
  } 

  //132
  function test132_imageMapServerSide() {
		$results = $this->getTest('132-1.html', 'imageMapServerSide');
		$this->assertTrue($results[0]->element->tagName == 'img');  
	
		
		$results = $this->getTest('132-2.html', 'imageMapServerSide');
		$this->assertTrue($results[0]->element->tagName == 'img'); 
  } 

  //133
  function test133_tableLayoutMakesSenseLinearized() {
		$results = $this->getTest('133-1.html', 'tableLayoutMakesSenseLinearized');
		$this->assertTrue($results[0]->element->tagName == 'table');  
	
		
		$results = $this->getTest('133-2.html', 'tableLayoutMakesSenseLinearized');
		$this->assertTrue($results[0]->element->tagName == 'table'); 
  } 

  //134
  function test134_aLinksAreSeperatedByPrintableCharacters() {
		$results = $this->getTest('134-1.html', 'aLinksAreSeperatedByPrintableCharacters');
		$this->assertTrue($results[0]->element->tagName == 'a');  
		
		$results = $this->getTest('134-2.html', 'aLinksAreSeperatedByPrintableCharacters');
		$this->assertTrue(count($results) == 0); 
  } 

  //135
  function test135_imgWithMathShouldHaveMathEquivalent() {
		$results = $this->getTest('135-1.html', 'imgWithMathShouldHaveMathEquivalent');
		$this->assertTrue($results[0]->element->tagName == 'img');  
		
		$results = $this->getTest('135-2.html', 'imgWithMathShouldHaveMathEquivalent');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('135-2.xhtml', 'imgWithMathShouldHaveMathEquivalent');
		$this->assertTrue(count($results) == 0);
  } 

  //136
  function test136_tableDataShouldHaveTh() {
		$results = $this->getTest('136-1.html', 'tableDataShouldHaveTh');
		$this->assertTrue($results[0]->element->tagName == 'table');  
		
		$results = $this->getTest('136-2.html', 'tableDataShouldHaveTh');
		$this->assertTrue(count($results) == 0); 
  }
  
//137
  function test137_tableLayoutDataShouldNotHaveTh() {
		$results = $this->getTest('137-1.html', 'tableLayoutDataShouldNotHaveTh');
		$this->assertTrue($results[0]->element->tagName == 'table');  
		
		$results = $this->getTest('137-2.html', 'tableLayoutDataShouldNotHaveTh');
		$this->assertTrue(count($results) == 0); 
  }
  
//138
  function test138_inputTextHasTabIndex() {
		$results = $this->getTest('138-1.html', 'inputTextHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('138-2.html', 'inputTextHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  
		
		$results = $this->getTest('138-3.html', 'inputTextHasTabIndex');
		$this->assertTrue(count($results) == 0); 
  }

//139
  function test139_inputRadioHasTabIndex() {
		$results = $this->getTest('139-1.html', 'inputRadioHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('139-2.html', 'inputRadioHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  
		
		$results = $this->getTest('139-3.html', 'inputRadioHasTabIndex');
		$this->assertTrue(count($results) == 0); 
  }

//140
  function test140_inputPasswordHasTabIndex() {
		$results = $this->getTest('140-1.html', 'inputPasswordHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('140-2.html', 'inputPasswordHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  
		
		$results = $this->getTest('140-3.html', 'inputPasswordHasTabIndex');
		$this->assertTrue(count($results) == 0); 
  }

//141
  function test141_inputCheckboxHasTabIndex() {
		$results = $this->getTest('141-1.html', 'inputCheckboxHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('141-2.html', 'inputCheckboxHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  
		
		$results = $this->getTest('141-3.html', 'inputCheckboxHasTabIndex');
		$this->assertTrue(count($results) == 0); 
  }

//142
  function test142_inputFileHasTabIndex() {
		$results = $this->getTest('142-1.html', 'inputFileHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('142-2.html', 'inputFileHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');  
		
		$results = $this->getTest('142-3.html', 'inputFileHasTabIndex');
		$this->assertTrue(count($results) == 0); 
  }  

//143
  function test143_addressForAuthor() {
		$results = $this->getTest('143-1.html', 'addressForAuthor');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('143-2.html', 'addressForAuthor');
		$this->assertTrue(count($results) == 0); 
  }  

//144
  function test144_addressForAuthorMustBeValid() {
		$results = $this->getTest('144-1.html', 'addressForAuthorMustBeValid');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('144-2.html', 'addressForAuthorMustBeValid');
		$this->assertTrue(count($results) == 0); 
  }  
  
  //skipped 145-146 - redundant
  
  //147
  function test147_linkUsedToDescribeNavigation() {
		$results = $this->getTest('147-1.html', 'linkUsedToDescribeNavigation');
		//$this->assertTrue($results[0]->pass === false);  
		$results = $this->getTest('147-2.html', 'linkUsedToDescribeNavigation');
		$this->assertTrue(count($results) == 0);  
  } 

  //148
  function test148_linkUsedForAlternateContent() {
		$results = $this->getTest('148-1.html', 'linkUsedForAlternateContent');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('148-2.html', 'linkUsedForAlternateContent');
		$this->assertTrue(count($results) == 0);  
  } 

  //149 - SKIPPED
  
  //150
  function test150_liDontUseImageForBullet() {
		$results = $this->getTest('150-1.html', 'liDontUseImageForBullet');
		$this->assertTrue($results[0]->element->tagName == 'li');  

		$results = $this->getTest('150-2.html', 'liDontUseImageForBullet');
		$this->assertTrue(count($results) == 0);  
  }  

  //151
  function test151_tableUsesCaption() {
		$results = $this->getTest('151-1.html', 'tableUsesCaption');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('151-2.html', 'tableUsesCaption');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('151-3.html', 'tableUsesCaption');
		$this->assertTrue($results[0]->element->tagName == 'table');  
  }  
  //152
  function test152_tableUsesAbbreviationForHeader() {
		$results = $this->getTest('152-1.html', 'tableUsesAbbreviationForHeader');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('152-2.html', 'tableUsesAbbreviationForHeader');
		$this->assertTrue(count($results) == 0); 
 
		$results = $this->getTest('152-3.html', 'tableUsesAbbreviationForHeader');
		$this->assertTrue(count($results) == 0); 
  } 

  //153
  function test153_tableHeaderLabelMustBeTerse() {
		$results = $this->getTest('153-1.html', 'tableHeaderLabelMustBeTerse');
		$this->assertTrue($results[0]->element->tagName == 'th');  

		$results = $this->getTest('153-2.html', 'tableHeaderLabelMustBeTerse');
		$this->assertTrue(count($results) == 0); 
  }

  //154
  function test154_preShouldNotBeUsedForTabularLayout() {
		$results = $this->getTest('154-1.html', 'preShouldNotBeUsedForTabularLayout');
		$this->assertTrue($results[0]->element->tagName == 'pre');  

		$results = $this->getTest('154-2.html', 'preShouldNotBeUsedForTabularLayout');
		$this->assertTrue(count($results) == 0); 
  }
  
  //155-158 skipped
  
  //159
  function test159_imgShouldNotHaveTitle() {
		$results = $this->getTest('159-1.html', 'imgShouldNotHaveTitle');
		$this->assertTrue($results[0]->element->tagName == 'img');  

		$results = $this->getTest('159-2.html', 'imgShouldNotHaveTitle');
		$this->assertTrue(count($results) == 0); 
  }

  //160
  function test160_objectShouldHaveLongDescription() {
		$results = $this->getTest('160-1.html', 'objectShouldHaveLongDescription');
		$this->assertTrue($results[0]->element->tagName == 'object');  

		$results = $this->getTest('160-2.html', 'objectShouldHaveLongDescription');
		$this->assertTrue(count($results) == 0); 
  }

  //161
  function test161_emoticonsExcessiveUse() {
		$results = $this->getTest('161-1.html', 'emoticonsExcessiveUse');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('161-2.html', 'emoticonsExcessiveUse');
		$this->assertTrue(count($results) == 0); 
  }
  
  //162
  function test162_emoticonsMissingAbbr() {
		$results = $this->getTest('161-1.html', 'emoticonsMissingAbbr');
		$this->assertTrue($results[0]->element->tagName == 'p');  

		$results = $this->getTest('161-2.html', 'emoticonsMissingAbbr');
		$this->assertTrue(count($results) == 0); 
  }
  
  //163
  function test163_embedHasAssociatedNoEmbed() {
		$results = $this->getTest('163-1.html', 'embedHasAssociatedNoEmbed');
		$this->assertTrue($results[0]->element->tagName == 'embed');  

		$results = $this->getTest('163-2.html', 'embedHasAssociatedNoEmbed');
		$this->assertTrue(count($results) == 0); 
 
		$results = $this->getTest('163-3.html', 'embedHasAssociatedNoEmbed');
		$this->assertTrue(count($results) == 0); 
  } 

  //164
  function test164_noembedHasEquivalentContent() {
		$results = $this->getTest('164-1.html', 'noembedHasEquivalentContent');
		$this->assertTrue($results[0]->element->tagName == 'noembed');  

		$results = $this->getTest('164-2.html', 'noembedHasEquivalentContent');
		$this->assertTrue(count($results) == 0); 
  }

  //165
  function test165_embedMustHaveAltAttribute() {
		$results = $this->getTest('165-1.html', 'embedMustHaveAltAttribute');
		$this->assertTrue($results[0]->element->tagName == 'embed');  

		$results = $this->getTest('165-2.html', 'embedMustHaveAltAttribute');
		$this->assertTrue(count($results) == 0); 
  }

  //166
  function test166_embedMustNotHaveEmptyAlt() {
		$results = $this->getTest('166-1.html', 'embedMustNotHaveEmptyAlt');
		$this->assertTrue($results[0]->element->tagName == 'embed');  

		$results = $this->getTest('166-2.html', 'embedMustNotHaveEmptyAlt');
		$this->assertTrue(count($results) == 0); 
  }

  //167
  function test167_iframeMustNotHaveLongdesc() {
		$results = $this->getTest('167-1.html', 'iframeMustNotHaveLongdesc');
		$this->assertTrue($results[0]->element->tagName == 'iframe');  

		$results = $this->getTest('167-2.html', 'iframeMustNotHaveLongdesc');
		$this->assertTrue(count($results) == 0); 
  }

  //168
  function test168_radioMarkedWithFieldgroupAndLegend() {
		$results = $this->getTest('168-1.html', 'radioMarkedWithFieldgroupAndLegend');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('168-2.html', 'radioMarkedWithFieldgroupAndLegend');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('168-3.html', 'radioMarkedWithFieldgroupAndLegend');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('168-4.html', 'radioMarkedWithFieldgroupAndLegend');
		$this->assertTrue(count($results) == 0); 
  }
  
  //169
  function test169_selectWithOptionsHasOptgroup() {
		$results = $this->getTest('169-1.html', 'selectWithOptionsHasOptgroup');
		$this->assertTrue($results[0]->element->tagName == 'select');  

		$results = $this->getTest('169-2.html', 'selectWithOptionsHasOptgroup');
		$this->assertTrue(count($results) == 0); 
  } 
  
  //173
  function test173_aSuspiciousLinkText() {
		$results = $this->getTest('173-1.html', 'aSuspiciousLinkText');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('173-2.html', 'aSuspiciousLinkText');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('173-3.html', 'aSuspiciousLinkText');
		$this->assertTrue($results[0]->element->tagName == 'a'); 
  } 
  
  //174
  function test174_aMustContainText() {
		$results = $this->getTest('174-1.html', 'aMustContainText');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('174-2.html', 'aMustContainText');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('174-3.html', 'aMustContainText');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('174-4.html', 'aMustContainText');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('174-5.html', 'aMustContainText');
		$this->assertTrue(count($results) == 0); 

  }   

  
  //175
  function test175_aImgAltNotRepetative() {
		$results = $this->getTest('175-1.html', 'aImgAltNotRepetative');
		$this->assertTrue($results[0]->element->tagName == 'img');  

		$results = $this->getTest('175-2.html', 'aImgAltNotRepetative');
		$this->assertTrue(count($results) == 0); 
   }

  //176
  function test176_basefontIsNotUsed() {
		$results = $this->getTest('176-1.html', 'basefontIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'basefont');  

		$results = $this->getTest('176-2.html', 'basefontIsNotUsed');
		$this->assertTrue(count($results) == 0); 
   }

  //177
  function test177_fontIsNotUsed() {
		$results = $this->getTest('177-1.html', 'fontIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'font');  

		$results = $this->getTest('177-2.html', 'fontIsNotUsed');
		$this->assertTrue(count($results) == 0); 
   }
   
   //Skipped 178-179

  //180
  function test180_aAdjacentWithSameResourceShouldBeCombined() {
		$results = $this->getTest('180-1.html', 'aAdjacentWithSameResourceShouldBeCombined');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('180-2.html', 'aAdjacentWithSameResourceShouldBeCombined');
		$this->assertTrue(count($results) == 0); 
   }   
   
  //181 
  function test181_aMustNotHaveJavascriptHref() {
		$results = $this->getTest('181-1.html', 'aMustNotHaveJavascriptHref');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('181-2.html', 'aMustNotHaveJavascriptHref');
		$this->assertTrue(count($results) == 0); 
   }      

  //182 
  function test182_bodyMustNotHaveBackground() {
		$results = $this->getTest('182-1.html', 'bodyMustNotHaveBackground');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('182-2.html', 'bodyMustNotHaveBackground');
		$this->assertTrue(count($results) == 0); 
   }      

  //183
  function test183_objectMustHaveEmbed() {
		$results = $this->getTest('183-1.html', 'objectMustHaveEmbed');
		$this->assertTrue($results[0]->element->tagName == 'object');  

		$results = $this->getTest('183-2.html', 'objectMustHaveEmbed');
		$this->assertTrue(count($results) == 0); 
   }  

  //184
  function test184_siteMap() {
		$results = $this->getTest('184-1.html', 'siteMap');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('184-2.html', 'siteMap');
		$this->assertTrue(count($results) == 0); 
   } 
   
   //185
  function test185_documentIDsMustBeUnique() {
		$results = $this->getTest('185-1.html', 'documentIDsMustBeUnique');
		$this->assertTrue($results[0]->element->tagName == 'th');  

		$results = $this->getTest('185-2.html', 'documentIDsMustBeUnique');
		$this->assertTrue(count($results) == 0); 
   } 

   //186
  function test186_labelDoesNotContainInput() {
		$results = $this->getTest('186-1.html', 'labelDoesNotContainInput');
		$this->assertTrue($results[0]->element->tagName == 'label');  

		$results = $this->getTest('186-2.html', 'labelDoesNotContainInput');
		$this->assertTrue(count($results) == 0); 
   } 

   //187
  function test187_labelMustBeUnique() {
		$results = $this->getTest('187-1.html', 'labelMustBeUnique');
		$this->assertTrue($results[0]->element->tagName == 'label');  

		$results = $this->getTest('187-2.html', 'labelMustBeUnique');
		$this->assertTrue(count($results) == 0); 
   } 

   //188
  function test188_labelMustNotBeEmpty() {
		$results = $this->getTest('188-1.html', 'labelMustNotBeEmpty');
		$this->assertTrue($results[0]->element->tagName == 'label');  

		$results = $this->getTest('188-2.html', 'labelMustNotBeEmpty');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('188-3.html', 'labelMustNotBeEmpty');
		$this->assertTrue($results[0]->element->tagName == 'label');  

		$results = $this->getTest('188-3.html', 'labelMustNotBeEmpty');
		$this->assertTrue($results[0]->element->tagName == 'label');  
   } 

   //190
  function test190_aMustHaveTitle() {
		$results = $this->getTest('190-1.html', 'aMustHaveTitle');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('190-2.html', 'aMustHaveTitle');
		$this->assertTrue(count($results) == 0); 
   } 

   //191
  function test191_aTitleDescribesDestination() {
		$results = $this->getTest('191-1.html', 'aTitleDescribesDestination');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('191-2.html', 'aTitleDescribesDestination');
		$this->assertTrue($results[0]->element->tagName == 'a'); 
   } 

   //192
  function test192_inputImageAltNotRedundant() {
		$results = $this->getTest('192-1.html', 'inputImageAltNotRedundant');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('192-2.html', 'inputImageAltNotRedundant');
		$this->assertTrue(count($results) == 0);
   } 

   //193
  function test193_inputImageNotDecorative() {
		$results = $this->getTest('193-1.html', 'inputImageNotDecorative');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('193-2.html', 'inputImageNotDecorative');
		$this->assertTrue($results[0]->element->tagName == 'input');
   } 

   //194
  function test194_areaAltRefersToText() {
		$results = $this->getTest('194-1.html', 'areaAltRefersToText');
		$this->assertTrue($results[0]->element->tagName == 'area');  

		$results = $this->getTest('194-2.html', 'areaAltRefersToText');
		$this->assertTrue($results[0]->element->tagName == 'area');
   } 
   
   //195
  function test195_aLinkTextDoesNotBeginWithRedundantWord() {
		$results = $this->getTest('195-1.html', 'aLinkTextDoesNotBeginWithRedundantWord');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('195-2.html', 'aLinkTextDoesNotBeginWithRedundantWord');
		$this->assertTrue(count($results) == 0);

		$results = $this->getTest('195-3.html', 'aLinkTextDoesNotBeginWithRedundantWord');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('195-4.html', 'aLinkTextDoesNotBeginWithRedundantWord');
		$this->assertTrue(count($results) == 0);
   } 

   //196
  function test196_imgServerSideMapNotUsed() {
		$results = $this->getTest('196-1.html', 'imgServerSideMapNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'img');  

		$results = $this->getTest('196-2.html', 'imgServerSideMapNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'img');
   } 

	//Skipped 197
   //198
  function test198_legendDescribesListOfChoices() {
		$results = $this->getTest('198-1.html', 'legendDescribesListOfChoices');
		$this->assertTrue($results[0]->element->tagName == 'legend');  

		$results = $this->getTest('198-2.html', 'legendDescribesListOfChoices');
		$this->assertTrue($results[0]->element->tagName == 'legend');
   }    

   //199
  function test199_legendTextNotEmpty() {
		$results = $this->getTest('199-1.html', 'legendTextNotEmpty');
		$this->assertTrue($results[0]->element->tagName == 'legend');  

		$results = $this->getTest('199-2.html', 'legendTextNotEmpty');
		$this->assertTrue(count($results) == 0);
   } 

   //200
  function test200_legendTextNotPlaceholder() {
		$results = $this->getTest('200-1.html', 'legendTextNotPlaceholder');
		$this->assertTrue($results[0]->element->tagName == 'legend');  

		$results = $this->getTest('200-2.html', 'legendTextNotPlaceholder');
		$this->assertTrue(count($results) == 0);
   }

   //201
  function test201_frameTitlesNotEmpty() {
		$results = $this->getTest('201-1.html', 'frameTitlesNotEmpty');
		$this->assertTrue($results[0]->element->tagName == 'frame');  

		$results = $this->getTest('201-2.html', 'frameTitlesNotEmpty');
		$this->assertTrue(count($results) == 0);
   }

   //202
  function test202_frameTitlesNotPlaceholder() {
		$results = $this->getTest('202-1.html', 'frameTitlesNotPlaceholder');
		$this->assertTrue($results[0]->element->tagName == 'frame');  

		$results = $this->getTest('202-2.html', 'frameTitlesNotPlaceholder');
		$this->assertTrue(count($results) == 0);
   }

   //203
  function test203_tableSummaryDescribesTable() {
		$results = $this->getTest('203-1.html', 'tableSummaryDescribesTable');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('203-2.html', 'tableSummaryDescribesTable');
		$this->assertTrue($results[0]->element->tagName == 'table');  
   }

   //204-220 skipped  -  already covered in previous tests
   //221
  function test221_bodyColorContrast() {
		$results = $this->getTest('221-1.html', 'bodyColorContrast');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('221-2.html', 'bodyColorContrast');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('221-3.html', 'bodyColorContrast');
		$this->assertTrue(count($results) == 0); 
   }

   //222
  function test222_bodyLinkColorContrast() {
		$results = $this->getTest('222-1.html', 'bodyLinkColorContrast');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('222-2.html', 'bodyLinkColorContrast');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('222-3.html', 'bodyLinkColorContrast');
		$this->assertTrue(count($results) == 0); 
   }

   //223
  function test223_bodyActiveLinkColorContrast() {
		$results = $this->getTest('223-1.html', 'bodyActiveLinkColorContrast');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('223-2.html', 'bodyActiveLinkColorContrast');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('223-3.html', 'bodyActiveLinkColorContrast');
		$this->assertTrue(count($results) == 0); 
   }

   //224
  function test224_bodyVisitedLinkColorContrast() {
		$results = $this->getTest('224-1.html', 'bodyVisitedLinkColorContrast');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('224-2.html', 'bodyVisitedLinkColorContrast');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('224-3.html', 'bodyVisitedLinkColorContrast');
		$this->assertTrue(count($results) == 0); 
   }

   //225
  function test225_documentStrictDocType() {

		$results = $this->getTest('225-1.html', 'documentStrictDocType');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('225-2.html', 'documentStrictDocType');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('225-3.html', 'documentStrictDocType');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('225-4.html', 'documentStrictDocType');
		$this->assertTrue($results[0]->pass === false);
	
		$results = $this->getTest('225-5.html', 'documentStrictDocType');
		$this->assertTrue($results[0]->pass === false);
   }

   //226
  function test226_documentColorWaiAlgorithim() {

		$results = $this->getTest('226-1.html', 'documentColorWaiAlgorithim');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('226-2.html', 'documentColorWaiAlgorithim');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('226-3.html', 'documentColorWaiAlgorithim');
		$this->assertTrue(count($results) == 0); 
	}

   //227
  function test227_documentColorWaiLinkAlgorithim() {

		$results = $this->getTest('227-1.html', 'documentColorWaiLinkAlgorithim');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('227-2.html', 'documentColorWaiLinkAlgorithim');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('227-3.html', 'documentColorWaiLinkAlgorithim');
		$this->assertTrue(count($results) == 0); 
	}

   //228
  function test228_documentColorWaiActiveLinkAlgorithim() {

		$results = $this->getTest('228-1.html', 'documentColorWaiActiveLinkAlgorithim');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('228-2.html', 'documentColorWaiActiveLinkAlgorithim');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('228-3.html', 'documentColorWaiActiveLinkAlgorithim');
		$this->assertTrue(count($results) == 0); 
	}

   //229
  function test229_documentColorWaiVisitedLinkAlgorithim() {

		$results = $this->getTest('229-1.html', 'documentColorWaiVisitedLinkAlgorithim');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('229-2.html', 'documentColorWaiVisitedLinkAlgorithim');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('229-3.html', 'documentColorWaiVisitedLinkAlgorithim');
		$this->assertTrue(count($results) == 0); 
	}

   //230
  function test230_tableIsGrouped() {

		$results = $this->getTest('230-1.html', 'tableIsGrouped');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('230-2.html', 'tableIsGrouped');
		$this->assertTrue(count($results) == 0); 
  }

   //231
  function test231_tableUseColGroup() {

		$results = $this->getTest('231-1.html', 'tableUseColGroup');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('231-2.html', 'tableUseColGroup');
		$this->assertTrue(count($results) == 0); 
  }

   //232
  function test232_documentValidatesToDocType() {

		$results = $this->getTest('232-1.html', 'documentValidatesToDocType');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('232-2.html', 'documentValidatesToDocType');
		$this->assertTrue($results[0]->pass === false);  
  }

   //233
  function test233_framesetIsNotUsed() {

		$results = $this->getTest('233-1.html', 'framesetIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'frameset');  

		$results = $this->getTest('232-2.html', 'framesetIsNotUsed');
		$this->assertTrue(count($results) == 0); 
  }

   //234
  function test234_frameIsNotUsed() {

		$results = $this->getTest('234-1.html', 'frameIsNotUsed');
		$this->assertTrue($results[0]->element->tagName == 'frame');  

		$results = $this->getTest('234-2.html', 'frameIsNotUsed');
		$this->assertTrue(count($results) == 0); 
  }

   //235
  function test235_documentReadingDirection() {

		$results = $this->getTest('235-1.html', 'documentReadingDirection');
		$this->assertTrue($results[0]->element->tagName == 'blockquote');  

		$results = $this->getTest('235-2.html', 'documentReadingDirection');
		$this->assertTrue(count($results) == 0); 
  }

   //236
  function test236_aAdjacentDontPointToSameResource() {

		$results = $this->getTest('236-1.html', 'aAdjacentWithSameResourceShouldBeCombined');
		$this->assertTrue($results[0]->element->tagName == 'a');  

		$results = $this->getTest('236-2.html', 'aAdjacentWithSameResourceShouldBeCombined');
		$this->assertTrue(count($results) == 0); 

		$results = $this->getTest('236-1.html', 'aAdjacentWithSameResourceShouldBeCombined');
		$this->assertTrue($results[0]->element->tagName == 'a'); 
  }
  
  //skipped 237
  
    //238
  function test238_inputElementsDontHaveAlt() {

		$results = $this->getTest('238-1.html', 'inputElementsDontHaveAlt');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('238-2.html', 'inputElementsDontHaveAlt');
		$this->assertTrue(count($results) == 0);  
  }
  
  //skipped 239 & 240
  
  
  //241
  function test241_tabularDataIsInTable() {

		$results = $this->getTest('241-1.html', 'tabularDataIsInTable');
		$this->assertTrue($results[0]->element->tagName == 'pre');  

		$results = $this->getTest('241-2.html', 'tabularDataIsInTable');
		$this->assertTrue(count($results) == 0);  
  } 

  //242
  function test242_tableCaptionIdentifiesTable() {

		$results = $this->getTest('242-1.html', 'tableCaptionIdentifiesTable');
		$this->assertTrue($results[0]->element->tagName == 'caption');  

		$results = $this->getTest('242-2.html', 'tableCaptionIdentifiesTable');
		$this->assertTrue($results[0]->element->tagName == 'caption'); 
  } 

  //243
  function test243_tableSummaryDoesNotDuplicateCaption() {

		$results = $this->getTest('243-1.html', 'tableSummaryDoesNotDuplicateCaption');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('243-2.html', 'tableSummaryDoesNotDuplicateCaption');
		$this->assertTrue(count($results) == 0);  
  } 

  //244
  function test244_tableWithBothHeadersUseScope() {

		$results = $this->getTest('244-1.html', 'tableWithBothHeadersUseScope');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('244-2.html', 'tableWithBothHeadersUseScope');
		$this->assertTrue(count($results) == 0);  
  } 

  //245
  function test245_tableWithMoreHeadersUseID() {

		$results = $this->getTest('245-1.html', 'tableWithMoreHeadersUseID');
		$this->assertTrue($results[0]->element->tagName == 'table');  

		$results = $this->getTest('245-2.html', 'tableWithMoreHeadersUseID');
		$this->assertTrue(count($results) == 0);  
  } 

  //246
  function test246_formWithRequiredLabel() {

		$results = $this->getTest('246-1.html', 'formWithRequiredLabel');
		$this->assertTrue($results[0]->element->tagName == 'label');  

		$results = $this->getTest('246-2.html', 'formWithRequiredLabel');
		$this->assertTrue(count($results) == 0);   

		$results = $this->getTest('246-3.html', 'formWithRequiredLabel');
		$this->assertTrue(count($results) == 0);   

		$results = $this->getTest('246-4.html', 'formWithRequiredLabel');
		$this->assertTrue($results[0]->element->tagName == 'form'); 

		$results = $this->getTest('246-5.html', 'formWithRequiredLabel');
		$this->assertTrue($results[0]->element->tagName == 'form'); 
  } 

  //247
  function test247_inputCheckboxRequiresFieldset() {

		$results = $this->getTest('247-1.html', 'inputCheckboxRequiresFieldset');
		$this->assertTrue($results[0]->element->tagName == 'input');  

		$results = $this->getTest('247-2.html', 'inputCheckboxRequiresFieldset');
		$this->assertTrue(count($results) == 0);  
  } 

  //248
  function test248_documentVisualListsAreMarkedUp() {

		$results = $this->getTest('248-1.html', 'documentVisualListsAreMarkedUp');
		$this->assertTrue($results[0]->element->tagName == 'p');  

		$results = $this->getTest('248-2.html', 'documentVisualListsAreMarkedUp');
		$this->assertTrue(count($results) == 0);  
  } 

   //skipped 249 - 250 - 251 
   
   //252
  function test252_documentAllColorsAreSet() {

		$results = $this->getTest('252-1.html', 'documentAllColorsAreSet');
		$this->assertTrue($results[0]->pass === false);  

		$results = $this->getTest('252-2.html', 'documentAllColorsAreSet');
		$this->assertTrue(count($results) == 0);  

		$results = $this->getTest('252-3.html', 'documentAllColorsAreSet');
		$this->assertTrue(count($results) == 0); 
  }    
   
  //258
  function test258_appletProvidesMechanismToReturnToParent() {

		$results = $this->getTest('258-1.html', 'appletProvidesMechanismToReturnToParent');
		$this->assertTrue($results[0]->element->tagName == 'applet');     

		$results = $this->getTest('258-2.html', 'appletProvidesMechanismToReturnToParent');
		$this->assertTrue($results[0]->element->tagName == 'applet');
   } 

  //259
  function test259_objectProvidesMechanismToReturnToParent() {

		$results = $this->getTest('259-1.html', 'objectProvidesMechanismToReturnToParent');
		$this->assertTrue($results[0]->element->tagName == 'object');     

		$results = $this->getTest('259-2.html', 'objectProvidesMechanismToReturnToParent');
		$this->assertTrue($results[0]->element->tagName == 'object');
   } 

  //260
  function test260_embedProvidesMechanismToReturnToParent() {

		$results = $this->getTest('260-1.html', 'embedProvidesMechanismToReturnToParent');
		$this->assertTrue($results[0]->element->tagName == 'embed');     

		$results = $this->getTest('260-2.html', 'embedProvidesMechanismToReturnToParent');
		$this->assertTrue($results[0]->element->tagName == 'embed');
   } 



  //261
  function test261_headersUseToMarkSections() {

		$results = $this->getTest('261-1.html', 'headersUseToMarkSections');
		$this->assertTrue($results[0]->element->tagName == 'p');     

		$results = $this->getTest('261-2.html', 'headersUseToMarkSections');
		$this->assertTrue(count($results) == 0 );
		
		$results = $this->getTest('261-3.html', 'headersUseToMarkSections');
		$this->assertTrue(count($results) == 0 );
   } 
   //skipped 262-263
   
  //264
  function test264_inputSubmitHasTabIndex() {

		$results = $this->getTest('264-1.html', 'inputSubmitHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');     

		$results = $this->getTest('264-2.html', 'inputSubmitHasTabIndex');
		$this->assertTrue($results[0]->element->tagName == 'input');     

		$results = $this->getTest('264-3.html', 'inputSubmitHasTabIndex');
		$this->assertTrue(count($results) == 0 );
   }   
  
  //265
  function test264_tabIndexFollowsLogicalOrder() {

		$results = $this->getTest('265-1.html', 'tabIndexFollowsLogicalOrder');
		$this->assertTrue($results[0]->element->tagName == 'input');     

		$results = $this->getTest('265-2.html', 'tabIndexFollowsLogicalOrder');
		$this->assertTrue(count($results) == 0 );
  }
  
  //267
  
  //268
  function test268_formHasGoodErrorMessage() {

		$results = $this->getTest('268-1.html', 'formHasGoodErrorMessage');
		$this->assertTrue($results[0]->element->tagName == 'form');     

		$results = $this->getTest('268-2.html', 'formHasGoodErrorMessage');
		$this->assertTrue($results[0]->element->tagName == 'form');     
  }

  //269
  function test269_formErrorMessageHelpsUser() {

		$results = $this->getTest('269-1.html', 'formErrorMessageHelpsUser');
		$this->assertTrue($results[0]->element->tagName == 'form');     

		$results = $this->getTest('269-2.html', 'formErrorMessageHelpsUser');
		$this->assertTrue($results[0]->element->tagName == 'form');     
  }

  //270
  function test270_formAllowsCheckIfIrreversable() {

		$results = $this->getTest('269-1.html', 'formAllowsCheckIfIrreversable');
		$this->assertTrue($results[0]->element->tagName == 'form');     

		$results = $this->getTest('269-2.html', 'formAllowsCheckIfIrreversable');
		$this->assertTrue($results[0]->element->tagName == 'form');     
  }
  
  //skipped 271

  //271
  function test271_documentReadingDirection() {

		$results = $this->getTest('271-1.html', 'documentReadingDirection');
		$this->assertTrue($results[0]->element->tagName == 'span');     

		$results = $this->getTest('271-2.html', 'documentReadingDirection');
		$this->assertTrue(count($results) == 0);     
  }

  //272
  function test272_formDeleteIsReversable() {

		$results = $this->getTest('272-1.html', 'formDeleteIsReversable');
		$this->assertTrue($results[0]->element->tagName == 'form');     

		$results = $this->getTest('272-2.html', 'formDeleteIsReversable');
		$this->assertTrue($results[0]->element->tagName == 'form');     
  }

  //273 - 276 skipped
}

$tests = &new TestOfTests();
$tests->run(new HtmlReporter());


