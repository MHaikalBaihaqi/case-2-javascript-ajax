<?php

// Ambil pesan dari POST request
$message = $_POST['message'];
$name = $_POST['name'];


// Buat timestamp
$timestamp = date('Y-m-d H:i:s');
$messageWithTimestamp = $timestamp . '@@@' . $name . '@@@' . $message . "\n"; // Tambahkan timestamp ke pesan

$file = 'chat.txt';

// Tulis pesan ke file
if (file_put_contents($file, $messageWithTimestamp, FILE_APPEND)) {
    echo "Pesan berhasil disimpan";
}
