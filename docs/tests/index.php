<?php

mysql_connect('localhost', 'scratch', 'scratch');
mysql_select_db('scratch');
$q = mysql_query('SELECTFROM tests');
$done= array();
while($query = mysql_fetch_assoc($q)) {
  if(!$done[$query['name']]) {
    $file = fopen($query['name'] . '.rst', 'a');
    fwrite($file, '===============================' ."\n");
    fwrite($file, trim(str_replace('""', '"', $query['title']), '"') ."\n");
    fwrite($file, '===============================' ."\n");
    fwrite($file, '' ."\n");
    fwrite($file, 'Severity code: '. $query['severity'] ."\n");
    fwrite($file, '' ."\n");
    fwrite($file, '.. php:class:: '. $query['name'] ."\n");
    fwrite($file, "\n");
    fwrite($file, trim(str_replace('""', '"', $query['description']), '"') ."\n");
    fclose($file);
  }
  $done[$query['name']] = true;
}