<?php
$files = fopen("chat.txt", "r");

while (($line = fgets($files)) !== false) {
    if (!empty($line)) echo $line;
}
