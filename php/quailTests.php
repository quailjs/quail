<?php

//namespace Quail\Tests;

class QuailSelectorTest extends QuailTest {
  
  protected $selector;
  
  function __construct($selector, $document, $path) {
    $this->selector = $selector;
    parent::__construct($document, $path);
  }
}

class aAdjacentWithSameResourceShouldBeCombined extends QuailCustomTest {
  function run() {
    foreach($this->q('a') as $el) {
      if(pq($el)->next('a')->attr('href') == pq($el)->attr('href')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class appletContainsTextEquivalent extends QuailCustomTest {
  function run() {
    foreach($this->q('applet[alt=], applet:not(applet[alt])') as $el) {
      if(!strlen(trim(pq($el)->text()))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class aImgAltNotRepetative extends QuailCustomTest {
  function run() {
    foreach($this->q('a img[alt]') as $el) {
      if(trim(pq($el)->attr('alt')) == trim(pq($el)->parent('a')->text())) {
        $this->objects[] = pq($el)->parent('a');
      }
    }
  }
}

class aLinkTextDoesNotBeginWithRedundantWord extends QuailCustomTest {
  
  protected $redundant;
  
  function run() {
    $this->getRedundantString();
    foreach($this->q('a') as $el) {
      $text = '';
      if(pq($el)->find('img:first')->length) {
        $text = pq($el)->find('img:first')->attr('alt');
      }
      $text .= pq($el)->text();
      $text = strtolower($text);
      foreach($this->redundant as $phrase) {
        if(strpos($text, $phrase) !== FALSE) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
  
  protected function getRedundantString() {
    global $quail_redundant_text;
    if(!$quail_redundant_text) {
      $quail_redundant_text = (array)json_decode(file_get_contents('../../resources/strings/redundant.json'));
    }
    $this->redundant = (array)$quail_redundant_text['link'];
  }
}

class aLinksAreSeperatedByPrintableCharacters extends QuailCustomTest {
  function run() {
    foreach($this->q('a') as $el) {
		  if(pq($el)->next('a')->length && $this->isUnreadable($el->nextSibling->wholeText)) {
  		  $this->objects[] = pq($el);
  		}
	  }
  }
}

class aMustContainText extends QuailCustomTest {
  
  function run() {
    foreach($this->q('a') as $el) {
      if(!$this->containsReadableText(pq($el)) && !(pq($el)->attr('name') && !pq($el)->attr('href'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class aSuspiciousLinkText extends QuailCustomTest {
  
  private $suspicious;
  
  function run() {
    $this->getStrings();
    foreach($this->q('a') as $el) {
      if(in_array(trim(pq($el)->text()), $this->suspicious)) {
        $this->objects[] = pq($el);
      }
    }
  }
  
  protected function getStrings() {
    global $quail_supicious_text;
    if(!$quail_supicious_text) {
      $quail_supicious_text = (array)json_decode(file_get_contents('../../resources/strings/suspicious_links.json'));
    }
    $this->suspicious = $quail_supicious_text;
  }

}

class blockquoteUseForQuotations extends QuailCustomTest {

	function run() {
		foreach($this->q('p') as $el) {
			if(in_array(substr(trim(pq($el)->text()), 0, 1), array('"', "'")) &&
			   in_array(substr(trim(pq($el)->text()), -1, 1), array('"', "'"))) {
				$this->objects[] = pq($el);
			}
		}
	}

}

class documentAbbrIsUsed extends QuailCustomTest {
  
  protected $acronym_tag = 'abbr';
  
  function run() {
    foreach($this->q($this->acronym_tag .'[title]') as $el) {
			$predefined[strtoupper(trim(pq($el)->text()))] = pq($el)->attr('title');
		}
		$already_reported = array();
		foreach($this->q('p, div, h1, h2, h3, h4, h5') as $el) {
			$words = explode(' ', pq($el)->text());
			if(count($words) > 1 && strtoupper(pq($el)->text()) != pq($el)->text()) {
				foreach($words as $word) {
					$word = preg_replace("/[^a-zA-Zs]/", "", $word);
					if(strtoupper($word) == $word && strlen($word) > 1 && !isset($predefined[strtoupper($word)]))

						if(!isset($already_reported[strtoupper($word)])) {
							$this->objects[] = pq($el);
						}
						$already_reported[strtoupper($word)] = true;
				}
			}
		}
  }
}

class documentAcronymsHaveElement extends documentAbbrIsUsed {
  
  protected $acronym_tag = 'acronym';
}

class documentIDsMustBeUnique extends QuailCustomTest {
  function run() {
    $ids = array();
    foreach ($this->q('*[id]') as $el) {
      if(isset($ids[pq($el)->attr('id')])) {
        $this->objects[] = pq($el);
      }
      $ids[pq($el)->attr('id')] = pq($el)->attr('id');
    }
  }
}

class documentIsReadable extends QuailCustomTest {
  function run() {
    foreach($this->q('body *') as $el) {
      if(strlen(trim(strip_tags(pq($el)->text()))) || 
         strlen(trim(strip_tags(pq($el)->attr('alt'))))) {
        return;
      }
    }
    $this->objects[] = $this->q('body:first');
  }
}

class documentLangIsISO639Standard extends QuailCustomTest {
  
  protected $langauges;
  
  function run() {
    $this->getLanguages();
    if(!in_array(strtolower(pq('html:first')->attr('lang')), $this->langauges)) {
      $this->objects[] = pq('html:first');
    }
  }
  
  protected function getLanguages() {
    global $quail_languages;
    if(!$quail_languages) {
      $quail_languages = (array)json_decode(file_get_contents('../../resources/strings/language_codes.json'));
    }
    $this->langauges = $quail_languages;
  } 
}

class doctypeProvided extends QuailCustomTest {
  
  function run() {
    if(!$this->document->document->doctype->publicId) {
			$this->objects[] = pq('html');
		}
  }
}

class documentStrictDocType extends QuailCustomTest {
  function run() {
    if(strpos(strtolower($this->document->document->doctype->publicId), 'strict') === FALSE && strpos(strtolower($this->document->document->doctype->systemId), 'strict') === FALSE) {
			$this->objects[] = pq('html');
		}
  }
}

class documentValidatesToDocType extends QuailCustomTest {
  function run() {
    if(!@$this->document->document->validate()) {
			$this->objects[] = pq('html');
    }
  }
}

class documentTitleIsShort extends QuailCustomTest {
  
  function run() {
    if(strlen(trim(pq('head title:first')->text())) > 150) {
      $this->objects[] = pq('head title:first');
    }
  }
}

class documentVisualListsAreMarkedUp extends QuailCustomTest {
  
  protected $list_cues = array('*', '<br>*', '¥', '&#8226');
  
  function run() {
    foreach($this->q('p, div, h1, h2, h3, h4, h5, h6') as $el) {
      foreach($this->list_cues as $cue) {
				$first = stripos(pq($el)->text(), $cue);
				$second = strripos(pq($el)->text(), $cue);
				if($first && $second && $first != $second) {
					$this->objects[] = pq($el);
				}
			}
    }
  }
}

class embedHasAssociatedNoEmbed extends QuailCustomTest {
  function run() {
    if($this->q('noembed')->length) {
      return null;
    }
    foreach($this->q('embed') as $el) {
      $this->objects[] = pq($el);
    }
  }
}

class emoticonsExcessiveUse extends QuailCustomTest {

  protected $emoticons;
  
  function run() {
    $this->getEmoticons();
    foreach($this->q('p, div, h1, h2, h3, h4, h5, h6') as $el) {
			$count = 0;
			$words = explode(' ', pq($el)->text());
			foreach($words as $word) {
				if(in_array(trim($word), $this->emoticons)) {
					$count++;
					if($count > 4) { 
						$this->objects[] = pq($el);	
					}
				}
			}
		}
  }
  
  function getEmoticons() {
    global $quail_emoticons;
    if(!$quail_emoticons) {
      $quail_emoticons = (array)json_decode(file_get_contents('../../resources/strings/emoticons.json'));
    }
    $this->emoticons = $quail_emoticons;
  }
}

class emoticonsMissingAbbr extends emoticonsExcessiveUse {
  
  function run() {
    $this->getEmoticons();
    foreach($this->q('p, div, h1, h2, h3, h4, h5,h6') as $el) {
			$clone = pq($el)->clone();
			$clone->remove('abbr, acronym');
			$words = explode(' ', $clone->text());
			foreach($words as $word) {
				if(in_array($word, $this->emoticons)) {
					$count++;
					if($count > 4) {
						$this->objects[] = pq($el);	
					}
				}
			}
		}
  }
}

class headersUseToMarkSections extends QuailCustomTest {
  function run() {
    foreach($this->q('p') as $el) {
      $set = false;
      foreach(pq($el)->find('strong:first, em:first, i:first, b:first') as $indicator) {
        if(trim(pq($el)->text()) == trim(pq($indicator)->text())) {
          $this->objects[] = pq($el);
          $set = true;
        }
      }
      if(!$set) {
        if(pq($el)->css('font-weight') == 'bold') {
          $this->objects[] = pq($el);
        } 
      }
    }
  }
}

class inputImageAltIsShort extends QuailCustomTest {
  function run() {
    foreach($this->q('input[type=image][alt]') as $el) {
      if(strlen(trim(pq($el)->attr('alt'))) > 150) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class inputImageAltIsNotFileName extends QuailCustomTest {
  function run() {
    foreach($this->q('input[type=image][alt]') as $el) {
      if(pq($el)->attr('alt') == pq($el)->attr('src')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class inputImageAltNotRedundant extends QuailCustomTest {
  
  protected $redundant;
  
  function run() {
    $this->getRedundantString();
    foreach($this->q('input[type=image][alt]') as $el) {
      if(in_array(strtolower(trim(pq($el)->attr('alt'))), $this->redundant)) {
        $this->objects[] = pq($el);
      }
    }
  }
  
  protected function getRedundantString() {
    global $quail_redundant_text;
    if(!$quail_redundant_text) {
      $quail_redundant_text = (array)json_decode(file_get_contents('../../resources/strings/redundant.json'));
    }
    $this->redundant = (array)$quail_redundant_text['inputImage'];
  }
}

class imgAltIsDifferent extends QuailCustomTest {
  
  function run() {
    foreach($this->q('img') as $el) {
      if(pq($el)->attr('src') == pq($el)->attr('alt')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgAltIsTooLong extends QuailCustomTest {
  
  function run() {
    foreach($this->q('img[alt]') as $el) {
      if(strlen(pq($el)->attr('alt')) > 100) {
        $this->objects[] = pq($el);
      }
    }
  }
  
}

class imgImportantNoSpacerAlt extends QuailCustomTest {
  
  function run() {
    foreach($this->q('img[alt]') as $el) {
      if($this->isUnreadable(pq($el)->attr('alt')) && 
         intval(pq($el)->css('width')) > 50 &&
         intval(pq($el)->css('height')) > 50
         ) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgGifNoFlicker extends QuailCustomTest {
  
  var $gif_control_extension = "/21f904[0-9a-f]{2}([0-9a-f]{4})[0-9a-f]{2}00/";
  
  function run() {
    foreach($this->q('img[src$=.gif]') as $el) {
      $path = $this->getPath(pq($el)->attr('src'));
      if($this->validURL($path)) {
        $file = file_get_contents($path);
  			if($file) {
  				  $file = bin2hex($file);
  				
  				  // sum all frame delays
  				  $total_delay = 0;
  				  preg_match_all($this->gif_control_extension, $file, $matches);
  				  foreach ($matches[1] as $match) {
  				    // convert little-endian hex unsigned ints to decimals
  				    $delay = hexdec(substr($match,-2) . substr($match, 0, 2));
  				    if ($delay == 0) $delay = 1;
  				    $total_delay += $delay;
  				  }
  				
  				  // delays are stored as hundredths of a second, lets convert to seconds
  				  
  				 
  			  if($total_delay > 0) {
            $this->objects[] = pq($el);
          }
  			}
  		}
    }
  }
}

class imgHasLongDesc extends QuailCustomTest {
  
  function run() {
    foreach($this->q('img[longdesc]') as $el) {
      if(pq($el)->attr('longdesc') == pq($el)->attr('alt') ||
        !$this->validURL(pq($el)->attr('longdesc'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgAltTextNotRedundant extends QuailCustomTest {
  function run() {
    $alts = array();
    foreach($this->q('img[alt]') as $el) {
      $alt = md5(strtolower(trim(pq($el)->attr('alt'))));
      if(isset($alts[$alt]) && pq($el)->attr('src') != $alts[$alt]) {
        $this->objects[] = pq($el);
      }
      $alts[$alt] = pq($el)->attr('src');
    }
  }
}

class imgAltNotEmptyInAnchor extends QuailCustomTest {
  
  function run() {
    foreach($this->q('a img') as $el) {
      if(!$el->hasAttribute('alt') || $this->isUnreadable(pq($el)->attr('alt'))) {
        if($this->isUnreadable(pq($el)->parent('a:first')->html())) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
}

class imgWithMathShouldHaveMathEquivalent extends QuailCustomTest {
  function run() {
    foreach($this->q('img:not(img:has(math), img:has(tagName))') as $el) {
      if(!pq($el)->parent()->find('math')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class labelMustBeUnique extends QuailCustomTest {
  function run() {
    $labels = array();
    foreach($this->q('label[for]') as $el) {
      if(isset($labels[pq($el)->attr('for')])) {
        $this->objects[] = pq($el);
      }
      $labels[pq($el)->attr('for')] = pq($el)->attr('for');
    }
  }
}

class listNotUsedForFormatting extends QuailCustomTest {
  function run() {
    foreach($this->q('ol, ul') as $el) {
      if(pq($el)->find('li')->length < 2) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class preShouldNotBeUsedForTabularLayout extends QuailCustomTest {
  function run() {
    foreach($this->q('pre') as $el) {
      $rows = preg_split('/[\n\r]+/', pq($el)->text());
			if(count($rows) > 1 && (strpos(pq($el)->text(), "\t") !== FALSE || strpos(pq($el)->text(), '  ') !== FALSE)) {
				$this->objects[] = pq($el);
		  }
    }
  }
}

class tabIndexFollowsLogicalOrder extends QuailCustomTest {
  
  function run() {
    $index = 0;
		foreach($this->q('*[tabindex]') as $el) {
			if(is_numeric(pq($el)->attr('tabindex'))
				&& intval(pq($el)->attr('tabindex')) != $index + 1) {
					$this->objects[] = pq($el);
		  }
			$index++;
		}
  }
}

class tableLayoutHasNoSummary extends QuailCustomTest {
  
  function run() {
    foreach($this->q('table[summary]') as $el) {
      if(!$this->isDataTable(pq($el)) && !$this->isUnreadable(pq($el)->attr('summary'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableLayoutHasNoCaption extends QuailCustomTest {
  
  function run() {
    foreach($this->q('table') as $el) {
      if(!$this->isDataTable(pq($el)) && pq($el)->find('caption')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableLayoutMakesSenseLinearized extends QuailCustomTest {
  
  function run() {
    foreach($this->q('table') as $el) {
      if(!$this->isDataTable(pq($el))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableLayoutDataShouldNotHaveTh extends QuailCustomTest {
  function run() {
    foreach($this->q('table') as $el) {
      if(!$this->isDataTable(pq($el)) && pq($el)->find('th')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableUsesAbbreviationForHeader extends QuailCustomTest {
  function run() {
    foreach($this->q('th:not(th[abbr])') as $el) {
      if(strlen(trim(pq($el)->text())) > 20) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableHeaderLabelMustBeTerse extends QuailCustomTest {
  function run() {
    foreach($this->q('th, table tr:first td') as $el) {
      if(strlen(trim(pq($el)->text())) > 20 && (!$el->hasAttribute('abbr') || strlen(trim(pq($el)->attr('abbr'))) > 20)) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableSummaryDoesNotDuplicateCaption extends QuailCustomTest {
  
  function run() {
    foreach($this->q('table[summary]:has(caption)') as $el) {
      if(strtolower(trim(pq($el)->attr('summary'))) == strtolower(trim(pq($el)->find('caption:first')->text()))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableWithMoreHeadersUseID extends QuailCustomTest {
  function run() {
    foreach($this->q('table:has(th)') as $el) {
      $rows = 0;
      foreach($this->q($el)->find('tr') as $tr) {
        if(pq($tr)->find('th')) {
          $rows++;
        }
        if($rows > 1 && !pq($tr)->find('th[id]')->length) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
}

class tabularDataIsInTable extends QuailCustomTest {
  function run() {
    foreach($this->q('pre') as $el) {
      if(strpos(pq($el)->text(), "\t") !== FALSE) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class formWithRequiredLabel extends QuailCustomTest {
  
  protected $redundant;
  
  function run() {
    $this->loadString();
    $labels = array();
    $last_style = false;
    foreach($this->q('label') as $el) {
      $text = strtolower(pq($el)->text());
      foreach($this->redundant as $required_text) {
        if(strpos($text, $required_text) !== false) {
          if(!pq('#'. pq($el)->attr('for'))->attr('aria-required')) {
            $this->objects[] = pq($el);
          }
        }
      }
      $current_style = $this->getStyleHash(pq($el));
      if($last_style && ($current_style != $last_style)) {
        $this->objects[] = pq($el);
      }
      $last_style = $current_style;
    }
  }
  
  function getStyleHash($el) {
    return md5($el->css('color') . $el->css('font-weight'));
  }
  
  protected function loadString() {
    global $quail_redundant_text;
    if(!$quail_redundant_text) {
      $quail_redundant_text = (array)json_decode(file_get_contents('../../resources/strings/redundant.json'));
    }
    
    $this->redundant = (array)$quail_redundant_text['required'];
  }
}

class inputCheckboxRequiresFieldset extends QuailCustomTest {
  function run() {
    foreach($this->q('input[type=checkbox]') as $el) {
      if(!pq($el)->parents('fieldset')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgMapAreasHaveDuplicateLink extends QuailCustomTest {
  
  function run() {
    $links = array();
    foreach($this->q('a') as $el) {
      $links[pq($el)->attr('href')] = pq($el)->attr('href');
    }
    foreach($this->q('img[usemap]') as $el) {
      $map = (pq(pq($el)->attr('usemap'))->length)
             ? pq(pq($el)->attr('usemap'))
             : pq('map[name='. str_replace('#', '', pq($el)->attr('usemap')) .']');
      
      if($map) {
        foreach($map->find('area') as $area) {
          if(!in_array(pq($area)->attr('href'), $links)) {
            $this->objects[] = pq($el);
          }
        }
      }
    }
  }
}

class siteMap extends QuailCustomTest {
  function run() {
    $this->loadString();
    foreach($this->q('a') as $el) {
      $text = trim(strtolower(pq($el)->text()));
      foreach($this->strings as $string) {
        if(strpos($text, $string) !== FALSE) {
          return;
        }
      }
    }
    $this->objects[] = pq($el);
  }
  
  protected function loadString() {
    global $quail_map_text;
    if(!$quail_map_text) {
      $quail_map_text = (array)json_decode(file_get_contents('../../resources/strings/site_map.json'));
    }
    
    $this->strings = $quail_map_text;
  }
}

class tableUseColGroup extends QuailCustomTest {
  function run() {
    foreach($this->q('table') as $el) {
      if($this->isDataTable(pq($el)) && !pq($el)->find('colgroup')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}


class pNotUsedAsHeader extends QuailCustomTest {
  
  protected $suspectTags = array('strong', 'b', 'em', 'i', 'u', 'font');
  
  protected $suspectCSS = array('color', 'font-weight', 'font-size', 'font-family');
  
  protected $requiresTextAnalysis = true;
  
  function run() {
    $priorCSS = array();
    $textAnalysis = new TextStatistics();
    foreach($this->q('p') as $el) {
      if($textAnalysis->sentence_count(pq($el)->text()) < 3) {
        if(in_array(strtolower(pq($el)->find('*:first-child')->get(0)->tagName), $this->suspectTags)
           && pq($el)->find('*:first-child')->text() == pq($el)->text()) {
            $this->objects[] = pq($el);
        }
        foreach($this->suspectCSS as $css) {
          if(array_key_exists($css, $priorCSS) && pq($el)->css($css) != $priorCSS[$css]) {
            $this->objects[] = pq($el);
          }
          $priorCSS[$css] = pq($el)->css($css);
        }
        if(pq($el)->css('font-weight') == 'bold') {
          $this->objects[] = pq($el);
        }
      }      
    }
  }
}

class textIsNotSmall extends QuailCustomTest {
  function run() {
    foreach($this->q('body *') as $el) {
      $size = pq($el)->css('font-size');
      if($size = $this->convertFontSize($size) && $size < 11) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class selectJumpMenus extends QuailCustomTest {

  function run() {
    foreach($this->q('select') as $el) {
      if(pq($el)->parents('form')->length == 0 ||
         pq($el)->parents('form')->find('input[type=submit]')->length == 0) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class QuailLabelTest extends QuailCustomTest {
  
  function run() {
    foreach($this->q($this->options['selector']) as $el) {
      if(!pq($el)->parent('label')->length) {
        if(!pq($el)->attr('id') || pq('label[for='. str_replace('#', '', pq($el)->attr('id')) .']')->length == 0) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
}

class QuailLabelProximityTest extends QuailCustomTest {
  
  function run() {
    foreach($this->q($this->options['selector']) as $el) {
      $label = pq('label[for='. str_replace('#', '', pq($el)->attr('id')) .']');
      if(!$label) {
        return;
      }
      if(pq($el)->parent(':first') != pq($label)->parent(':first')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class QuailHeaderTest extends QuailCustomTest {
  
  function run() {
    $current = intval(substr($this->options['selector'], -1, 1));
    $next_heading = false;
    foreach($this->q('h1, h2, h3, h4, h5, h6') as $el) {
      
      $number = intval(substr($el->tagName, -1, 1));
      if($next_heading && ($number - 1 > $current || $number + 1 < $current)) {
        $this->objects[] = pq($el);
      }
      if($number == $current) {
        $next_heading = $el;
      }
      if($next_heading && $number != $current) {
        $next_heading = false;
      }
    }
  }
}

class QuailEventTest extends QuailCustomTest {
  
  function run() {
    foreach($this->q($this->options['selector']) as $el) {
      if(pq($el)->attr($this->options['searchEvent'])) {
        if(!isset($this->options['correspondingEvent']) || !pq($el)->attr($this->options['correspondingEvent'])) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
  
}

class QuailColorTest extends QuailCustomTest {
  
  protected $color_names;
  
  function run() {
    $this->getColorNames();
    foreach($this->q($this->options['selector']) as $el) {
      if(pq($el)->css('color') && pq($el)->css('background-color')) {   
        if($this->options['algorithim'] == 'wai') {
          if(!$this->compareWAIColors(pq($el)->css('color'), pq($el)->css('background-color'))) {
            $this->objects[] = pq($el);
          }
        }
        if($this->options['algorithim'] == 'wcag') {
          if(!$this->compareWCAGColors(pq($el)->css('color'), pq($el)->css('background-color'))) {
            $this->objects[] = pq($el);
          }
        }
      }
    }
    if(isset($this->options['bodyForegroundAttribute']) && isset($this->options['bodyBackgroundAttribute'])) {
      $foreground = pq('body:first')->attr($this->options['bodyForegroundAttribute']);
      $background = pq('body:first')->attr($this->options['bodyBackgroundAttribute']);
      if(!$foreground) {
        $foreground = '#000000';
      }
      if(!$background) {
        $background = '#ffffff';
      }
      if($this->options['algorithim'] == 'wai') {
        if(!$this->compareWAIColors($foreground, $background)) {
          $this->objects[] = pq($el);
        }
      }
      if($this->options['algorithim'] == 'wcag') {
        if(!$this->compareWCAGColors($foreground, $background)) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
  
  protected function compareWAIColors($foreground, $background) {
    if( $this->getWaiErtContrast($foreground, $background) < 500 || 
        $this->getWaiErtBrightness($foreground, $background) < 125 ) {
			return false;
	  }
	  return true;
  }
  
  protected function compareWCAGColors($foreground, $background) {
    if($this->getLuminosity($foreground, $background) < 5) {
    	return false;
	  }
	  return true;
  }
  
  protected function getColorNames() {
    global $quail_color_text;
    if(!$quail_color_text) {
      $quail_color_text = (array)json_decode(file_get_contents('../../resources/strings/colors.json'));
    }
    $this->color_names = $quail_color_text;
  }
  
  /**
	*	Helper method that finds the luminosity between the provided
	*	foreground and background parameters.
	*	@param string $foreground The HEX value of the foreground color
	*	@param string $background The HEX value of the background color
	*	@return float The luminosity contrast ratio between the colors
	*/
	function getLuminosity($foreground, $background) {
		if($foreground == $background) return 0;
		$fore_rgb = $this->getRGB($foreground);
		$back_rgb = $this->getRGB($background);
		return $this->luminosity($fore_rgb['r'], $back_rgb['r'],
							    $fore_rgb['g'], $back_rgb['g'],
							    $fore_rgb['b'], $back_rgb['b']);
	}
	
	/**
	*	Returns the luminosity between two colors
	*	@param string $r The first Red value
	*	@param string $r2 The second Red value
	*	@param string $g The first Green value
	*	@param string $g2 The second Green value
	*	@param string $b The first Blue value
	*	@param string $b2 The second Blue value
	*	@return float The luminosity contrast ratio between the colors
	*/
	function luminosity($r,$r2,$g,$g2,$b,$b2) {
		$RsRGB = $r/255;
		$GsRGB = $g/255;
		$BsRGB = $b/255;
		$R = ($RsRGB <= 0.03928) ? $RsRGB/12.92 : pow(($RsRGB+0.055)/1.055, 2.4);
		$G = ($GsRGB <= 0.03928) ? $GsRGB/12.92 : pow(($GsRGB+0.055)/1.055, 2.4);
		$B = ($BsRGB <= 0.03928) ? $BsRGB/12.92 : pow(($BsRGB+0.055)/1.055, 2.4);
	
		$RsRGB2 = $r2/255;
		$GsRGB2 = $g2/255;
		$BsRGB2 = $b2/255;
		$R2 = ($RsRGB2 <= 0.03928) ? $RsRGB2/12.92 : pow(($RsRGB2+0.055)/1.055, 2.4);
		$G2 = ($GsRGB2 <= 0.03928) ? $GsRGB2/12.92 : pow(($GsRGB2+0.055)/1.055, 2.4);
		$B2 = ($BsRGB2 <= 0.03928) ? $BsRGB2/12.92 : pow(($BsRGB2+0.055)/1.055, 2.4);
	
		if ($r+$g+$b <= $r2+$g2+$b2) {
		$l2 = (.2126 * $R + 0.7152 * $G + 0.0722 * $B);
		$l1 = (.2126 * $R2 + 0.7152 * $G2 + 0.0722 * $B2);
		} else {
		$l1 = (.2126 * $R + 0.7152 * $G + 0.0722 * $B);
		$l2 = (.2126 * $R2 + 0.7152 * $G2 + 0.0722 * $B2);
		}
		
		$luminosity = round(($l1 + 0.05)/($l2 + 0.05),2);
		return $luminosity;
	}


	/**
	*	Returns the decimal equivalents for a HEX color
	*	@param string $color The hex color value
	*	@return array An array where 'r' is the Red value, 'g' is Green, and 'b' is Blue
	*/
	function getRGB($color) {
		$color =  $this->convertColor($color);
		$c = str_split($color, 2);
		if(count($c) != 3) {
			return false;
		}
		$results = array('r' => hexdec($c[0]), 'g' => hexdec($c[1]), 'b' => hexdec($c[2]));
		return $results;
	}
	
	/**
	*	Converts multiple color or backround styles into a simple hex string
	*	@param string $color The color attribute to convert (this can also be a multi-value css background value)
	*	@return string A standard CSS hex value for the color
	*/
	function convertColor($color) {
		$color = trim($color);
		if(strpos($color, ' ') !== false) {
			$colors = explode(' ', $color);
			foreach($colors as $background_part) {
				if(substr(trim($background_part), 0, 1) == '#' ||
					in_array(trim($background_part), array_keys($this->color_names)) ||
					strtolower(substr(trim($background_part), 0, 3)) == 'rgb') {
						$color = $background_part;
					}
			}
		}
		//Normal hex color
		if(substr($color, 0, 1) == '#') {
			if(strlen($color) == 7) {
				return str_replace('#', '', $color);
			}
			elseif (strlen($color == 4)) {
				return substr($color, 1, 1).substr($color, 1, 1).
					   substr($color, 2, 1).substr($color, 2, 1).
					   substr($color, 3, 1).substr($color, 3, 1);
			}
		}
		//Named Color
		if(in_array($color, array_keys($this->color_names))) {
			return $this->color_names[$color];
		}
		//rgb values
		if(strtolower(substr($color, 0, 3)) == 'rgb') {
			$colors = explode(',', trim(str_replace('rgb(', '', $color), '()'));
			
			$r = intval($colors[0]); 
			$g = intval($colors[1]);
		    $b = intval($colors[2]);
		
		    $r = dechex($r<0?0:($r>255?255:$r));
		    $g = dechex($g<0?0:($g>255?255:$g));
		    $b = dechex($b<0?0:($b>255?255:$b));
		
		    $color = (strlen($r) < 2?'0':'').$r;
		    $color .= (strlen($g) < 2?'0':'').$g;
		    $color .= (strlen($b) < 2?'0':'').$b; 
		    return $color;
		}
	}
	
	/**
	*	Returns the WAIERT contrast between two colors
	*	@see GetLuminosity	
	*/
	function getWaiErtContrast($foreground, $background) {
		$fore_rgb = $this->getRGB($foreground);
		$back_rgb = $this->getRGB($background);
		$diffs = $this->getWaiDiffs($fore_rgb, $back_rgb);
		
		return $diffs['red'] + $diffs['green'] + $diffs['blue'];
	}
	
	/**
	*	Returns the WAI ERT Brightness between two colors
	*	
	*/
	function getWaiErtBrightness($foreground, $background) {
		$fore_rgb = $this->getRGB($foreground);
		$back_rgb = $this->getRGB($background);
		$color = $this->getWaiDiffs($fore_rgb, $back_rgb);
		return (($color['red'] * 299) + ($color['green'] * 587) + ($color['blue'] * 114)) / 1000;
	}
	
	function getWaiDiffs($fore_rgb, $back_rgb) {
		$red_diff = ($fore_rgb['r'] > $back_rgb['r']) 
						? $fore_rgb['r'] - $back_rgb['r'] 
						: $back_rgb['r'] - $fore_rgb['r'];
		$green_diff = ($fore_rgb['g'] > $back_rgb['g']) 
						? $fore_rgb['g'] - $back_rgb['g'] 
						: $back_rgb['g'] - $fore_rgb['g'];		

		$blue_diff = ($fore_rgb['b'] > $back_rgb['b']) 
						? $fore_rgb['b'] - $back_rgb['b'] 
						: $back_rgb['b'] - $fore_rgb['b'];
		return array('red' => $red_diff, 'green' => $green_diff, 'blue' => $blue_diff);
	}
}

class QuailPlaceholderTest extends QuailCustomTest {
  
  protected $placeholders;
  
  function run() {
    $this->getPlaceholders();
    foreach($this->q($this->options['selector']) as $el) {
      if($this->options['attribute']) {
        $attr = $this->options['attribute'];
        if($this->options['empty'] && $this->isUnreadable(pq($el)->attr($attr))) {
          $this->objects[] = pq($el);
        }
        if (strlen(pq($el)->attr($attr)) && (
          in_array(pq($el)->attr($attr), $this->placeholders) ||
          preg_match("/^([0-9]*)(k|kb|mb|k bytes|k byte)?$/", strtolower(pq($el)->attr($attr))))) {
            $this->objects[] = pq($el);
        }
        
      }
      elseif($this->options['content']) {
        if(isset($this->options['empty']) && $this->options['empty'] && $this->isUnreadable(pq($el)->text())) {
          $this->objects[] = pq($el);
        }
        if(in_array(trim(pq($el)->text()), $this->placeholders)) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
  
  protected function getPlaceholders() {
    global $quail_placeholder_text;
    if(!$quail_placeholder_text) {
      $quail_placeholder_text = json_decode(file_get_contents('../../resources/strings/placeholders.json'));
    }
    $this->placeholders = $quail_placeholder_text;
  }
}