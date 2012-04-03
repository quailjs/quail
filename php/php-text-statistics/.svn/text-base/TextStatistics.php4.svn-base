<?php

    /*

        TextStatistics Class (PHP4)
        http://code.google.com/p/php-text-statistics/

        Released under New BSD license
        http://www.opensource.org/licenses/bsd-license.php

        Calculates following readability scores (formulae can be found in wiki):
          * Flesch Kincaid Reading Ease
          * Flesch Kincaid Grade Level
          * Gunning Fog Score
          * Coleman Liau Index
          * SMOG Index
          * Automated Reability Index

        Will also give:
          * String length
          * Letter count
          * Syllable count
          * Sentence count
          * Average words per sentence
          * Average syllables per word
        
        Sample Code
        ----------------


    */
        $statistics = new TextStatistics;
        $text = 'California State University, Monterey Bay (CSUMB) is envisioned as a comprehensive state university which values service through high quality education. The campus will be distinctive in serving the diverse people of California, especially the working class and historically undereducated and low-income populations. It will feature an enriched living and learning environment and year-round operation. The identity of the university will be framed by substantive commitment to multilingual, multicultural, gender-equitable learning. The university will be a collaborative, intellectual community distinguished by partnerships with existing institutions both public and private, cooperative agreements which enable students, faculty, and staff to cross institutional boundaries for innovative instruction, broadly defined scholarly and creative activity, and coordinated community service.

The university will invest in preparation for the future through integrated and experimental use of technologies as resources to people, catalysts for learning, and providers of increased access and enriched quality learning. The curriculum of CSUMB will be student and society centered and of sufficient breadth and depth to meet statewide and regional needs, specifically those involving both inner-city and isolated rural populations, and needs relevant to communities in the immediate Tri-County region (Monterey, Santa Cruz, and San Benito). The programs of instruction will strive for distinction, building on regional assets in developing specialty clusters in such areas as: the sciences (marine, atmospheric, and environmental); visual and performing arts and related humanities; languages, cultures, and international studies; education; business; studies of human behavior, information, and communication, within broad curricular areas; and professional study.

The university will develop a culture of innovation in its overall conceptual design and organization, and will utilize new and varied pedagogical and instructional approaches including distance learning. Institutional programs will value and cultivate creative and productive talents of students, faculty, and staff, and seek ways to contribute to the economy of the state, the wellbeing of our communities, and the quality of life and development of its students, faculty, and service areas.

The education programs at CSUMB will:

Integrate the sciences, the arts and humanities, liberal studies, and professional training;
Integrate modern learning technology and pedagogy to create liberal education adequate for the contemporary world;
Integrate work and learning, service and reflection;
Recognize the importance of global interdependence;
Invest in languages and cross-cultural competence;
Emphasize those topics most central to the local area\'s economy and ecology, and California\'s long-term needs;
Offer a multicultural, gender-equitable, intergenerational, and accessible residential learning environment.
The university will provide a new model of organizing, managing, and financing higher education:

The university will be integrated with other institutions, essentially collaborative in its orientation, and active in seeking partnerships across institutional boundaries. It will develop and implement various arrangements for sharing courses, curriculum, faculty, students, and facilities with other institutions.
The organizational structure of the university will reflect a belief in the importance of each administrative staff and faculty member, working to integrate the university community across "staff" and "faculty" lines.
The financial aid system will emphasize a fundamental commitment to equity and access.
The budget and financial systems, including student fees, will provide for efficient and effective operation of the university.
University governance will be exercised with a substantial amount of autonomy and independence within a very broad CSU systemwide policy context.
Accountability will emphasize careful evaluation and assessment of results and outcomes.
Our vision of the goals of California State University, Monterey Bay includes: a model pluralistic academic community where all learn and teach one another in an atmosphere of mutual respect and pursuit of excellence; a faculty and staff motivated to excel in their respective fields as well as to contribute to the broadly defined university environment. Our graduates will have an understanding of interdependence and global competence, distinctive technical and educational skills, the experience and abilities to contribute to California\'s high quality work force, the critical thinking abilities to be productive citizens, and the social responsibility and skills to be community builders. CSUMB will dynamically link the past, present, and future by responding to historical and changing conditions, experimenting with strategies which increase access, improve quality, and lower costs through education in a distinctive CSU environment. University students and personnel will attempt analytically and creatively to meet critical state and regional needs, and to provide California with responsible and creative leadership for the global 21st century.';
        echo 'Flesch-Kincaid Reading Ease: ' . $statistics->flesch_kincaid_reading_ease($text);
    class TextStatistics {

        var $strEncoding = ''; // Used to hold character encoding to be used by object, if set

        /**
         * Constructor.
         *
         * @param string  $strEncoding    Optional character encoding.
         * @return void
         */
        function __construct($strEncoding = '') {
            if ($strEncoding <> '') {
                // Encoding is given. Use it!
                $this->strEncoding = $strEncoding;
            }
        }

        function TextStatistics() {
            $this->__construct();
        }

        /**
         * Gives the Flesch-Kincaid Reading Ease of text entered rounded to one digit
         * @param   strText         Text to be checked
         */
        function flesch_kincaid_reading_ease($strText) {
            $strText = $this->clean_text($strText);
            return round((206.835 - (1.015 * $this->average_words_per_sentence($strText)) - (84.6 * $this->average_syllables_per_word($strText))), 1);
        }

        /**
         * Gives the Flesch-Kincaid Grade level of text entered rounded to one digit
         * @param   strText         Text to be checked
         */
        function flesch_kincaid_grade_level($strText) {
            $strText = $this->clean_text($strText);
            return round(((0.39 * $this->average_words_per_sentence($strText)) + (11.8 * $this->average_syllables_per_word($strText)) - 15.59), 1);
        }

        /**
         * Gives the Gunning-Fog score of text entered rounded to one digit
         * @param   strText         Text to be checked
         */
        function gunning_fog_score($strText) {
            $strText = $this->clean_text($strText);
            return round((($this->average_words_per_sentence($strText) + $this->percentage_words_with_three_syllables($strText, false)) * 0.4), 1);
        }

        /**
         * Gives the Coleman-Liau Index of text entered rounded to one digit
         * @param   strText         Text to be checked
         */
        function coleman_liau_index($strText) {
            $strText = $this->clean_text($strText);
            return round( ( (5.89 * ($this->letter_count($strText) / $this->word_count($strText))) - (0.3 * ($this->sentence_count($strText) / $this->word_count($strText))) - 15.8 ), 1);
        }

        /**
         * Gives the SMOG Index of text entered rounded to one digit
         * @param   strText         Text to be checked
         */
        function smog_index($strText) {
            $strText = $this->clean_text($strText);
            return round(1.043 * sqrt(($this->words_with_three_syllables($strText) * (30 / $this->sentence_count($strText))) + 3.1291), 1);
        }

        /**
         * Gives the Automated Readability Index of text entered rounded to one digit
         * @param   strText         Text to be checked
         */
        function automated_readability_index($strText) {
            $strText = $this->clean_text($strText);
            return round(((4.71 * ($this->letter_count($strText) / $this->word_count($strText))) + (0.5 * ($this->word_count($strText) / $this->sentence_count($strText))) - 21.43), 1);
        }

        /**
         * Gives letter count (ignores all non-letters).
         * @param   strText      Text to be measured
         */
        function letter_count($strText) {
            $strText = $this->clean_text($strText); // To clear out newlines etc
            $intTextLength = 0;
            $strText = preg_replace('/[^A-Za-z]+/', '', $strText);
            $intTextLength = strlen($strText);
            return $intTextLength;
        }

        /**
         * Trims, removes line breaks, multiple spaces and generally cleans text before processing.
         * @param   strText      Text to be transformed
         */
        function clean_text($strText) {
            $strText = preg_replace('/[,:;()-]/', ' ', $strText); // Replace commans, hyphens etc (count them as spaces)
            $strText = preg_replace('/[\.!?]/', '.', $strText); // Unify terminators
            $strText = trim($strText) . '.'; // Add final terminator, just in case it's missing.
            $strText = preg_replace('/[ ]*(\n|\r\n|\r)[ ]*/', ' ', $strText); // Replace new lines with spaces
            $strText = preg_replace('/([\.])[\. ]+/', '$1', $strText); // Check for duplicated terminators
            $strText = trim(preg_replace('/[ ]*([\.])/', '$1 ', $strText)); // Pad sentence terminators
            $strText = preg_replace('/[ ]+/', ' ', $strText); // Remove multiple spaces
            $strText = preg_replace_callback('/\. [^ ]+/', create_function('$matches', 'return strtolower($matches[0]);'), $strText); // Lower case all words following terminators (for gunning fog score)
            return $strText;
        }

        /**
         * Returns sentence count for text.
         * @param   strText      Text to be measured
         */
        function sentence_count($strText) {
            $strText = $this->clean_text($strText);
            // Will be tripped up by "Mr." or "U.K.". Not a major concern at this point.
            $intSentences = max(1, strlen(preg_replace('/[^\.!?]/', '', $strText)));
            return $intSentences;
        }

        /**
         * Returns word count for text.
         * @param   strText      Text to be measured
         */
        function word_count($strText) {
            $strText = $this->clean_text($strText);
            // Will be tripped by by em dashes with spaces either side, among other similar characters
            $intWords = 1 + strlen(preg_replace('/[^ ]/', '', $strText)); // Space count + 1 is word count
            return $intWords;
        }

        /**
         * Returns average words per sentence for text.
         * @param   strText      Text to be measured
         */
        function average_words_per_sentence($strText) {
            $strText = $this->clean_text($strText);
            $intSentenceCount = $this->sentence_count($strText);
            $intWordCount = $this->word_count($strText);
            return ($intWordCount / $intSentenceCount);
        }

        /**
         * Returns average syllables per word for text.
         * @param   strText      Text to be measured
         */
        function average_syllables_per_word($strText) {
            $strText = $this->clean_text($strText);
            $intSyllableCount = 0;
            $intWordCount = $this->word_count($strText);
            $arrWords = explode(' ', $strText);
            for ($i = 0; $i < $intWordCount; $i++) {
                $intSyllableCount += $this->syllable_count($arrWords[$i]);
            }
            return ($intSyllableCount / $intWordCount);
        }

        /**
         * Returns the number of words with more than three syllables
         * @param   strText                  Text to be measured
         * @param   blnCountProperNouns      Boolean - should proper nouns be included in words count
         */
        function words_with_three_syllables($strText, $blnCountProperNouns = true) {
            $strText = $this->clean_text($strText);
            $intLongWordCount = 0;
            $intWordCount = $this->word_count($strText);
            $arrWords = explode(' ', $strText);
            for ($i = 0; $i < $intWordCount; $i++) {
                if ($this->syllable_count($arrWords[$i]) > 2) {
                    if ($blnCountProperNouns) { 
                        $intLongWordCount++;
                    } else {
                        $strFirstLetter = substr($arrWords[$i], 0, 1);
                        if ($strFirstLetter !== strtoupper($strFirstLetter)) {
                            // First letter is lower case. Count it.
                            $intLongWordCount++;
                        }
                    }
                }
            }
            return ($intLongWordCount);
        }

        /**
         * Returns the percentage of words with more than three syllables
         * @param   strText      Text to be measured
         * @param   blnCountProperNouns      Boolean - should proper nouns be included in words count
         */
        function percentage_words_with_three_syllables($strText, $blnCountProperNouns = true) {
            $strText = $this->clean_text($strText);
            $intWordCount = $this->word_count($strText);
            $intLongWordCount = $this->words_with_three_syllables($strText, $blnCountProperNouns);
            $intPercentage = (($intLongWordCount / $intWordCount) * 100);
            return ($intPercentage);
        }

        /**
         * Returns the number of syllables in the word.
         * Based in part on Greg Fast's Perl module Lingua::EN::Syllables
         * @param   strWord      Word to be measured
         */
        function syllable_count($strWord) {

            $intSyllableCount = 0;
            $strWord = strtolower($strWord);

            // Specific common exceptions that don't follow the rule set below are handled individually
            // Array of problem words (with word as key, syllable count as value)
            $arrProblemWords = Array(
                 'simile' => 3
                ,'forever' => 3
                ,'shoreline' => 2
            );
            $intSyllableCount = $arrProblemWords[$strWord];
            if ($intSyllableCount > 0) { 
                return $intSyllableCount;
            }

            // These syllables would be counted as two but should be one
            $arrSubSyllables = Array(
                 'cial'
                ,'tia'
                ,'cius'
                ,'cious'
                ,'giu'
                ,'ion'
                ,'iou'
                ,'sia$'
                ,'[^aeiuoyt]{2,}ed$'
                ,'.ely$'
                ,'[cg]h?e[rsd]?$'
                ,'rved?$'
                ,'[aeiouy][dt]es?$'
                ,'[aeiouy][^aeiouydt]e[rsd]?$'
                ,'^[dr]e[aeiou][^aeiou]+$' // Sorts out deal, deign etc
                ,'[aeiouy]rse$' // Purse, hearse
            );

            // These syllables would be counted as one but should be two
            $arrAddSyllables = Array(
                 'ia'
                ,'riet'
                ,'dien'
                ,'iu'
                ,'io'
                ,'ii'
                ,'[aeiouym]bl$'
                ,'[aeiou]{3}'
                ,'^mc'
                ,'ism$'
                ,'([^aeiouy])\1l$'
                ,'[^l]lien'
                ,'^coa[dglx].'
                ,'[^gq]ua[^auieo]'
                ,'dnt$'
                ,'uity$'
                ,'ie(r|st)$'
            );

            // Single syllable prefixes and suffixes
            $arrPrefixSuffix = Array(
                 '/^un/'
                ,'/^fore/'
                ,'/ly$/'
                ,'/less$/'
                ,'/ful$/'
                ,'/ers?$/'
                ,'/ings?$/'
            );

            // Remove prefixes and suffixes and count how many were taken
            $intPrefixSuffixCount = 0;
            foreach ($arrPrefixSuffix as $strPrefixSuffix) {
                $intPrefixSuffixCount += preg_match_all($strPrefixSuffix, $strWord, $matches);
            }
            $strWord = preg_replace($arrPrefixSuffix, '', $strWord);

            // Removed non-word characters from word
            $strWord = preg_replace('/[^a-z]/is', '', $strWord);
            $arrWordParts = preg_split('/[^aeiouy]+/', $strWord);
            $intWordPartCount = 0;
            foreach ($arrWordParts as $strWordPart) {
                if ($strWordPart <> '') {
                    $intWordPartCount++;
                }
            }

            // Some syllables do not follow normal rules - check for them
            // Thanks to Joe Kovar for correcting a bug in the following lines
            $intSyllableCount = $intWordPartCount + $intPrefixSuffixCount;
            foreach ($arrSubSyllables as $strSyllable) {
                $intSyllableCount -= preg_match('~' . $strSyllable . '~', $strWord);
            }
            foreach ($arrAddSyllables as $strSyllable) {
                $intSyllableCount += preg_match('~' . $strSyllable . '~', $strWord);
            }
            $intSyllableCount = ($intSyllableCount == 0) ? 1 : $intSyllableCount;
            return $intSyllableCount;
        }

    }

?>