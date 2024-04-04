// Ambil elemen-elemen yang diperlukan dari halaman
let chatInput = document.querySelector("#chatInput");
let sendButton = document.querySelector("#chat");
let roomChat = document.querySelector("#roomchat");
let iconchat = document.querySelector("#iconchat");
let nameElement = document.querySelector("#name").innerHTML;
let roomchat1 = document.querySelector("#roomchat1"); // Tambahkan ini

tampilkanChat();

// Tambahkan event listener untuk tombol pengiriman chat
sendButton.addEventListener("click", (e) => {
  e.preventDefault(); // Mencegah form dari pengiriman default

  // Ambil teks pesan dari input
  let message = chatInput.value;

  // Kirim pesan ke server menggunakan fetch
  fetch("chat-write.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `message=${encodeURIComponent(message)}&name=${encodeURIComponent(nameElement)}`,
  })
    .then((response) => {
      console.log(response);
      tampilkanChat();
      return response.text();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  chatInput.value = "";
});

function tampilkanChat() {
  fetch("chat-read.php")
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((data) => {
      let allChat = data.split("\n");

      roomChat.innerHTML = "";
      allChat.forEach((line) => {
        if (line != "") {
          let part = line.split("@@@");
          // Ambil nilai name dan message dari array
          let receivedName = part[1];
          let receivedMessage = part[2];

          // Lakukan operasi atau tindakan lain dengan name dan message
          console.log("Nama pengirim:", receivedName);
          console.log("Pesan:", receivedMessage);

          // Buat elemen baris untuk chat
          let rowElement = document.createElement("div");
          rowElement.classList.add("row");
          rowElement.style.height = "min-content";

          // Periksa apakah nama pengguna sama dengan nama pengirim pesan
          if (nameElement === receivedName) {
            rowElement.classList.add("justify-content-end");
          } else {
            rowElement.classList.add("justify-content-start");
          }

          // Buat elemen kolom untuk chat
          let colElement = document.createElement("div");
          colElement.classList.add("col-6");

          // Periksa apakah nama pengguna sama dengan nama pengirim pesan
          if (nameElement === receivedName) {
            // Buat bubble chat untuk pengguna sendiri
            colElement.innerHTML = `
            <div class="chatSelf p-2 px-3">
                <div class="message-content">${receivedMessage}</div>
                <div class="text-end timeSent" style="font-size: 12px;">${getCurrentTime()}</div>
            </div>
        `;
          } else {
            // Buat bubble chat untuk pengguna lain
            colElement.innerHTML = `
            <div class="chatOther p-2 px-3">
                <div class="message-content">${receivedMessage}</div>
                <div class="text-end timeSent" style="font-size: 12px;">${getCurrentTime()}</div>
            </div>
        `;
          }

          // Masukkan kolom chat ke dalam elemen baris chat
          rowElement.appendChild(colElement);

          // Masukkan bubble chat ke dalam roomchat
          document.getElementById("roomchat").appendChild(rowElement);
        }
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  // setTimeout(tampilkanChat, 1000);
}

// Fungsi untuk mendapatkan waktu saat ini dalam format HH:MM AM/PM
function getCurrentTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

// Sembunyikan roomChat saat halaman pertama kali dimuat
roomchat1.style.display = "none";

// Tambahkan event listener untuk tombol ikon
iconchat.addEventListener("click", () => {
  if (roomchat1.style.display === "none") {
    roomchat1.style.display = "block";
  } else {
    roomchat1.style.display = "none";
  }
});
