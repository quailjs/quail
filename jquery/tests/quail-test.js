;(function($) {

  $(document).ready(function() {
    var accessibilityTests = { };
    module("QUAIL OAC Tests");
    $.ajax({ url : '../../resources/tests.json',
     async : false,
     dataType : 'json',
     cache : false,
     success : function(data) {
        if(typeof data == 'object') {
          accessibilityTests = data;
        }
    }});
    var quailTest = {

      results : { },

      testName : '',

      runTest : function(testName, file) {
        quailTest.testName = testName;
        $.ajax({ url : '../../testfiles/oac/' + file,
                 async : false,
                 cache : false,
                 success : function(data) {

          quailTest.results = $('<html />').html(data).quail({ jsonPath : '../../resources',
                          guideline : [ testName ],
                          reset : true,
                          accessibilityTests : accessibilityTests,
                          getRawResults : true});
        }});
      },

      confirmIsEmpty : function() {
        return quailTest.results[quailTest.testName].length == 0;
      },

      confirmIsTag : function(tag) {
        if(typeof quailTest.results[quailTest.testName][0] == 'undefined') {
          return false;
        }
        return quailTest.results[quailTest.testName][0].is(tag);
      }
    };

    test('imgHasAlt', function() {
      quailTest.runTest( 'imgHasAlt', '1-1.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
      quailTest.runTest( 'imgHasAlt', '1-2.html');
      equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
    });

   test('imgAltIsDifferent', function() {
  		quailTest.runTest( 'imgAltIsDifferent', '2-1.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltIsDifferent', '2-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   test('imgAltIsTooLong', function() {
  		quailTest.runTest( 'imgAltIsTooLong', '3-1.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltIsTooLong', '3-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   //4
   test('imgNonDecorativeHasAlt', function() {
  		quailTest.runTest( 'imgNonDecorativeHasAlt', '4-1.html');
  		equal(true, quailTest.confirmIsTag('img'), 'First item is an image');

  		quailTest.runTest( 'imgNonDecorativeHasAlt', '4-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   //5
   test('imgImportantNoSpacerAlt', function() {
  		quailTest.runTest( 'imgImportantNoSpacerAlt', '5-1.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgImportantNoSpacerAlt', '5-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');

  		quailTest.runTest( 'imgImportantNoSpacerAlt', '5-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   //6
   test('imgAltNotPlaceHolder', function() {
  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-1.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');

  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-3.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-4.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-5.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-6.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltNotPlaceHolder', '6-7.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   //7
   test('imgAltNotEmptyInAnchor', function() {
  		quailTest.runTest( 'imgAltNotEmptyInAnchor', '7-1.html');
      equal(true, quailTest.confirmIsTag('img'), 'First item is an image');
  		quailTest.runTest( 'imgAltNotEmptyInAnchor', '7-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   //8
   test('imgHasLongDesc', function() {
  		quailTest.runTest( 'imgHasLongDesc', '8-1.html');
      equal(quailTest.results[quailTest.testName][0].attr('src'), 'chart.gif', 'Image is chart.gif');
  		quailTest.runTest( 'imgHasLongDesc', '8-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');

  		quailTest.runTest( 'imgHasLongDesc', '8-3.html');
      equal(quailTest.results[quailTest.testName][0].attr('src'), 'chart.gif', 'Image is chart.gif');
  		quailTest.runTest( 'imgHasLongDesc', '8-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');

  		quailTest.runTest( 'imgHasLongDesc', '8-5.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Item is empty');
   });

   //10
   test('imgGifNoFlicker', function() {
  		quailTest.runTest( 'imgGifNoFlicker', '10-1.html');
  		equal(quailTest.results[quailTest.testName][0].attr('src'), 'eatatjoes.gif', 'Item attribute check');
  		quailTest.runTest( 'imgGifNoFlicker', '10-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
   });


   //11
   test('imgAltIsSameInText', function() {
  		quailTest.runTest( 'imgAltIsSameInText', '11-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('alt'), 'logo', 'Item attribute check');
  		quailTest.runTest( 'imgAltIsSameInText', '11-2.html');

    		equal(quailTest.results[quailTest.testName][0].attr('alt'), 'W3C Working Draft logo', 'Item attribute check');
   });
    //12
   test('imgWithMapHasUseMap', function() {
  		quailTest.runTest( 'imgWithMapHasUseMap', '12-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'image.gif', 'Item attribute check');
  		quailTest.runTest( 'imgWithMapHasUseMap', '12-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
   });


    //13
   test('imgMapAreasHaveDuplicateLink', function() {
  		quailTest.runTest( 'imgMapAreasHaveDuplicateLink', '13-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'navigation.gif', 'Item attribute check');
  		quailTest.runTest( 'imgMapAreasHaveDuplicateLink', '13-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');


  		quailTest.runTest( 'imgMapAreasHaveDuplicateLink', '13-3.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'navigation.gif', 'Item attribute check');
   });


    //14
   test('imgNotReferredToByColorAlone', function() {
  		quailTest.runTest( 'imgNotReferredToByColorAlone', '14-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'kids.jpg', 'Item attribute check');
  		quailTest.runTest( 'imgNotReferredToByColorAlone', '14-2.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'kids.jpg', 'Item attribute check');
  		quailTest.runTest( 'imgNotReferredToByColorAlone', '14-3.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'kids.jpg', 'Item attribute check');
   });

    //15
   test('imgAltIdentifiesLinkDestination', function() {
  		quailTest.runTest( 'imgAltIdentifiesLinkDestination', '15-1.html');

    			equal(quailTest.results[quailTest.testName][0].attr('src'), 'topo.gif', 'Item attribute check');
  		quailTest.runTest( 'imgAltIdentifiesLinkDestination', '15-2.html');

  			equal(quailTest.results[quailTest.testName][0].attr('src'), 'topo.gif', 'Item attribute check');
   });

    //16
   test('imgAltEmptyForDecorativeImages', function() {
  		quailTest.runTest( 'imgAltEmptyForDecorativeImages', '16-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), '10pttab.gif', 'Item attribute check');
  		quailTest.runTest( 'imgAltEmptyForDecorativeImages', '16-2.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), '10pttab.gif', 'Item attribute check');
  		quailTest.runTest( 'imgAltEmptyForDecorativeImages', '16-3.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'star.gif', 'Item attribute check');
  		quailTest.runTest( 'imgAltEmptyForDecorativeImages', '16-4.html');

    		equal(quailTest.results[quailTest.testName][0].attr('src'), 'star.gif', 'Item attribute check');
   });


    //17
   test('aLinksToSoundFilesNeedTranscripts', function() {
  		quailTest.runTest( 'aLinksToSoundFilesNeedTranscripts', '17-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'carol-talking.wav', 'Item attribute check');
   });

    //18
   test('aLinksDontOpenNewWindow', function() {
  		quailTest.runTest( 'aLinksDontOpenNewWindow', '18-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'newwindow.html', 'Item attribute check');
  		quailTest.runTest( 'aLinksDontOpenNewWindow', '18-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aLinksDontOpenNewWindow', '18-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aLinksDontOpenNewWindow', '18-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
   });


    //19
   test('aLinksMakeSenseOutOfContext', function() {
  		quailTest.runTest( 'aLinksMakeSenseOutOfContext', '19-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'dogs.html', 'Item attribute check');
   });

    //20
   test('aLinksToMultiMediaRequireTranscript', function() {
  		quailTest.runTest( 'aLinksToMultiMediaRequireTranscript', '20-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'movie.wmv', 'Item attribute check');
  		quailTest.runTest( 'aLinksToMultiMediaRequireTranscript', '20-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aLinksToMultiMediaRequireTranscript', '20-3.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'movie.mpg', 'Item attribute check');
  		quailTest.runTest( 'aLinksToMultiMediaRequireTranscript', '20-4.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'movie.mov', 'Item attribute check');
  		quailTest.runTest( 'aLinksToMultiMediaRequireTranscript', '20-5.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'movie.ram', 'Item attribute check');
  		quailTest.runTest( 'aLinksToMultiMediaRequireTranscript', '20-6.html');

    		equal(quailTest.results[quailTest.testName][0].attr('href'), 'movie.aif', 'Item attribute check');
   });

    //21
   test('appletsDoneUseColorAlone', function() {

  		quailTest.runTest( 'appletsDoneUseColorAlone', '21-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletsDoneUseColorAlone', '21-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
   });

    //22
   test('appletsDoNotFlicker', function() {

  		quailTest.runTest( 'appletsDoNotFlicker', '22-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletsDoNotFlicker', '22-2.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');

   });

    //23
   test('appletContainsTextEquivalentInAlt', function() {

  		quailTest.runTest( 'appletContainsTextEquivalentInAlt', '23-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletContainsTextEquivalentInAlt', '23-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'appletContainsTextEquivalentInAlt', '23-3.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
   });


    //24
   test('appletTextEquivalentsGetUpdated', function() {

  		quailTest.runTest( 'appletTextEquivalentsGetUpdated', '23-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletTextEquivalentsGetUpdated', '23-2.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
   });

    //25
   test('appletContainsTextEquivalent', function() {

  		quailTest.runTest( 'appletContainsTextEquivalent', '25-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletContainsTextEquivalent', '25-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //26
   test('appletUIMustBeAccessible', function() {

  		quailTest.runTest( 'appletUIMustBeAccessible', '26-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletUIMustBeAccessible', '26-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //27
   test('blinkIsNotUsed', function() {

  		quailTest.runTest( 'blinkIsNotUsed', '27-1.html');

    		equal(true, quailTest.confirmIsTag('blink'), 'First item tag test');
  		quailTest.runTest( 'blinkIsNotUsed', '27-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //28
   test('skipToContentLinkProvided', function() {

  		quailTest.runTest( 'skipToContentLinkProvided', '28-1.html');
      equal(true, quailTest.confirmIsTag('body'), 'First item tag test');
  		quailTest.runTest( 'skipToContentLinkProvided', '28-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //29
   test('doctypeProvided', function() {

  		quailTest.runTest( 'doctypeProvided', '29-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'First item tag test');
  		quailTest.runTest( 'doctypeProvided', '29-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //30
   test('objectDoesNotFlicker', function() {

  		quailTest.runTest( 'objectDoesNotFlicker', '30-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectDoesNotFlicker', '30-2.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

   });

    //31
   test('framesHaveATitle', function() {

  		quailTest.runTest( 'framesHaveATitle', '31-1.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');

  		quailTest.runTest( 'framesHaveATitle', '31-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //32
   test('frameTitlesDescribeFunction', function() {

  		quailTest.runTest( 'frameTitlesDescribeFunction', '32-1.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');

  		quailTest.runTest( 'frameTitlesDescribeFunction', '32-2.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');

  		quailTest.runTest( 'frameTitlesDescribeFunction', '32-3.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');
   });

    //33
   test('frameSrcIsAccessible', function() {

  		quailTest.runTest( 'frameSrcIsAccessible', '33-1.html');
  		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');
  		quailTest.runTest( 'frameSrcIsAccessible', '32-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'frameSrcIsAccessible', '32-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //34
   test('frameRelationshipsMustBeDescribed', function() {

  		quailTest.runTest( 'frameRelationshipsMustBeDescribed', '34-1.html');

    		equal(true, quailTest.confirmIsTag('frameset'), 'First item tag test');
  		quailTest.runTest( 'frameRelationshipsMustBeDescribed', '34-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //35
   test('framesetMustHaveNoFramesSection', function() {

  		quailTest.runTest( 'framesetMustHaveNoFramesSection', '35-1.html');

    		equal(true, quailTest.confirmIsTag('frameset'), 'First item tag test');
  		quailTest.runTest( 'framesetMustHaveNoFramesSection', '35-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //36
   test('noframesSectionMustHaveTextEquivalent', function() {

  		quailTest.runTest( 'noframesSectionMustHaveTextEquivalent', '36-1.html');

    		equal(true, quailTest.confirmIsTag('frameset'), 'First item tag test');
  		quailTest.runTest( 'noframesSectionMustHaveTextEquivalent', '36-2.html');

    		equal(true, quailTest.confirmIsTag('frameset'), 'First item tag test');
   });

    //37
   test('headerH1', function() {

  		quailTest.runTest( 'headerH1', '37-1.html');

    		equal(true, quailTest.confirmIsTag('h3'), 'First item tag test');
  		quailTest.runTest( 'headerH1', '37-2.html');

  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //38
   test('headerH2', function() {

  		quailTest.runTest( 'headerH2', '38-1.html');

    		equal(true, quailTest.confirmIsTag('h4'), 'First item tag test');
  		quailTest.runTest( 'headerH2', '38-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //39
   test('headerH3', function() {

  		quailTest.runTest( 'headerH3', '39-1.html');

    		equal(true, quailTest.confirmIsTag('h5'), 'First item tag test');
  		quailTest.runTest( 'headerH3', '39-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //40
   test('headerH4', function() {

  		quailTest.runTest( 'headerH4', '40-1.html');
  		equal(true, quailTest.confirmIsTag('h6'), 'First item tag test');
  		quailTest.runTest( 'headerH4', '40-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //41
   test('headerH5', function() {

  		quailTest.runTest( 'headerH4', '41-1.html');
  		equal(true, quailTest.confirmIsTag('h6'), 'First item tag test');
  		quailTest.runTest( 'headerH4', '41-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

   });

    //42 - 47
    test('47_headerFormatting', function() {
    	for(var i = 1; i < 7; $i++) {
    	   var testName = 'headerH' + $i + 'Format';
    	   var fileName = (i + 41) + '-1.html';
    	   quailTest.runTest( testName, fileName);
    	   equal(true, quailTest.confirmIsTag('h' + i), 'Header test H' + i);
    	}
    });

    //48
    test('documentLangNotIdentified', function() {
  		quailTest.runTest( 'documentLangNotIdentified', '48-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentLangNotIdentified', '48-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //49
    test('documentLangIsISO639Standard', function() {
  		quailTest.runTest( 'documentLangIsISO639Standard', '49-1.html');
    	equal(true, quailTest.confirmIsTag('html'), 'Document is set');
      quailTest.runTest( 'documentLangIsISO639Standard', '49-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //50
    test('documentHasTitleElement', function() {
  		quailTest.runTest( 'documentHasTitleElement', '50-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentHasTitleElement', '50-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //51
    test('documentTitleNotEmpty', function() {
  		quailTest.runTest( 'documentTitleNotEmpty', '51-1.html');
  		equal(true, quailTest.confirmIsTag('title'), 'Document is set');

  		quailTest.runTest( 'documentTitleNotEmpty', '51-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentTitleNotEmpty', '51-3.html');
  		equal(true, quailTest.confirmIsTag('title'), 'Document is set');
    });

    //52
    test('documentTitleIsShort', function() {
  		quailTest.runTest( 'documentTitleIsShort', '52-1.html');
  		equal(true, quailTest.confirmIsTag('title'), 'Document is set');


  		quailTest.runTest( 'documentTitleIsShort', '52-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //53
    test('documentTitleIsNotPlaceholder', function() {
  		quailTest.runTest( 'documentTitleIsNotPlaceholder', '53-1.html');

  			equal(true, quailTest.confirmIsTag('title'), 'Document is set');
  		quailTest.runTest( 'documentTitleIsNotPlaceholder', '53-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentTitleIsNotPlaceholder', '53-3.html');

  			equal(true, quailTest.confirmIsTag('title'), 'Document is set');
  		quailTest.runTest( 'documentTitleIsNotPlaceholder', '53-4.html');
  		equal(true, quailTest.confirmIsTag('title'), 'Document is set');

  		quailTest.runTest( 'documentTitleIsNotPlaceholder', '53-5.html');
  		equal(true, quailTest.confirmIsTag('title'), 'Document is set');
    });

    //54
    test('documentTitleDescribesDocument', function() {
  		quailTest.runTest( 'documentTitleDescribesDocument', '54-1.html');

    		equal(true, quailTest.confirmIsTag('title'), 'First item tag test');

  		quailTest.runTest( 'documentTitleDescribesDocument', '54-2.html');

    		equal(true, quailTest.confirmIsTag('title'), 'First item tag test');
    });

    //55
    test('inputDoesNotUseColorAlone', function() {
  		quailTest.runTest( 'inputDoesNotUseColorAlone', '55-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputDoesNotUseColorAlone', '55-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //57
    test('inputTextHasLabel', function() {
  		quailTest.runTest( 'inputTextHasLabel', '57-1.html');

    		equal(quailTest.results[quailTest.testName][0].attr('name'), 'firstname', 'Item attribute check');

  		quailTest.runTest( 'inputTextHasLabel', '57-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'inputTextHasLabel', '57-3.html');

    		equal(quailTest.results[quailTest.testName][0].attr('name'), 'firstname', 'Item attribute check');

  		quailTest.runTest( 'inputTextHasLabel', '57-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });
  
    //58
    test('inputImageHasAlt', function() {
  		quailTest.runTest( 'inputImageHasAlt', '58-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputImageHasAlt', '58-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //59
    test('inputImageAltIdentifiesPurpose', function() {
  		quailTest.runTest( 'inputImageAltIdentifiesPurpose', '59-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputImageAltIdentifiesPurpose', '59-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
    });

    //60
    test('inputImageAltIsShort', function() {
  		quailTest.runTest( 'inputImageAltIsShort', '60-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputImageAltIsShort', '60-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //61
    test('inputImageAltIsNotFileName', function() {
  		quailTest.runTest( 'inputImageAltIsNotFileName', '61-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputImageAltIsNotFileName', '61-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //62
    test('inputImageAltIsNotPlaceholder', function() {
  		quailTest.runTest( 'inputImageAltIsNotPlaceholder', '62-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputImageAltIsNotPlaceholder', '62-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'inputImageAltIsNotPlaceholder', '62-3.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputImageAltIsNotPlaceholder', '62-4.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
    });

    //63
    test('inputTextHasValue', function() {
  		quailTest.runTest( 'inputTextHasValue', '63-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputTextHasValue', '63-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //64
    test('areaHasAltValue', function() {
  		quailTest.runTest( 'areaHasAltValue', '64-1.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');

  		quailTest.runTest( 'areaHasAltValue', '64-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //65
    test('areaAltIdentifiesDestination', function() {
  		quailTest.runTest( 'areaAltIdentifiesDestination', '65-1.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');

  		quailTest.runTest( 'areaAltIdentifiesDestination', '65-2.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');
    });

    //66
    test('areaLinksToSoundFile', function() {
  		quailTest.runTest( 'areaLinksToSoundFile', '66-1.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');

  		quailTest.runTest( 'areaLinksToSoundFile', '66-2.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');
    });

    //68
    test('areaDontOpenNewWindow', function() {
  		quailTest.runTest( 'areaDontOpenNewWindow', '68-1.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');
  		quailTest.runTest( 'areaDontOpenNewWindow', '68-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'areaDontOpenNewWindow', '68-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'areaDontOpenNewWindow', '68-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });
/*
    //69
    test('marqueeIsNotUsed', function() {
  		quailTest.runTest( 'marqueeIsNotUsed', '69-1.html');

    		equal(true, quailTest.confirmIsTag('marquee'), 'First item tag test');

  		quailTest.runTest( 'marqueeIsNotUsed', '69-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //70
    test('menuNotUsedToFormatText', function() {
  		quailTest.runTest( 'menuNotUsedToFormatText', '70-1.html');

    		equal(true, quailTest.confirmIsTag('menu'), 'First item tag test');

  		quailTest.runTest( 'menuNotUsedToFormatText', '70-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //71
    test('documentAutoRedirectNotUsed', function() {
  		quailTest.runTest( 'documentAutoRedirectNotUsed', '71-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentAutoRedirectNotUsed', '71-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //72
    test('documentMetaNotUsedWithTimeout', function() {
  		quailTest.runTest( 'documentMetaNotUsedWithTimeout', '72-1.html');

  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');
  		quailTest.runTest( 'documentMetaNotUsedWithTimeout', '72-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentMetaNotUsedWithTimeout', '72-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //73
    test('objectDoesNotUseColorAlone', function() {
  		quailTest.runTest( 'objectDoesNotUseColorAlone', '73-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectDoesNotUseColorAlone', '73-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //74
    test('objectTextUpdatesWhenObjectChanges', function() {
  		quailTest.runTest( 'objectTextUpdatesWhenObjectChanges', '74-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectTextUpdatesWhenObjectChanges', '74-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //75
    test('objectContentUsableWhenDisabled', function() {
  		quailTest.runTest( 'objectContentUsableWhenDisabled', '75-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectContentUsableWhenDisabled', '75-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //76
    test('objectInterfaceIsAccessible', function() {
  		quailTest.runTest( 'objectInterfaceIsAccessible', '76-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectInterfaceIsAccessible', '76-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //77
    test('objectLinkToMultimediaHasTextTranscript', function() {
  		quailTest.runTest( 'objectLinkToMultimediaHasTextTranscript', '77-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectLinkToMultimediaHasTextTranscript', '77-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //78
    test('objectMustHaveTitle', function() {
  		quailTest.runTest( 'objectMustHaveTitle', '78-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectMustHaveTitle', '78-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

   //79
    test('objectMustHaveValidTitle', function() {
  		quailTest.runTest( 'objectMustHaveValidTitle', '79-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectMustHaveValidTitle', '79-2.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
  		quailTest.runTest( 'objectMustHaveValidTitle', '79-3.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
    });

   //80
    test('objectMustContainText', function() {
  		quailTest.runTest( 'objectMustContainText', '80-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectMustContainText', '80-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'objectMustContainText', '80-3.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
    });

   //81
    test('listNotUsedForFormatting', function() {
  		quailTest.runTest( 'listNotUsedForFormatting', '81-1.html');

    		equal(true, quailTest.confirmIsTag('ol'), 'First item tag test');

  		quailTest.runTest( 'listNotUsedForFormatting', '81-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

   //82
    test('pNotUsedAsHeader', function() {
  		quailTest.runTest( 'pNotUsedAsHeader', '82-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');

  		quailTest.runTest( 'pNotUsedAsHeader', '82-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'pNotUsedAsHeader', '82-3.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'pNotUsedAsHeader', '82-4.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'pNotUsedAsHeader', '82-5.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'pNotUsedAsHeader', '82-6.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'pNotUsedAsHeader', '82-7.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');

  		quailTest.runTest( 'pNotUsedAsHeader', '82-8.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'pNotUsedAsHeader', '82-9.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //86
    test('scriptsDoNotUseColorAlone', function() {
  		quailTest.runTest( 'scriptsDoNotUseColorAlone', '86-1.html');

    		equal(true, quailTest.confirmIsTag('script'), 'First item tag test');
  		quailTest.runTest( 'scriptsDoNotUseColorAlone', '86-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //87
    test('scriptsDoNotFlicker', function() {
  		quailTest.runTest( 'scriptsDoNotFlicker', '87-1.html');

    		equal(true, quailTest.confirmIsTag('script'), 'First item tag test');
  		quailTest.runTest( 'scriptsDoNotFlicker', '87-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //88
    test('scriptContentAccessibleWithScriptsTurnedOff', function() {
  		quailTest.runTest( 'scriptContentAccessibleWithScriptsTurnedOff', '88-1.html');

    		equal(true, quailTest.confirmIsTag('script'), 'First item tag test');
  		quailTest.runTest( 'scriptContentAccessibleWithScriptsTurnedOff', '88-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //89
    test('scriptUIMustBeAccessible', function() {
  		quailTest.runTest( 'scriptUIMustBeAccessible', '89-1.html');

    		equal(true, quailTest.confirmIsTag('script'), 'First item tag test');
  		quailTest.runTest( 'scriptUIMustBeAccessible', '89-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //90
    test('scriptInBodyMustHaveNoscript', function() {
  		quailTest.runTest( 'scriptInBodyMustHaveNoscript', '90-1.html');

    		equal(true, quailTest.confirmIsTag('script'), 'First item tag test');
  		quailTest.runTest( 'scriptInBodyMustHaveNoscript', '90-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //91
    test('selectHasAssociatedLabel', function() {
  		quailTest.runTest( 'selectHasAssociatedLabel', '91-1.html');

    		equal(true, quailTest.confirmIsTag('select'), 'First item tag test');

  		quailTest.runTest( 'selectHasAssociatedLabel', '91-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'selectHasAssociatedLabel', '91-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'selectHasAssociatedLabel', '91-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //92
    test('selectDoesNotChangeContext', function() {
  		quailTest.runTest( 'selectDoesNotChangeContext', '92-1.html');

    		equal(true, quailTest.confirmIsTag('select'), 'First item tag test');

  		quailTest.runTest( 'selectDoesNotChangeContext', '92-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'selectDoesNotChangeContext', '92-3.html');

    		equal(true, quailTest.confirmIsTag('select'), 'First item tag test');
    });

    //93
    test('textareaHasAssociatedLabel', function() {
  		quailTest.runTest( 'textareaHasAssociatedLabel', '95-1.html');

    		equal(true, quailTest.confirmIsTag('textarea'), 'First item tag test');

  		quailTest.runTest( 'textareaHasAssociatedLabel', '95-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'textareaHasAssociatedLabel', '95-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'textareaHasAssociatedLabel', '95-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //96
     test('textareaLabelPositionedClose', function() {
  		quailTest.runTest( 'textareaLabelPositionedClose', '96-1.html');

    		equal(true, quailTest.confirmIsTag('textarea'), 'First item tag test');

  		quailTest.runTest( 'textareaLabelPositionedClose', '96-2.html');

    		equal(true, quailTest.confirmIsTag('textarea'), 'First item tag test');
    });


    //97
     test('cssDocumentMakesSenseStyleTurnedOff', function() {
  		quailTest.runTest( 'cssDocumentMakesSenseStyleTurnedOff', '97-1.html');

    		equal(true, quailTest.confirmIsTag('link'), 'First item tag test');

  		quailTest.runTest( 'cssDocumentMakesSenseStyleTurnedOff', '97-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //98
     test('documentAbbrIsUsed', function() {
  		quailTest.runTest( 'documentAbbrIsUsed', '98-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');

  		quailTest.runTest( 'documentAbbrIsUsed', '98-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentAbbrIsUsed', '98-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentAbbrIsUsed', '98-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //99
     test('documentAcronymsHaveElement', function() {
  		quailTest.runTest( 'documentAcronymsHaveElement', '99-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');

  		quailTest.runTest( 'documentAcronymsHaveElement', '99-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //100
     test('blockquoteNotUsedForIndentation', function() {
  		quailTest.runTest( 'blockquoteNotUsedForIndentation', '100-1.html');

    		equal(true, quailTest.confirmIsTag('blockquote'), 'First item tag test');

  		quailTest.runTest( 'blockquoteNotUsedForIndentation', '100-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //102
     test('scriptOnclickRequiresOnKeypress', function() {
  		quailTest.runTest( 'scriptOnclickRequiresOnKeypress', '102-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOnclickRequiresOnKeypress', '102-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //103
     test('scriptOndblclickRequiresOnKeypress', function() {
  		quailTest.runTest( 'scriptOndblclickRequiresOnKeypress', '103-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOndblclickRequiresOnKeypress', '103-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //104
     test('scriptOnmousedownRequiresOnKeypress', function() {
  		quailTest.runTest( 'scriptOnmousedownRequiresOnKeypress', '104-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOnmousedownRequiresOnKeypress', '104-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //105
     test('scriptOnmousemove', function() {
  		quailTest.runTest( 'scriptOnmousemove', '105-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOnmousemove', '105-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });


    //106
      test('scriptOnmouseoutHasOnmouseblur', function() {
  		quailTest.runTest( 'scriptOnmouseoutHasOnmouseblur', '106-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOnmouseoutHasOnmouseblur', '106-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //107
      test('scriptOnmouseoverHasOnfocus', function() {
  		quailTest.runTest( 'scriptOnmouseoverHasOnfocus', '107-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOnmouseoverHasOnfocus', '107-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //108
      test('scriptOnmouseupHasOnkeyup', function() {
  		quailTest.runTest( 'scriptOnmouseupHasOnkeyup', '108-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'scriptOnmouseupHasOnkeyup', '108-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //109
      test('documentContentReadableWithoutStylesheets', function() {
  		quailTest.runTest( 'documentContentReadableWithoutStylesheets', '109-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentContentReadableWithoutStylesheets', '109-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //110
      test('documentWordsNotInLanguageAreMarked', function() {
  		quailTest.runTest( 'documentWordsNotInLanguageAreMarked', '110-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentWordsNotInLanguageAreMarked', '110-2.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');
    });

    //111
      test('tableComplexHasSummary', function() {
  		quailTest.runTest( 'tableComplexHasSummary', '111-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');

  		quailTest.runTest( 'tableComplexHasSummary', '111-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'tableComplexHasSummary', '111-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //112
      test('tableSummaryIsEmpty', function() {
  		quailTest.runTest( 'tableSummaryIsEmpty', '112-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');

  		quailTest.runTest( 'tableSummaryIsEmpty', '112-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //113
      test('tableSummaryIsEmpty', function() {
  		quailTest.runTest( 'tableSummaryIsSufficient', '113-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');

  		quailTest.runTest( 'tableSummaryIsSufficient', '113-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //114
      test('tableLayoutHasNoSummary', function() {
  		quailTest.runTest( 'tableLayoutHasNoSummary', '114-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');

  		quailTest.runTest( 'tableLayoutHasNoSummary', '114-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'tableLayoutHasNoSummary', '114-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //115
      test('tableLayoutHasNoCaption', function() {
  		quailTest.runTest( 'tableLayoutHasNoCaption', '115-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');

  		quailTest.runTest( 'tableLayoutHasNoCaption', '115-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');


    });

    //116
      test('boldIsNotUsed', function() {
  		quailTest.runTest( 'boldIsNotUsed', '116-1.html');

    		equal(true, quailTest.confirmIsTag('bold'), 'First item tag test');

  		quailTest.runTest( 'boldIsNotUsed', '116-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');


    });

    //117
      test('iIsNotUsed', function() {
  		quailTest.runTest( 'iIsNotUsed', '117-1.html');

    		equal(true, quailTest.confirmIsTag('i'), 'First item tag test');

  		quailTest.runTest( 'iIsNotUsed', '117-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');


    });

    //118
      test('passwordHasLabel', function() {
  		quailTest.runTest( 'passwordHasLabel', '118-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'passwordHasLabel', '118-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'passwordHasLabel', '118-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'passwordHasLabel', '118-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //119
      test('checkboxHasLabel', function() {
  		quailTest.runTest( 'checkboxHasLabel', '119-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'checkboxHasLabel', '119-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'checkboxHasLabel', '119-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'checkboxHasLabel', '119-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });


    //120
      test('fileHasLabel', function() {
  		quailTest.runTest( 'fileHasLabel', '120-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'fileHasLabel', '120-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'fileHasLabel', '120-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'fileHasLabel', '120-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //121
      test('radioHasLabel', function() {
  		quailTest.runTest( 'radioHasLabel', '121-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'radioHasLabel', '121-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'radioHasLabel', '121-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'radioHasLabel', '121-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });

    //122
      test('passwordLabelIsNearby', function() {
  		quailTest.runTest( 'passwordLabelIsNearby', '122-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'passwordLabelIsNearby', '122-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
    });

    //123
      test('checkboxLabelIsNearby', function() {
  		quailTest.runTest( 'checkboxLabelIsNearby', '123-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'checkboxLabelIsNearby', '123-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
    });

    //124
      test('fileLabelIsNearby', function() {
  		quailTest.runTest( 'fileLabelIsNearby', '124-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'fileLabelIsNearby', '124-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
    });

    //125
      test('radioIsNearby', function() {
  		quailTest.runTest( 'radioLabelIsNearby', '125-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'radioLabelIsNearby', '125-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
    });

    //126
      test('inputTextValueNotEmpty', function() {
  		quailTest.runTest( 'inputTextValueNotEmpty', '126-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');

  		quailTest.runTest( 'inputTextValueNotEmpty', '126-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //127 && 128
      test('objectWithClassIDHasNoText', function() {
  		quailTest.runTest( 'objectWithClassIDHasNoText', '127-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectWithClassIDHasNoText', '127-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //129
    test('objectUIMustBeAccessible', function() {
  		quailTest.runTest( 'objectUIMustBeAccessible', '128-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');

  		quailTest.runTest( 'objectUIMustBeAccessible', '128-2.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
    });

    //131
    test('blockquoteUseForQuotations', function() {
  		quailTest.runTest( 'blockquoteUseForQuotations', '131-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');

  		quailTest.runTest( 'blockquoteUseForQuotations', '131-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //132
    test('imageMapServerSide', function() {
  		quailTest.runTest( 'imageMapServerSide', '132-1.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');

  		quailTest.runTest( 'imageMapServerSide', '132-2.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');
    });

    //133
    test('tableLayoutMakesSenseLinearized', function() {
  		quailTest.runTest( 'tableLayoutMakesSenseLinearized', '133-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');

  		quailTest.runTest( 'tableLayoutMakesSenseLinearized', '133-2.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
    });

    //134
    test('aLinksAreSeperatedByPrintableCharacters', function() {
  		quailTest.runTest( 'aLinksAreSeperatedByPrintableCharacters', '134-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aLinksAreSeperatedByPrintableCharacters', '134-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //135
    test('imgWithMathShouldHaveMathEquivalent', function() {
  		quailTest.runTest( 'imgWithMathShouldHaveMathEquivalent', '135-1.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');
  		quailTest.runTest( 'imgWithMathShouldHaveMathEquivalent', '135-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'imgWithMathShouldHaveMathEquivalent', '135-2.xhtml');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //136
    test('tableDataShouldHaveTh', function() {
  		quailTest.runTest( 'tableDataShouldHaveTh', '136-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableDataShouldHaveTh', '136-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //137
    test('tableLayoutDataShouldNotHaveTh', function() {
  		quailTest.runTest( 'tableLayoutDataShouldNotHaveTh', '137-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableLayoutDataShouldNotHaveTh', '137-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //138
    test('inputTextHasTabIndex', function() {
  		quailTest.runTest( 'inputTextHasTabIndex', '138-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputTextHasTabIndex', '138-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputTextHasTabIndex', '138-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //139
    test('inputRadioHasTabIndex', function() {
  		quailTest.runTest( 'inputRadioHasTabIndex', '139-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputRadioHasTabIndex', '139-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputRadioHasTabIndex', '139-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //140
    test('inputPasswordHasTabIndex', function() {
  		quailTest.runTest( 'inputPasswordHasTabIndex', '140-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputPasswordHasTabIndex', '140-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputPasswordHasTabIndex', '140-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //141
    test('inputCheckboxHasTabIndex', function() {
  		quailTest.runTest( 'inputCheckboxHasTabIndex', '141-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputCheckboxHasTabIndex', '141-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputCheckboxHasTabIndex', '141-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //142
    test('inputFileHasTabIndex', function() {
  		quailTest.runTest( 'inputFileHasTabIndex', '142-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputFileHasTabIndex', '142-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputFileHasTabIndex', '142-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //143
    test('addressForAuthor', function() {
  		quailTest.runTest( 'addressForAuthor', '143-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'addressForAuthor', '143-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

  //144
    test('addressForAuthorMustBeValid', function() {
  		quailTest.runTest( 'addressForAuthorMustBeValid', '144-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'addressForAuthorMustBeValid', '144-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //skipped 145-146 - redundant

    //147
    test('linkUsedToDescribeNavigation', function() {
  		quailTest.runTest( 'linkUsedToDescribeNavigation', '147-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');
  		quailTest.runTest( 'linkUsedToDescribeNavigation', '147-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //148
    test('linkUsedForAlternateContent', function() {
  		quailTest.runTest( 'linkUsedForAlternateContent', '148-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'linkUsedForAlternateContent', '148-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //149 - SKIPPED

    //150
    test('liDontUseImageForBullet', function() {
  		quailTest.runTest( 'liDontUseImageForBullet', '150-1.html');

    		equal(true, quailTest.confirmIsTag('li'), 'First item tag test');
  		quailTest.runTest( 'liDontUseImageForBullet', '150-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //151
    test('tableUsesCaption', function() {
  		quailTest.runTest( 'tableUsesCaption', '151-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableUsesCaption', '151-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'tableUsesCaption', '151-3.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
    });

    //152
    test('tableUsesAbbreviationForHeader', function() {
  		quailTest.runTest( 'tableUsesAbbreviationForHeader', '152-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableUsesAbbreviationForHeader', '152-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'tableUsesAbbreviationForHeader', '152-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //153
    test('tableHeaderLabelMustBeTerse', function() {
  		quailTest.runTest( 'tableHeaderLabelMustBeTerse', '153-1.html');

    		equal(true, quailTest.confirmIsTag('th'), 'First item tag test');
  		quailTest.runTest( 'tableHeaderLabelMustBeTerse', '153-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //154
    test('preShouldNotBeUsedForTabularLayout', function() {
  		quailTest.runTest( 'preShouldNotBeUsedForTabularLayout', '154-1.html');

    		equal(true, quailTest.confirmIsTag('pre'), 'First item tag test');
  		quailTest.runTest( 'preShouldNotBeUsedForTabularLayout', '154-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //155-158 skipped

    //159
    test('imgShouldNotHaveTitle', function() {
  		quailTest.runTest( 'imgShouldNotHaveTitle', '159-1.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');
  		quailTest.runTest( 'imgShouldNotHaveTitle', '159-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //160
    test('objectShouldHaveLongDescription', function() {
  		quailTest.runTest( 'objectShouldHaveLongDescription', '160-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
  		quailTest.runTest( 'objectShouldHaveLongDescription', '160-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //161
    test('emoticonsExcessiveUse', function() {
  		quailTest.runTest( 'emoticonsExcessiveUse', '161-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'emoticonsExcessiveUse', '161-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //162
    test('emoticonsMissingAbbr', function() {
  		quailTest.runTest( 'emoticonsMissingAbbr', '161-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'emoticonsMissingAbbr', '161-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //163
    test('embedHasAssociatedNoEmbed', function() {
  		quailTest.runTest( 'embedHasAssociatedNoEmbed', '163-1.html');

    		equal(true, quailTest.confirmIsTag('embed'), 'First item tag test');
  		quailTest.runTest( 'embedHasAssociatedNoEmbed', '163-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'embedHasAssociatedNoEmbed', '163-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //164
    test('noembedHasEquivalentContent', function() {
  		quailTest.runTest( 'noembedHasEquivalentContent', '164-1.html');

    		equal(true, quailTest.confirmIsTag('noembed'), 'First item tag test');
  		quailTest.runTest( 'noembedHasEquivalentContent', '164-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //165
    test('embedMustHaveAltAttribute', function() {
  		quailTest.runTest( 'embedMustHaveAltAttribute', '165-1.html');

    		equal(true, quailTest.confirmIsTag('embed'), 'First item tag test');
  		quailTest.runTest( 'embedMustHaveAltAttribute', '165-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //166
    test('embedMustNotHaveEmptyAlt', function() {
  		quailTest.runTest( 'embedMustNotHaveEmptyAlt', '166-1.html');

    		equal(true, quailTest.confirmIsTag('embed'), 'First item tag test');
  		quailTest.runTest( 'embedMustNotHaveEmptyAlt', '166-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //167
    test('iframeMustNotHaveLongdesc', function() {
  		quailTest.runTest( 'iframeMustNotHaveLongdesc', '167-1.html');

    		equal(true, quailTest.confirmIsTag('iframe'), 'First item tag test');
  		quailTest.runTest( 'iframeMustNotHaveLongdesc', '167-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //168
    test('radioMarkedWithFieldgroupAndLegend', function() {
  		quailTest.runTest( 'radioMarkedWithFieldgroupAndLegend', '168-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'radioMarkedWithFieldgroupAndLegend', '168-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'radioMarkedWithFieldgroupAndLegend', '168-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'radioMarkedWithFieldgroupAndLegend', '168-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //169
    test('selectWithOptionsHasOptgroup', function() {
  		quailTest.runTest( 'selectWithOptionsHasOptgroup', '169-1.html');

    		equal(true, quailTest.confirmIsTag('select'), 'First item tag test');
  		quailTest.runTest( 'selectWithOptionsHasOptgroup', '169-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //173
    test('aSuspiciousLinkText', function() {
  		quailTest.runTest( 'aSuspiciousLinkText', '173-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aSuspiciousLinkText', '173-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aSuspiciousLinkText', '173-3.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
    });

    //174
    test('aMustContainText', function() {
  		quailTest.runTest( 'aMustContainText', '174-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aMustContainText', '174-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aMustContainText', '174-3.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aMustContainText', '174-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aMustContainText', '174-5.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

    });


    //175
    test('aImgAltNotRepetative', function() {
  		quailTest.runTest( 'aImgAltNotRepetative', '175-1.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');
  		quailTest.runTest( 'aImgAltNotRepetative', '175-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

    //176
    test('basefontIsNotUsed', function() {
  		quailTest.runTest( 'basefontIsNotUsed', '176-1.html');

    		equal(true, quailTest.confirmIsTag('basefont'), 'First item tag test');
  		quailTest.runTest( 'basefontIsNotUsed', '176-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

    //177
    test('fontIsNotUsed', function() {
  		quailTest.runTest( 'fontIsNotUsed', '177-1.html');

    		equal(true, quailTest.confirmIsTag('font'), 'First item tag test');
  		quailTest.runTest( 'fontIsNotUsed', '177-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //Skipped 178-179

    //180
    test('aAdjacentWithSameResourceShouldBeCombined', function() {
  		quailTest.runTest( 'aAdjacentWithSameResourceShouldBeCombined', '180-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aAdjacentWithSameResourceShouldBeCombined', '180-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

    //181
    test('aMustNotHaveJavascriptHref', function() {
  		quailTest.runTest( 'aMustNotHaveJavascriptHref', '181-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aMustNotHaveJavascriptHref', '181-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

    //182
    test('bodyMustNotHaveBackground', function() {
  		quailTest.runTest( 'bodyMustNotHaveBackground', '182-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'bodyMustNotHaveBackground', '182-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

    //183
    test('objectMustHaveEmbed', function() {
  		quailTest.runTest( 'objectMustHaveEmbed', '183-1.html');
  		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
  		quailTest.runTest( 'objectMustHaveEmbed', '183-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

    //184
    test('siteMap', function() {
  		quailTest.runTest( 'siteMap', '184-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'siteMap', '184-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //185
    test('documentIDsMustBeUnique', function() {
  		quailTest.runTest( 'documentIDsMustBeUnique', '185-1.html');

    		equal(true, quailTest.confirmIsTag('th'), 'First item tag test');
  		quailTest.runTest( 'documentIDsMustBeUnique', '185-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //186
    test('labelDoesNotContainInput', function() {
  		quailTest.runTest( 'labelDoesNotContainInput', '186-1.html');

    		equal(true, quailTest.confirmIsTag('label'), 'First item tag test');
  		quailTest.runTest( 'labelDoesNotContainInput', '186-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //187
    test('labelMustBeUnique', function() {
  		quailTest.runTest( 'labelMustBeUnique', '187-1.html');

    		equal(true, quailTest.confirmIsTag('label'), 'First item tag test');
  		quailTest.runTest( 'labelMustBeUnique', '187-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //188
    test('labelMustNotBeEmpty', function() {
  		quailTest.runTest( 'labelMustNotBeEmpty', '188-1.html');

    		equal(true, quailTest.confirmIsTag('label'), 'First item tag test');
  		quailTest.runTest( 'labelMustNotBeEmpty', '188-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'labelMustNotBeEmpty', '188-3.html');

    		equal(true, quailTest.confirmIsTag('label'), 'First item tag test');
  		quailTest.runTest( 'labelMustNotBeEmpty', '188-3.html');

    		equal(true, quailTest.confirmIsTag('label'), 'First item tag test');
     });

     //190
    test('aMustHaveTitle', function() {
  		quailTest.runTest( 'aMustHaveTitle', '190-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aMustHaveTitle', '190-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //191
    test('aTitleDescribesDestination', function() {
  		quailTest.runTest( 'aTitleDescribesDestination', '191-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aTitleDescribesDestination', '191-2.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
     });

     //192
    test('inputImageAltNotRedundant', function() {
  		quailTest.runTest( 'inputImageAltNotRedundant', '192-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputImageAltNotRedundant', '192-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //193
    test('inputImageNotDecorative', function() {
  		quailTest.runTest( 'inputImageNotDecorative', '193-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputImageNotDecorative', '193-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
     });

     //194
    test('areaAltRefersToText', function() {
  		quailTest.runTest( 'areaAltRefersToText', '194-1.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');
  		quailTest.runTest( 'areaAltRefersToText', '194-2.html');

    		equal(true, quailTest.confirmIsTag('area'), 'First item tag test');
     });

     //195
    test('aLinkTextDoesNotBeginWithRedundantWord', function() {
  		quailTest.runTest( 'aLinkTextDoesNotBeginWithRedundantWord', '195-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aLinkTextDoesNotBeginWithRedundantWord', '195-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aLinkTextDoesNotBeginWithRedundantWord', '195-3.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aLinkTextDoesNotBeginWithRedundantWord', '195-4.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //196
    test('imgServerSideMapNotUsed', function() {
  		quailTest.runTest( 'imgServerSideMapNotUsed', '196-1.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');
  		quailTest.runTest( 'imgServerSideMapNotUsed', '196-2.html');

    		equal(true, quailTest.confirmIsTag('img'), 'First item tag test');
     });

  	//Skipped 197
     //198
    test('legendDescribesListOfChoices', function() {
  		quailTest.runTest( 'legendDescribesListOfChoices', '198-1.html');

    		equal(true, quailTest.confirmIsTag('legend'), 'First item tag test');
  		quailTest.runTest( 'legendDescribesListOfChoices', '198-2.html');

    		equal(true, quailTest.confirmIsTag('legend'), 'First item tag test');
     });

     //199
    test('legendTextNotEmpty', function() {
  		quailTest.runTest( 'legendTextNotEmpty', '199-1.html');

    		equal(true, quailTest.confirmIsTag('legend'), 'First item tag test');
  		quailTest.runTest( 'legendTextNotEmpty', '199-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //200
    test('legendTextNotPlaceholder', function() {
  		quailTest.runTest( 'legendTextNotPlaceholder', '200-1.html');

    		equal(true, quailTest.confirmIsTag('legend'), 'First item tag test');
  		quailTest.runTest( 'legendTextNotPlaceholder', '200-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //201
    test('frameTitlesNotEmpty', function() {
  		quailTest.runTest( 'frameTitlesNotEmpty', '201-1.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');
  		quailTest.runTest( 'frameTitlesNotEmpty', '201-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //202
    test('frameTitlesNotPlaceholder', function() {
  		quailTest.runTest( 'frameTitlesNotPlaceholder', '202-1.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');
  		quailTest.runTest( 'frameTitlesNotPlaceholder', '202-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //203
    test('tableSummaryDescribesTable', function() {
  		quailTest.runTest( 'tableSummaryDescribesTable', '203-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableSummaryDescribesTable', '203-2.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
     });

     //204-220 skipped  -  already covered in previous tests
     //221
    test('bodyColorContrast', function() {
  		quailTest.runTest( 'bodyColorContrast', '221-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'bodyColorContrast', '221-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'bodyColorContrast', '221-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //222
    test('bodyLinkColorContrast', function() {
  		quailTest.runTest( 'bodyLinkColorContrast', '222-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'bodyLinkColorContrast', '222-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'bodyLinkColorContrast', '222-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //223
    test('bodyActiveLinkColorContrast', function() {
  		quailTest.runTest( 'bodyActiveLinkColorContrast', '223-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'bodyActiveLinkColorContrast', '223-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'bodyActiveLinkColorContrast', '223-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //224
    test('bodyVisitedLinkColorContrast', function() {
  		quailTest.runTest( 'bodyVisitedLinkColorContrast', '224-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'bodyVisitedLinkColorContrast', '224-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'bodyVisitedLinkColorContrast', '224-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
     });

     //225
    test('documentStrictDocType', function() {

  		quailTest.runTest( 'documentStrictDocType', '225-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentStrictDocType', '225-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentStrictDocType', '225-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentStrictDocType', '225-4.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentStrictDocType', '225-5.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');
     });

     //226
    test('documentColorWaiAlgorithm', function() {

  		quailTest.runTest( 'documentColorWaiAlgorithm', '226-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentColorWaiAlgorithm', '226-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentColorWaiAlgorithm', '226-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
  	});

     //227
    test('documentColorWaiLinkAlgorithm', function() {

  		quailTest.runTest( 'documentColorWaiLinkAlgorithm', '227-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentColorWaiLinkAlgorithm', '227-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentColorWaiLinkAlgorithm', '227-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
  	});

     //228
    test('documentColorWaiActiveLinkAlgorithm', function() {

  		quailTest.runTest( 'documentColorWaiActiveLinkAlgorithm', '228-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentColorWaiActiveLinkAlgorithm', '228-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentColorWaiActiveLinkAlgorithm', '228-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
  	});

     //229
    test('documentColorWaiVisitedLinkAlgorithm', function() {

  		quailTest.runTest( 'documentColorWaiVisitedLinkAlgorithm', '229-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentColorWaiVisitedLinkAlgorithm', '229-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentColorWaiVisitedLinkAlgorithm', '229-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
  	});

     //230
    test('tableIsGrouped', function() {

  		quailTest.runTest( 'tableIsGrouped', '230-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableIsGrouped', '230-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

     //231
    test('tableUseColGroup', function() {

  		quailTest.runTest( 'tableUseColGroup', '231-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableUseColGroup', '231-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

     //232
    test('documentValidatesToDocType', function() {

  		quailTest.runTest( 'documentValidatesToDocType', '232-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentValidatesToDocType', '232-2.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');
    });

     //233
    test('framesetIsNotUsed', function() {

  		quailTest.runTest( 'framesetIsNotUsed', '233-1.html');

    		equal(true, quailTest.confirmIsTag('frameset'), 'First item tag test');
  		quailTest.runTest( 'framesetIsNotUsed', '232-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

     //234
    test('frameIsNotUsed', function() {

  		quailTest.runTest( 'frameIsNotUsed', '234-1.html');

    		equal(true, quailTest.confirmIsTag('frame'), 'First item tag test');
  		quailTest.runTest( 'frameIsNotUsed', '234-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

     //235
    test('documentReadingDirection', function() {

  		quailTest.runTest( 'documentReadingDirection', '235-1.html');

    		equal(true, quailTest.confirmIsTag('blockquote'), 'First item tag test');
  		quailTest.runTest( 'documentReadingDirection', '235-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

     //236
    test('aAdjacentDontPointToSameResource', function() {

  		quailTest.runTest( 'aAdjacentWithSameResourceShouldBeCombined', '236-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
  		quailTest.runTest( 'aAdjacentWithSameResourceShouldBeCombined', '236-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'aAdjacentWithSameResourceShouldBeCombined', '236-1.html');

    		equal(true, quailTest.confirmIsTag('a'), 'First item tag test');
    });

    //skipped 237

      //238
    test('inputElementsDontHaveAlt', function() {

  		quailTest.runTest( 'inputElementsDontHaveAlt', '238-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputElementsDontHaveAlt', '238-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //skipped 239 & 240


    //241
    test('tabularDataIsInTable', function() {

  		quailTest.runTest( 'tabularDataIsInTable', '241-1.html');

    		equal(true, quailTest.confirmIsTag('pre'), 'First item tag test');
  		quailTest.runTest( 'tabularDataIsInTable', '241-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //242
    test('tableCaptionIdentifiesTable', function() {

  		quailTest.runTest( 'tableCaptionIdentifiesTable', '242-1.html');

    		equal(true, quailTest.confirmIsTag('caption'), 'First item tag test');
  		quailTest.runTest( 'tableCaptionIdentifiesTable', '242-2.html');

    		equal(true, quailTest.confirmIsTag('caption'), 'First item tag test');
    });

    //243
    test('tableSummaryDoesNotDuplicateCaption', function() {

  		quailTest.runTest( 'tableSummaryDoesNotDuplicateCaption', '243-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableSummaryDoesNotDuplicateCaption', '243-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //244
    test('tableWithBothHeadersUseScope', function() {

  		quailTest.runTest( 'tableWithBothHeadersUseScope', '244-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableWithBothHeadersUseScope', '244-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //245
    test('tableWithMoreHeadersUseID', function() {

  		quailTest.runTest( 'tableWithMoreHeadersUseID', '245-1.html');

    		equal(true, quailTest.confirmIsTag('table'), 'First item tag test');
  		quailTest.runTest( 'tableWithMoreHeadersUseID', '245-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //246
    test('formWithRequiredLabel', function() {

  		quailTest.runTest( 'formWithRequiredLabel', '246-1.html');

    		equal(true, quailTest.confirmIsTag('label'), 'First item tag test');
  		quailTest.runTest( 'formWithRequiredLabel', '246-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'formWithRequiredLabel', '246-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'formWithRequiredLabel', '246-4.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
  		quailTest.runTest( 'formWithRequiredLabel', '246-5.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
    });

    //247
    test('inputCheckboxRequiresFieldset', function() {

  		quailTest.runTest( 'inputCheckboxRequiresFieldset', '247-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputCheckboxRequiresFieldset', '247-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //248
    test('documentVisualListsAreMarkedUp', function() {

  		quailTest.runTest( 'documentVisualListsAreMarkedUp', '248-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'documentVisualListsAreMarkedUp', '248-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

     //skipped 249 - 250 - 251

     //252
    test('documentAllColorsAreSet', function() {

  		quailTest.runTest( 'documentAllColorsAreSet', '252-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentAllColorsAreSet', '252-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentAllColorsAreSet', '252-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //258
    test('appletProvidesMechanismToReturnToParent', function() {

  		quailTest.runTest( 'appletProvidesMechanismToReturnToParent', '258-1.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
  		quailTest.runTest( 'appletProvidesMechanismToReturnToParent', '258-2.html');

    		equal(true, quailTest.confirmIsTag('applet'), 'First item tag test');
     });

    //259
    test('objectProvidesMechanismToReturnToParent', function() {

  		quailTest.runTest( 'objectProvidesMechanismToReturnToParent', '259-1.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
  		quailTest.runTest( 'objectProvidesMechanismToReturnToParent', '259-2.html');

    		equal(true, quailTest.confirmIsTag('object'), 'First item tag test');
     });

    //260
    test('embedProvidesMechanismToReturnToParent', function() {

  		quailTest.runTest( 'embedProvidesMechanismToReturnToParent', '260-1.html');

    		equal(true, quailTest.confirmIsTag('embed'), 'First item tag test');
  		quailTest.runTest( 'embedProvidesMechanismToReturnToParent', '260-2.html');

    		equal(true, quailTest.confirmIsTag('embed'), 'First item tag test');
     });



    //261
    test('headersUseToMarkSections', function() {

  		quailTest.runTest( 'headersUseToMarkSections', '261-1.html');

    		equal(true, quailTest.confirmIsTag('p'), 'First item tag test');
  		quailTest.runTest( 'headersUseToMarkSections', '261-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
  		quailTest.runTest( 'headersUseToMarkSections', '261-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');   });
     //skipped 262-263

    //264
    test('inputSubmitHasTabIndex', function() {

  		quailTest.runTest( 'inputSubmitHasTabIndex', '264-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputSubmitHasTabIndex', '264-2.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'inputSubmitHasTabIndex', '264-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');   });

    //265
    test('tabIndexFollowsLogicalOrder', function() {

  		quailTest.runTest( 'tabIndexFollowsLogicalOrder', '265-1.html');

    		equal(true, quailTest.confirmIsTag('input'), 'First item tag test');
  		quailTest.runTest( 'tabIndexFollowsLogicalOrder', '265-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');  });

    //267

    //268
    test('formHasGoodErrorMessage', function() {

  		quailTest.runTest( 'formHasGoodErrorMessage', '268-1.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
  		quailTest.runTest( 'formHasGoodErrorMessage', '268-2.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
    });

    //269
    test('formErrorMessageHelpsUser', function() {

  		quailTest.runTest( 'formErrorMessageHelpsUser', '269-1.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
  		quailTest.runTest( 'formErrorMessageHelpsUser', '269-2.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
    });

    //270
    test('formAllowsCheckIfIrreversable', function() {

  		quailTest.runTest( 'formAllowsCheckIfIrreversable', '269-1.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
  		quailTest.runTest( 'formAllowsCheckIfIrreversable', '269-2.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
    });

    //skipped 271

    //271
    test('documentReadingDirection', function() {

  		quailTest.runTest( 'documentReadingDirection', '271-1.html');

    		equal(true, quailTest.confirmIsTag('span'), 'First item tag test');
  		quailTest.runTest( 'documentReadingDirection', '271-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    });

    //272
    test('formDeleteIsReversable', function() {

  		quailTest.runTest( 'formDeleteIsReversable', '272-1.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
  		quailTest.runTest( 'formDeleteIsReversable', '272-2.html');

    		equal(true, quailTest.confirmIsTag('form'), 'First item tag test');
    });*/

  });

})(jQuery);