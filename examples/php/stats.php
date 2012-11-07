<?php

$file = fopen('data/stats.json', 'w');

//Do as I say, not as I do. This is a terrible way to do this, 
//but this is just an example:
fwrite($file, json_encode($_POST));
fclose($file);