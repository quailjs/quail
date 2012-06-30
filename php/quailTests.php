<?php

//namespace Quail\Tests;

class QuailSelectorTest extends QuailTest {

  protected $selector;

  function __construct($selector, $document, $path) {
    $this->selector = $selector;
    parent::__construct($document, $path);
  }
}

/**
 * There are no adjacent text and image links having the same destination.
 * This objective of this technique is to avoid unnecessary duplication that occurs when adjacent text and iconic versions of a link are contained in a document.
*	@link http://quail-lib.org/test-info/aAdjacentWithSameResourceShouldBeCombined
*/
class aAdjacentWithSameResourceShouldBeCombined extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('a') as $el) {
      if(pq($el)->next('a')->attr('href') == pq($el)->attr('href')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * applet contains a text equivalent in the body of the applet.
 * This error is generated for all applet elements.
*	@link http://quail-lib.org/test-info/appletContainsTextEquivalent
*/
class appletContainsTextEquivalent extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('applet[alt=], applet:not(applet[alt])') as $el) {
      if(!strlen(trim(pq($el)->text()))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * Alt text for all img elements used as source anchors is different from the link text.
 * If an image occurs within a link, the Alt text should be different from the link text.
*	@link http://quail-lib.org/test-info/aImgAltNotRepetative
*/
class aImgAltNotRepetative extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('a img[alt]') as $el) {
      if(trim(pq($el)->attr('alt')) == trim(pq($el)->parent('a')->text())) {
        $this->objects[] = pq($el)->parent('a');
      }
    }
  }
}

/**
 * Link text does not begin with \"link to\"" or \""go to\"" (English)."
 * Alt text for images used as links should not begin with \"link to\"" or \""go to\""."
*	@link http://quail-lib.org/test-info/aLinkTextDoesNotBeginWithRedundantWord
*/
class aLinkTextDoesNotBeginWithRedundantWord extends QuailCustomTest {

  protected $redundant;


  /**
   * See QuailTest::run()
   */
  function run() {
    $this->getRedundantString();
    foreach($this->q('a') as $el) {
      $text = '';
      if(pq($el)->find('img[alt]:first')->length) {
        $text = pq($el)->find('img[alt]:first')->attr('alt');
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

/**
 * Include non-link, printable characters (surrounded by spaces) between adjacent links.
 * Adjacent links must be separated by printable characters. [Editor's Note - Define adjacent link? Printable characters always?]
*	@link http://quail-lib.org/test-info/aLinksAreSeperatedByPrintableCharacters
*/
class aLinksAreSeperatedByPrintableCharacters extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('a') as $el) {
		  if(pq($el)->next('a')->length && $this->isUnreadable($el->nextSibling->wholeText)) {
  		  $this->objects[] = pq($el);
  		}
	  }
  }
}

/**
 * Each source anchor contains text.
 * a (anchor) element must contain text. The text may occur in the anchor text or in the title attribute of the anchor or in the Alt text of an image used within the anchor.
*	@link http://quail-lib.org/test-info/aMustContainText
*/
class aMustContainText extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('a') as $el) {
      if(!$this->containsReadableText(pq($el)) && !(pq($el)->attr('name') && !pq($el)->attr('href'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * Suspicious link text.
 * a (anchor) element cannot contain any of the following text (English): \"click here\""
*	@link http://quail-lib.org/test-info/aSuspiciousLinkText
*/
class aSuspiciousLinkText extends QuailCustomTest {

  private $suspicious;


  /**
   * See QuailTest::run()
   */
  function run() {
    $this->getStrings();
    foreach($this->q('a') as $el) {
      if(in_array(trim(strtolower(pq($el)->text())), $this->suspicious)) {
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

/**
 * Use the blockquote element to mark up block quotations.
 * If body element content is greater than 10 characters (English) then this error will be generated.
*	@link http://quail-lib.org/test-info/blockquoteUseForQuotations
*/
class blockquoteUseForQuotations extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
		foreach($this->q('p') as $el) {
			if(in_array(substr(trim(pq($el)->text()), 0, 1), array('"', "'")) &&
			   in_array(substr(trim(pq($el)->text()), -1, 1), array('"', "'"))) {
				$this->objects[] = pq($el);
			}
		}
	}

}

/**
 * Abbreviations must be marked with abbr element.
 * If body element content is greater than 10 characters (English) this error will be generated.
*	@link http://quail-lib.org/test-info/documentAbbrIsUsed
*/
class documentAbbrIsUsed extends QuailCustomTest {

  protected $acronym_tag = 'abbr';


  /**
   * See QuailTest::run()
   */
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

/**
 * Acronyms must be marked with acronym element. This is the same as the 'abbr' test, but
*	looks for ACRONYM elements
 * If body element content is greater than 10 characters (English) then this error will be generated.
*	@link http://quail-lib.org/test-info/documentAcronymsHaveElement
*/
class documentAcronymsHaveElement extends documentAbbrIsUsed {

  protected $acronym_tag = 'acronym';
}

/**
 * id attributes must be unique.
 * Each id attribute value must be unique.
*	@link http://quail-lib.org/test-info/documentIDsMustBeUnique
*/
class documentIDsMustBeUnique extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
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

  /**
   * See QuailTest::run()
   */
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

/**
 * Document has valid language code.
 * html element must have a lang attribute value of valid 2 or 3 letter language code according to ISO specification 639.
*	@link http://quail-lib.org/test-info/documentLangIsISO639Standard
*/
class documentLangIsISO639Standard extends QuailCustomTest {

  protected $langauges;


  /**
   * See QuailTest::run()
   */
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

/**
 * HTML content has a valid doctype declaration.
 * Each document must contain a valid doctype declaration.
*	@link http://quail-lib.org/test-info/doctypeProvided
*/
class doctypeProvided extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    if(!property_exists($this->document->document, 'doctype') ||
       !property_exists($this->document->document->doctype, 'publicId') ||
       !$this->document->document->doctype->publicId) {
			   $this->objects[] = pq('html');
		}
  }
}

/**
* Checks that a document is written clearly to a minimum of a 60 on the
* Flesch Reading Ease score (9.9 max grade level).
* @link http://quail-lib.org/test-info/documentIsWrittenClearly
*/
class documentIsWrittenClearly extends quailTest {

  protected $requiresTextAnalysis = true;

  /**
   * See QuailTest::run()
   */
  function run() {
    $textAnalysis = new TextStatistics();
    foreach($this->q('p, div, li, h1, h2, h3, h4, h5') as $el) {
      $text = strip_tags(trim(pq($el)->text()));
      if(str_word_count($text) > 25) {
        if($textAnalysis->flesch_kincaid_reading_ease($text) < 60) {
          $this->objects[] = pq($el);
        }
      }
    }
  }

}

/**
 * Strict doctype is declared.
 * A 'strict' doctype must be declared in the document. This can either be the HTML4.01 or XHTML 1.0 strict doctype.
*	@link http://quail-lib.org/test-info/documentStrictDocType
*/
class documentStrictDocType extends QuailCustomTest {

  private $parameters = array('publicId', 'systemId');


  /**
   * See QuailTest::run()
   */
  function run() {
    if(!property_exists($this->document->document, 'doctype')) {
      $this->objects[] = pq('html');
      return;
    }
		foreach($this->parameters as $parameter) {
		  if(property_exists($this->document->document->doctype, $parameter)
		     && strpos(strtolower($this->document->document->doctype->{$parameter}), 'strict') !== FALSE) {
		      return;
	     }
		}
		$this->objects[] = pq('html');
  }
}

/**
 * Document validates to specification.
 * Document must validate to declared doctype.
*	@link http://quail-lib.org/test-info/documentValidatesToDocType
*/
class documentValidatesToDocType extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    if(!@$this->document->document->validate()) {
			$this->objects[] = pq('html');
    }
  }
}

/**
 * title is short.
 * title element content must be less than 150 characters (English).
*	@link http://quail-lib.org/test-info/documentTitleIsShort
*/
class documentTitleIsShort extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    if(strlen(trim(pq('head title:first')->text())) > 150) {
      $this->objects[] = pq('head title:first');
    }
  }
}

/**
 * All visual lists are marked.
 * Create lists of related items using list elements appropriate for their purposes.
*	@link http://quail-lib.org/test-info/documentVisualListsAreMarkedUp
*/
class documentVisualListsAreMarkedUp extends QuailCustomTest {

  protected $list_cues = array('*', '<br>*', '¥', '&#8226');


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('p, div, h1, h2, h3, h4, h5, h6') as $el) {
      foreach($this->list_cues as $cue) {
				$first = stripos(pq($el)->text(), $cue);
				$second = strripos(pq($el)->text(), $cue, $first + 1);
				if($first && $second && $first != $second) {
					$this->objects[] = pq($el);
				}
			}
    }
  }
}

/**
 * All embed elements have an associated noembed element that contains a text equivalent to the embed element.
 * Provide a text equivalent for the embed element.
*	@link http://quail-lib.org/test-info/embedHasAssociatedNoEmbed
*/
class embedHasAssociatedNoEmbed extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    if($this->q('noembed')->length) {
      return null;
    }
    foreach($this->q('embed') as $el) {
      $this->objects[] = pq($el);
    }
  }
}

/**
 * Excessive use of emoticons.
 * This error is generated if 4 or more emoticons are detected. [Editor's Note - how are emoticons detected?]
*	@link http://quail-lib.org/test-info/emoticonsExcessiveUse
*/
class emoticonsExcessiveUse extends QuailCustomTest {

  protected $emoticons;


  /**
   * See QuailTest::run()
   */
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

  /**
   * See QuailTest::run()
   */
  function run() {
    $this->getEmoticons();
    $count = 0;
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

/**
 * Each section of content is marked with a header element.
 * Using the heading elements, h and h1 - h6, to markup the beginning of each section in the content can assist in navigation.
*	@link http://quail-lib.org/test-info/headersUseToMarkSections
*/
class headersUseToMarkSections extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
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

/**
 * Alt text for all input elements with a type attribute value of "image" is less than 100 characters (English) or the user has confirmed that the Alt text is as short as possible.
 * input elements must have alt attribute value of less than 100 characters (English).
*	@link http://quail-lib.org/test-info/inputImageAltIsShort
*/
class inputImageAltIsShort extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('input[type=image][alt]') as $el) {
      if(strlen(trim(pq($el)->attr('alt'))) > 150) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * Image used in input element - Alt text should not be the same as the filename.
 * input elements cannot have alt attribute values that are the same as their src attribute values.
*	@link http://quail-lib.org/test-info/inputImageAltIsNotFileName
*/
class inputImageAltIsNotFileName extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('input[type=image][alt]') as $el) {
      if(pq($el)->attr('alt') == pq($el)->attr('src')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * Alt text for all input elements with a type attribute value of "image" does not use the words "submit" or "button" (English).
 * Alt text for form submit buttons must not use the words "submit" or "button".
*	@link http://quail-lib.org/test-info/inputImageAltNotRedundant
*/
class inputImageAltNotRedundant extends QuailCustomTest {

  protected $redundant;


  /**
   * See QuailTest::run()
   */
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

/**
 * Alt text is not the same as the filename unless author has confirmed it is correct.
 * img element cannot have alt attribute value that is the same as its src attribute.
 *	@link http://quail-lib.org/test-info/imgAltIsDifferent
 */
class imgAltIsDifferent extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('img') as $el) {
      if(pq($el)->attr('src') == pq($el)->attr('alt')) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * Image Alt text is long.
 * Image Alt text is long or user must confirm that Alt text is as short as possible.
 * @link http://quail-lib.org/test-info/imgAltIsTooLong
 */
class imgAltIsTooLong extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('img[alt]') as $el) {
      if(strlen(pq($el)->attr('alt')) > 100) {
        $this->objects[] = pq($el);
      }
    }
  }

}

/**
 * Important images should not have spacer Alt text.
 * img element cannot have alt attribute value of whitespace if WIDTH and HEIGHT attribute values are both greater than 25.
 * @link http://quail-lib.org/test-info/imgImportantNoSpacerAlt
 */
class imgImportantNoSpacerAlt extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
 * All img elements have associated images that do not flicker.
 * This error is generated for all img elements that contain a src attribute value that ends with ".gif" (case insensitive). and have a width and height larger than 25.
 * @link http://quail-lib.org/test-info/imgGifNoFlicker
 */
class imgGifNoFlicker extends QuailCustomTest {

  var $gif_control_extension = "/21f904[0-9a-f]{2}([0-9a-f]{4})[0-9a-f]{2}00/";


  /**
   * See QuailTest::run()
   */
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

/**
 * A long description is used for each img element that does not have Alt text conveying the same information as the image.
 * img element must contain a longdesc attribute.
 *	@link http://quail-lib.org/test-info/imgHasLongDesc
 */
class imgHasLongDesc extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('img[longdesc]') as $el) {
      if(pq($el)->attr('longdesc') == pq($el)->attr('alt') ||
        !$this->validURL(pq($el)->attr('longdesc'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*	ALT text on images should not be redundant across the page. Please check that all
*	images have alt text which is unique to the image.
*	@link http://quail-lib.org/test-info/imgAltTextNotRedundant
*/
class imgAltTextNotRedundant extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
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

/**
*  Alt text for all img elements used as source anchors is not empty when there is no other text in the anchor.
*  img element cannot have alt attribute value of null or whitespace if the img element is contained by an A element and there is no other link text.
*	@link http://quail-lib.org/test-info/imgAltNotEmptyInAnchor
*/
class imgAltNotEmptyInAnchor extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
*  All img elements with images containing math expressions have equivalent MathML markup.
*  This error is generated for all img elements that have a width and height greater than 100.
*	@link http://quail-lib.org/test-info/imgWithMathShouldHaveMathEquivalent
*/
class imgWithMathShouldHaveMathEquivalent extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('img:not(img:has(math), img:has(tagName))') as $el) {
      if(!pq($el)->parent()->find('math')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  Each input element has only one associated label.
*  input element must have only one associated label element.
*	@link http://quail-lib.org/test-info/labelMustBeUnique
*/
class labelMustBeUnique extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
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

/**
*  List items must not be used to format text.
*  OL element should not contain only one LI element.
*	@link http://quail-lib.org/test-info/listNotUsedForFormatting
*/
class listNotUsedForFormatting extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('ol, ul') as $el) {
      if(pq($el)->find('li')->length < 2) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  pre element should not be used to create tabular layout.
*  This error is generated for each pre element.
*	@link http://quail-lib.org/test-info/preShouldNotBeUsedForTabularLayout
*/
class preShouldNotBeUsedForTabularLayout extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('pre') as $el) {
      $rows = preg_split('/[\n\r]+/', pq($el)->text());
			if(count($rows) > 1 && (strpos(pq($el)->text(), "\t") !== FALSE || strpos(pq($el)->text(), '  ') !== FALSE)) {
				$this->objects[] = pq($el);
		  }
    }
  }
}

/**
*  The tab order specified by tabindex attributes follows a logical order.
*  Provide a logical tab order when the default tab order does not suffice.
*	@link http://quail-lib.org/test-info/tabIndexFollowsLogicalOrder
*/
class tabIndexFollowsLogicalOrder extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
*  All layout tables have an empty summary attribute or no summary attribute.
*  The table element, summary attribute for all layout tables contains no printable characters or is absent.
*	@link http://quail-lib.org/test-info/tableLayoutHasNoSummary
*/
class tableLayoutHasNoSummary extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('table[summary]') as $el) {
      if(!$this->isDataTable(pq($el)) && !$this->isUnreadable(pq($el)->attr('summary'))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  All layout tables do not contain caption elements.
*  table element content cannot contain a caption element if it's a layout table.
*	@link http://quail-lib.org/test-info/tableLayoutHasNoCaption
*/
class tableLayoutHasNoCaption extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('table') as $el) {
      if(!$this->isDataTable(pq($el)) && pq($el)->find('caption')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  All layout tables make sense when linearized.
*  This error is generated for all layout tables.  If the table contains th elements then it is a data table. If the table does not contain th elements then it is a layout table.
*	@link http://quail-lib.org/test-info/tableLayoutMakesSenseLinearized
*/
class tableLayoutMakesSenseLinearized extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('table') as $el) {
      if(!$this->isDataTable(pq($el))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  All layout tables do not contain th elements.
*  Data tables must have th elements while layout tables can not have th elements.
*	@link http://quail-lib.org/test-info/tableLayoutDataShouldNotHaveTh
*/
class tableLayoutDataShouldNotHaveTh extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('table') as $el) {
      if(!$this->isDataTable(pq($el)) && pq($el)->find('th')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  Long table header labels require terse substitutes.
*  th element content must be less than 20 characters (English) if th element does not contain abbr attribute.
*	@link http://quail-lib.org/test-info/tableUsesAbbreviationForHeader
*/
class tableUsesAbbreviationForHeader extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('th:not(th[abbr])') as $el) {
      if(strlen(trim(pq($el)->text())) > 20) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  Substitutes for table header labels must be terse.
*  abbr attribute value on th element must be less than 20 characters (English).
*	@link http://quail-lib.org/test-info/tableHeaderLabelMustBeTerse
*/
class tableHeaderLabelMustBeTerse extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('th, table tr:first td') as $el) {
      if(strlen(trim(pq($el)->text())) > 20 && (!$el->hasAttribute('abbr') || strlen(trim(pq($el)->attr('abbr'))) > 20)) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  Table summaries do not duplicate the table captions.
*  The summary and the caption must be different. Caption identifies the table. Summary describes the table contents.
*	@link http://quail-lib.org/test-info/tableSummaryDoesNotDuplicateCaption
*/
class tableSummaryDoesNotDuplicateCaption extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('table[summary]:has(caption)') as $el) {
      if(strtolower(trim(pq($el)->attr('summary'))) == strtolower(trim(pq($el)->find('caption:first')->text()))) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  Data tables that contain more than one row/column of headers use the id and headers attributes to identify cells.
*  id and headers attributes allow screen readers to speak the headers associated with each data cell when the relationships are too complex to be identified using the th element alone or the th element with the scope attribute.
*	@link http://quail-lib.org/test-info/tableWithMoreHeadersUseID
*/
class tableWithMoreHeadersUseID extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
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

/**
*  Table markup is used for all tabular information.
*  The objective of this technique is to present tabular information in a way that preserves relationships within the information even when users cannot see the table or the presentation format is changed.
*	@link http://quail-lib.org/test-info/tabularDataIsInTable
*/
class tabularDataIsInTable extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('pre') as $el) {
      if(strpos(pq($el)->text(), "\t") !== FALSE) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  All form fields that are required are indicated to the user as required.
*  Ensure that the label for any interactive component within Web content makes the component's purpose clear.
*	@link http://quail-lib.org/test-info/formWithRequiredLabel
*/
class formWithRequiredLabel extends QuailCustomTest {

  protected $redundant;


  /**
   * See QuailTest::run()
   */
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

/**
*  All checkbox groups are marked using fieldset and legend elements.
*  form element content must contain both fieldset and legend elements if there are related checkbox buttons.
*	@link http://quail-lib.org/test-info/inputCheckboxRequiresFieldset
*/
class inputCheckboxRequiresFieldset extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('input[type=checkbox]') as $el) {
      if(!pq($el)->parents('fieldset')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  All links in all client side image-maps are duplicated within the document.
*  img element must not contain a usemap attribute unless all links in the MAP are duplicated within the document. The MAP element is referred by the USEMAP element's usemap attribute. Links within MAP are referred by area elements href attribute contained by MAP element. [Editor's Note - can duplicate links appear anywhere within content or must they be part of a link group?]
*	@link http://quail-lib.org/test-info/imgMapAreasHaveDuplicateLink
*/
class imgMapAreasHaveDuplicateLink extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
*  Sites must have a site map.
*  Each site must have a site map.
*	@link http://quail-lib.org/test-info/siteMap
*/
class siteMap extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
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
    $this->objects[] = $this->q('body');
  }

  protected function loadString() {
    global $quail_map_text;
    if(!$quail_map_text) {
      $quail_map_text = (array)json_decode(file_get_contents('../../resources/strings/site_map.json'));
    }

    $this->strings = $quail_map_text;
  }
}

/**
*  Use colgroup and col elements to group columns.
*	@link http://quail-lib.org/test-info/tableUseColGroup
*/
class tableUseColGroup extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('table') as $el) {
      if($this->isDataTable(pq($el)) && !pq($el)->find('colgroup')->length) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*  All p elements are not used as headers.
*  All p element content must not be marked with either b, i, u, strong, font, em.
*	@link http://quail-lib.org/test-info/pNotUsedAsHeader
*/
class pNotUsedAsHeader extends QuailCustomTest {

  protected $suspectTags = array('strong', 'b', 'em', 'i', 'u', 'font');

  protected $suspectCSS = array('color', 'font-weight', 'font-size', 'font-family');

  protected $requiresTextAnalysis = true;


  /**
   * See QuailTest::run()
   */
  function run() {
    $priorCSS = array();
    $textAnalysis = new TextStatistics();
    foreach($this->q('p') as $el) {
      if($textAnalysis->sentence_count(pq($el)->text()) < 3) {
        if(pq($el)->find('*:first-child')->get(0) &&
           in_array(strtolower(pq($el)->find('*:first-child')->get(0)->tagName), $this->suspectTags) &&
           pq($el)->find('*:first-child')->text() == pq($el)->text()) {
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

/**
*	Text size is not less than 10px small
*	@link http://quail-lib.org/test-info/textIsNotSmall
*/
class textIsNotSmall extends QuailCustomTest {

  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('body *') as $el) {
      $size = pq($el)->css('font-size');
      if($size = $this->convertFontSize($size) && $size < 11) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
*	Jump menus that consist of a single form element should not be used
*	@link http://quail-lib.org/test-info/selectJumpMenus
*/
class selectJumpMenus extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
  function run() {
    foreach($this->q('select') as $el) {
      if(pq($el)->parents('form')->length == 0 ||
         pq($el)->parents('form')->find('input[type=submit]')->length == 0) {
        $this->objects[] = pq($el);
      }
    }
  }
}

/**
 * Test to see that any element with a given selector
 * also has a label.
 */
class QuailLabelTest extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
 * Tests to make sure labels are next to their target element.
 */
class QuailLabelProximityTest extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
 *
 */
class QuailHeaderTest extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
 * Checks that values with a JavaScript event have another
 * corresponding event (like click also covers keyUp).
 */
class QuailEventTest extends QuailCustomTest {


  /**
   * See QuailTest::run()
   */
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

/**
 * Helper class for comparing color values of any item in the DOM.
 */
class QuailColorTest extends QuailCustomTest {

  /**
   * @var An array of named color values (like 'blue' => '0000ff')
   */
  protected $color_names;

  /**
   * See QuailTest::run()
   */
  function run() {
    $this->getColorNames();
    foreach($this->q($this->options['selector']) as $el) {
      if(pq($el)->css('color') && pq($el)->css('background-color')) {
        if($this->options['algorithm'] == 'wai') {
          if(!$this->compareWAIColors(pq($el)->css('color'), pq($el)->css('background-color'))) {
            $this->objects[] = pq($el);
          }
        }
        if($this->options['algorithm'] == 'wcag') {
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
      if($this->options['algorithm'] == 'wai') {
        if(!$this->compareWAIColors($foreground, $background)) {
          $this->objects[] = pq('body:first');
        }
      }
      if($this->options['algorithm'] == 'wcag') {
        if(!$this->compareWCAGColors($foreground, $background)) {
          $this->objects[] = pq('body:first');
        }
      }
    }
  }

  /**
   * Compares two colors using WAI algorithims.
   * @return bool TRUE for the values pass, FALSe if they do not pass
   */
  protected function compareWAIColors($foreground, $background) {
    return ( $this->getWaiErtContrast($foreground, $background) > 500 &&
             $this->getWaiErtBrightness($foreground, $background) > 125 );
  }

  /**
   * Compares two colors using WCAG algorithims.
   * @return bool TRUE for the values pass, FALSe if they do not pass
   */
  protected function compareWCAGColors($foreground, $background) {
    return ($this->getLuminosity($foreground, $background) > 5);
  }

  /**
   * Retrieves and sets color_names so that named color values
   * can be converted to their hex value.
   * @link http://www.w3.org/TR/css3-color/#html4
   */
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

	/**
	* Retrieves the difference between two colors using the WAI algorithm.
	* @param $fore_rgb array An array of RGB values for foreground values
	* @param $back_rgb array An array of RGB values for background values
	* @return array An array of differences keyed 'red', 'green', and 'blue'
	*/
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

/**
 * A test class to compare the values of an element to
 * either placeholder text or empty values. The value
 * can either be an attribute on elements selected, or
 * the content.
 */
class QuailPlaceholderTest extends QuailCustomTest {

  /**
   * @var An array of placeholder strings
   */
  protected $placeholders;

  /**
   * @var Defalut options
   */
  protected $default_options = array('attribute' => false,
                                'content' => false,
                                'empty' => false,
                                'selector' => '',
                                );


  /**
   * See QuailTest::run()
   */
  function run() {
    $this->getPlaceholders();
    foreach($this->q($this->options['selector']) as $el) {
      if($this->options['attribute']) {
        $attr = pq($el)->attr($this->options['attribute']);
        if($this->options['empty'] && $this->isUnreadable($attr)) {
          $this->objects[] = pq($el);
        }
        if (strlen($attr) && (
          in_array($attr, $this->placeholders) ||
          preg_match("/^([0-9]*)(k|kb|mb|k bytes|k byte)$/", strtolower($attr)))) {
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

  /**
   * Retrieves and sets the placeholder values from the placeholders.json file.
   */
  protected function getPlaceholders() {
    global $quail_placeholder_text;
    if(!$quail_placeholder_text) {
      $quail_placeholder_text = json_decode(file_get_contents('../../resources/strings/placeholders.json'));
    }
    $this->placeholders = $quail_placeholder_text;
  }
}