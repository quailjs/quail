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
    foreach(pq('a') as $el) {
      if(pq($el)->next('a')->attr('href') == pq($el)->attr('href')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class appletContainsTextEquivalent extends QuailCustomTest {
  function run() {
    foreach(pq('applet[alt=], applet:not(applet[alt])') as $el) {
      if(!strlen(trim(pq($el)->text()))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class aImgAltNotRepetative extends QuailCustomTest {
  function run() {
    foreach(pq('a img[alt]') as $el) {
      if(trim(pq($el)->attr('alt')) == trim(pq($el)->parent('a')->text())) {
        $this->objects[] = pq($el)->parent('a');
      }
    }
  }
}

class aLinkTextDoesNotBeginWithRedundantWord extends QuailCustomTest {
  
  protected $redundant;
  
  function run() {
    foreach(pq('a') as $el) {
      $text = '';
      if(pq($el)->find('img:first')->length) {
        $text = pq($el)->find('img:first')->text();
      }
      $text .= pq($el)->text();
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
      $quail_redundant_text = json_decode(file_get_contents('../../resources/strings/redundant.json'));
    }
    
    $this->redundant = (array)$quail_redundant_text['inputImage'];
  }
}

class aLinksAreSeperatedByPrintableCharacters extends QuailCustomTest {
  function run() {
    foreach(pq('a') as $el) {
		  $this->objects[] = pq($el);
	  }
  }
}

class aMustContainText extends QuailCustomTest {
  
  function run() {
    foreach(pq('a') as $el) {
      if(!$this->containsReadableText(pq($el))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class aSuspiciousLinkText extends QuailCustomTest {
  
  private $suspicious;
  
  function run() {
    $this->getStrings();
    foreach(pq('a') as $el) {
      if(in_array(trim(strip_tags(pq($el)->html())), $this->suspicious)) {
        $this->objects[] = pq($el);
      }
    }
  }
  
  protected function getStrings() {
    $this->suspicious = json_decode(file_get_contents('../../resources/strings/suspicious_links.json'));
  }

}

class blockquoteUseForQuotations extends QuailCustomTest {

	function run() {
		foreach(pq('p') as $el) {
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
    foreach(pq($this->acronym_tag .'[title]') as $el) {
			$predefined[strtoupper(trim(pq($el)->text()))] = pq($el)->attr('title');
		}
		$already_reported = array();
		foreach(pq('p, div, h1, h2, h3, h4, h5') as $el) {
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

class documentLangIsISO639Standard extends QuailCustomTest {
  
  protected $langauges;
  
  function run() {
    if(!in_array(strtolower(pq('html:first')->attr('lang')), $this->langauges)) {
      $this->objects[] = pq('html:first');
    }
  }
  
  protected function getLanguages() {
    global $quail_languages;
    if(!$quail_languages) {
      $quail_languages = json_decode(file_get_contents('../../resources/strings/language_codes.json'));
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
    if(strpos(strtolower($this->document->document->doctype->publicId), 'strict') === FALSE) {
			$this->objects[] = pq('html');
		}
  }
}

class documentValidatesToDocType extends QuailCustomTest {
  function run() {
    if(!@$this->document->validate()) {
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
    foreach(pq('p, div, h1, h2, h3, h4, h5, h6') as $el) {
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

class emoticonsExcessiveUse extends QuailCustomTest {

  protected $emoticons;
  
  function run() {
    $this->getEmoticons();
    foreach(pq('p, div, h1, h2, h3, h4, h5,h6') as $el) {
			$words = explode(' ', pq($el)->text());
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
    foreach(pq('p, div, h1, h2, h3, h4, h5,h6') as $el) {
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

class inputImageAltNotRedundant extends QuailCustomTest {
  
  protected $redundant;
  
  function run() {
    $this->getRedundantString();
    foreach(pq('input[type=image][alt]') as $el) {
      if(in_array(strtolower(trim(pq($el)->attr('alt'))), $this->redundant_strings)) {
        $this->objects[] = pq($el);
      }
    }
  }
  
  protected function getRedundantString() {
    global $quail_redundant_text;
    if(!$quail_redundant_text) {
      $quail_redundant_text = json_decode(file_get_contents('../../resources/strings/redundant.json'));
    }
    
    $this->redundant = (array)$quail_redundant_text['inputImage'];
  }
}

class imgAltIsDifferent extends QuailCustomTest {
  
  function run() {
    foreach(pq('img') as $el) {
      if(pq($el)->attr('src') == pq($el)->attr('alt')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgAltIsTooLong extends QuailCustomTest {
  
  function run() {
    foreach(pq('img[alt]') as $el) {
      if(strlen(pq($el)->attr('alt')) > 100) {
        $this->objects[] = pq($el);
      }
    }
  }
  
}

class imgImportantNoSpacerAlt extends QuailCustomTest {
  
  function run() {
    foreach(pq('img[alt]') as $el) {
      if($this->unreadable(pq($el)->attr('alt')) && 
         $el->hasAttribute('width') &&
         $el->hasAttribute('height') &&
         intval(pq($el)->attr('width')) > 50 &&
         intval(pq($el)->attr('height')) > 50
         ) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgGifNoFlicker extends QuailCustomTest {
  
  var $gif_control_extension = "/21f904[0-9a-f]{2}([0-9a-f]{4})[0-9a-f]{2}00/";
  
  function run() {
    foreach(pq('img[src$=.gif]') as $el) {
      $file = file_get_contents($this->getPath(pq($el)->attr('src')));
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

class imgHasLongDesc extends QuailCustomTest {
  
  function run() {
    foreach(pq('img[longdesc]') as $el) {
      if(pq($el)->attr('longdesc') == pq($el)->attr('alt') ||
        !$this->validURL(pq($el)->attr('longdesc'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class imgAltNotEmptyInAnchor extends QuailCustomTest {
  
  function run() {
    foreach(pq('a img') as $el) {
      if(!$el->hasAttribute('alt') || $this->unreadable(pq($el)->attr('alt'))) {
        if($this->unreadable(pq($el)->parent('a:first')->html())) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
}

class labelMustBeUnique extends QuailCustomTest {
  function run() {
    $labels = array();
    foreach(pq('label[for]') as $el) {
      if(isset($labels[pq($el)->attr('for')])) {
        $this->objects[] = pq($el);
      }
      $labels[pq($el)->attr('for')] = pq($el)->attr('for');
    }
  }
}

class listNotUsedForFormatting extends QuailCustomTest {
  function run() {
    foreach(pq('ol, li') as $el) {
      if(pq($el)->children()->length < 2) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class preShouldNotBeUsedForTabularLayout extends QuailCustomTest {
  function run() {
    foreach(pq('pre') as $el) {
      $rows = preg_split('/[\n\r]+/', pq($el)->text);
			if(count($rows) > 1 && strpos(pq($el)->text(), array('  ', "\t"))) {
				$this->objects[] = pq($el);
		  }
    }
  }
}

class tabIndexFollowsLogicalOrder extends QuailCustomTest {
  
  function run() {
    $index = 0;
		foreach(pq('input, textarea, select') as $el) {
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
    foreach(pq('table[summary]') as $el) {
      if(!$this->isDataTable(pq($el))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableLayoutHasNoCaption extends QuailCustomTest {
  
  function run() {
    foreach(pq('table') as $el) {
      if(!$this->isDataTable(pq($el)) && pq($el)->find('caption')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableLayoutMakesSenseLinearized extends QuailCustomTest {
  
  function run() {
    foreach(pq('table') as $el) {
      if(!$this->isDataTable(pq($el))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableLayoutDataShouldNotHaveTh extends QuailCustomTest {
  function run() {
    foreach(pq('table') as $el) {
      if(!$this->isDataTable(pq($el)) && pq($el)->find('th')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableUsesAbbreviationForHeader extends QuailCustomTest {
  function run() {
    foreach(pq('th, table tr:first td') as $el) {
      if(!pq($el)->find('abbr, acronym')->length && strlen(trim(pq($el)->text())) > 20) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableHeaderLabelMustBeTerse extends QuailCustomTest {
  function run() {
    foreach(pq('th, table tr:first td') as $el) {
      if(strlen(trim(pq($el)->text())) > 20) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableSummaryDoesNotDuplicateCaption extends QuailCustomTest {
  
  function run() {
    foreach(pq('table[summary]:has(caption)') as $el) {
      if(strtolower(trim(pq($el)->attr('summary'))) == strtolower(trim(pq($el)->find('caption:first')->text()))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class tableWithMoreHeadersUseID extends QuailCustomTest {
  function run() {
    foreach(pq('table:has(th)') as $el) {
      $rows = 0;
      foreach(pq($el)->find('tr') as $tr) {
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
    foreach(pq('div, p') as $el) {
      if(strpos(pq($el)->text(), "\t") !== FALSE) {
        $this->objects[] = pq($el);
      }
    }
    foreach(pq('pre') as $el) {
      $this->objects[] = pq($el);
    }
  }
}

class formWithRequiredLabel extends QuailCustomTest {
  
  function run() {
    foreach(pq('label') as $el) {
      if(strpos(pq($el)->text(), '*') !== false) {
        if(!pq('#'. pq($el)->attr('for'))->length || !pq('#'. pq($el)->attr('for'))->attr('aria-required')) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
}

class imgMapAreasHaveDuplicateLink extends QuailCustomTest {
  
  function run() {
    $links = array();
    foreach(pq('a') as $el) {
      $links[pq($el)->attr('href')] = pq($el)->attr('href');
    }
    foreach(pq('img[usemap]') as $el) {
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

class tableUseColGroup extends QuailCustomTest {
  function run() {
    foreach(pq('table') as $el) {
      if($this->isDataTable(pq($el)) && !pq($el)->find('colgroup')) {
        $this->objects[] = pq($el);
      }
    }
  }
}


class pNotUsedAsHeader extends QuailCustomTest {
  
  function run() {
    foreach(pq('p') as $el) {
      if(in_array(pq($el)->firstChild()->tagName, array('strong', 'b', 'en', 'i'))
         && pq($el)->firstChild()->text() == pq($el)->text()) {
          $this->objects[] = pq($el);
      }
    }
  }
}

class QuailBaseTest extends QuailTest {
  
  protected $options;
  
  function __construct($options, $document, $path) {
    $this->options = $options;
    parent::__construct($document, $path);
  }
}

class QuailLabelTest extends QuailBaseTest {
  
  function run() {
    foreach(pq($this->options['selector']) as $el) {
      if(!pq($el)->parent('label')->length) {
        if(!$el->hasAttribute('id') || pq('label[for='. str_replace('#', '', pq($el)->attr('id')) .']')->length == 0) {
          $this->objects[] = pq($el);
        }
      }
    }
  }
}

class QuailLabelProximityTest extends QuailBaseTest {
  
  function run() {
    foreach(pq($this->options['selector']) as $el) {
      $label = pq('label[for='. str_replace('#', '', pq($el)->attr('id')) .']');
      if($label->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

class QuailHeaderTest extends QuailBaseTest {
  
  function run() {
    $current = intval(str_replace('h', '', $this->options['selector']));
    foreach(pq($this->options['selector']) as $el) {
      if(pq($el)->next('h1, h2, h3, h4, h5, h6')->length) {
        $next = intval(str_replace('h', '', pq($el)->next('h1, h2, h3, h4, h5, h6')->tagName));
        if($next != $current) {
          if($next > $current + 1 || $next < $current - 1) {
            $this->objects[] = pq($el);
          }
        }
      }
    }
  }
}

class QuailEventTest extends QuailTest {
  
  function run() {
    
  }
  
}

class QuailColorTest extends QuailTest {
  
  function run() {
    
  }
  
}

class QuailPlaceholderTest extends QuailBaseTest {
  
  protected $placeholders;
  
  function run() {
    $this->getPlaceholders();
    foreach(pq($this->options['selector']) as $el) {
      if(isset($this->options['attribute'])) {
        $attr = $this->options['attribute'];
        if(isset($this->options['empty']) && 
          ($this->unreadable(pq($el)->attr($attr)) ||
            !$el->hasAttribute($attr))) {
          $this->objects[] = pq($el);
        }
        elseif (strlen(pq($el)->attr($attr)) && (
          in_array(pq($el)->attr($attr), $this->placeholders) ||
          preg_match("/^([0-9]*)(k|kb|mb|k bytes|k byte)?$/", strtolower(pq($el)->attr($attr))))) {
            $this->objects[] = pq($el);
        }
        
      }
      elseif(isset($this->options['content']) && $this->options['content'] && in_array(pq($el)->html(), $this->placeholders)) {
        $this->objects[] = pq($el);
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