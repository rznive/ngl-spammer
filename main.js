const fs = require('fs');
const request = require('request');
const readline = require('readline');

var listUUID;
try {
    listUUID = fs.readFileSync('list_uuid_4.txt', 'utf8').trim().split('\n');
} catch (error) {
    console.error('❌ Error reading list_uuid_4 file:', error.message);
    process.exit(1);
}

if (listUUID.length === 0) {
    console.error('❌ Error: No UUIDs found in list_uuid_4 file.');
    process.exit(1);
}

var userAgentOptions = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    // Add more User-Agent options as needed
];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Welcome to NGL Spammer Tools 🚀');
console.log('Choose an option:');
console.log('1 - Message with JKT48 Jiko');
console.log('2 - Input message');
console.log('3 - Template Menyala Abangkuh');

rl.question('👉 Enter the option number: ', function (option) {
    if (option === '1') {
        sendJikoMessage();
    } else if (option === '2') {
        rl.question('👤 Input username: ', function (username) {
            rl.question('💬 Input message: ', function (userQuestion) {
                rl.question('🔢 Input how many you want to send? ', function (jumlahPesan) {
                    jumlahPesan = parseInt(jumlahPesan);

                    for (var i = 0; i < jumlahPesan; i++) {
                        setTimeout(sendMessage, i * 3000, username, userQuestion, getRandomUserAgent());
                    }
                });
            });
        });
    } else if (option === '3') {
        sendAbangkuhMessage();
    }
});

function sendJikoMessage() {
    rl.question('👤 Input username: ', function (username) {
        rl.question('🔢 Input how many you want to send? ', function (jumlahPesan) {
            jumlahPesan = parseInt(jumlahPesan);

            var successCount = 0;

            function sendSuccessMessage() {
                successCount++;
                if (successCount === jumlahPesan) {
                    console.log('-> All messages sent successfully!');
                    askToUseAgain();
                }
            }

            for (var i = 0; i < jumlahPesan; i++) {
                var jikoQuote = list_jiko[Math.floor(Math.random() * list_jiko.length)];
                setTimeout(sendMessage, i * 3000, username, jikoQuote, getRandomUserAgent(), sendSuccessMessage);
            }
        });
    });
}

function sendMessage(username, userQuestion, userAgent, callback) {
    var randomUUID = listUUID[Math.floor(Math.random() * listUUID.length)].trim();

    var options = {
        method: 'POST',
        url: 'https://ngl.link/api/submit',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': userAgent
        },
        form: {
            username: username,
            question: userQuestion,
            deviceId: randomUUID,
            gameSlug: '',
            referrer: ''
        }
    };

    request(options, function (error, response) {
        if (error) {
            console.error('❌ Error making request:', error.message);
        } else {
            console.log(`-> Successfully sent message '${options.form.question}' with deviceId '${options.form.deviceId}' to ${options.form.username}`);
            if (callback && typeof callback === 'function') {
                callback(); // Invoke the callback to track successful messages
            }
        }
    });
}

function sendAbangkuhMessage() {
    rl.question('👤 Input username: ', function (username) {
        rl.question('🔢 Input how many you want to send? ', function (jumlahPesan) {
            jumlahPesan = parseInt(jumlahPesan);

            var successCount = 0;

            function sendSuccessMessage() {
                successCount++;
                if (successCount === jumlahPesan) {
                    console.log('-> All messages sent successfully!');
                    askToUseAgain();
                }
            }

            for (var i = 0; i < jumlahPesan; i++) {
                var abangkuhQuote = listAbangkuh[Math.floor(Math.random() * listAbangkuh.length)];
                setTimeout(sendMessage, i * 3000, username, abangkuhQuote, getRandomUserAgent(), sendSuccessMessage);
            }
        });
    });
}

function askToUseAgain() {
    rl.question('🔄 Do you want to use this tool again? (yes/no): ', function (answer) {
        if (answer.toLowerCase() === 'yes') {
            // Restart the tool if the user wants to use it again
            console.clear(); // Clears the console
            console.log('🚀 Welcome to the Message Sending Tool 🚀');
            console.log('Choose an option:');
            console.log('1 - Message with JKT48 Jiko');
            console.log('2 - Input message');
            console.log('3 - Template Menyala Abangkuh');
            rl.question('👉 Enter the option number: ', function (option) {
                if (option === '1') {
                    sendJikoMessage();
                } else if (option === '2') {
                    rl.question('👤 Input username: ', function (username) {
                        rl.question('💬 Input message: ', function (userQuestion) {
                            rl.question('🔢 Input how many you want to send? ', function (jumlahPesan) {
                                jumlahPesan = parseInt(jumlahPesan);

                                for (var i = 0; i < jumlahPesan; i++) {
                                    setTimeout(sendMessage, i * 3000, username, userQuestion, getRandomUserAgent());
                                }
                            });
                        });
                    });
                } else if (option === '3') {
                 sendAbangkuhMessage();
                }
            });
        } else {
            console.log('-> Exiting.');
            process.exit(0);
        }
    });
}

function getRandomUserAgent() {
    return userAgentOptions[Math.floor(Math.random() * userAgentOptions.length)];
}

const listAbangkuh = [
    "kijang 1, ganti 🦌",
    "kasih paham queen 🤭🔥 MENYALA",
    "jangan kasih kendor ee 🕺🏻🕺🏻",
    "kasih tebal king 🤙🤙",
    "izin abangkuu 🔥",
    "jagoan mama muncul 🔥🔥🔥",
    "kasih paham queen, ilmu baddie 🔥🔥💅💅",
    "giling terus boss 💪",
    "capt idolaa 🔥🙌🏼🔝",
    "manyala panutan abangda 🔥🔥",
    "kasih apa? kasih paham abangkuhh👊👊👊🔥🔥🔥🔥",
    "weees kelas abangku 🔥🔥",
    "top abangku 👍🏼👍🏼",
    "kasi paham wakk 🔥🔥🔥",
    "tetep ilmu padi 🌾🌾",
    "isinya daging semua abangkuu🔥🔥🔛🔝",
    "🔛🔝 selalu idola 🔥",
    "eitsss pondasi bangsa abangkuuhh 🔥🔝🙌🏼",
    "mahkota sedang transit di dc cakung kingg 🔥👑🙇‍♂️",
    "abang idola panutan ini 😘😘",
    "manyala ilmu padi 🌾🔥",
    "kasih jedag jedug dulu abangkuh🤩🥵",
    "ini mahkotamu king 👑",
    "top selalu idola 🔥",
    "kalau diatas jgn lupa merunduk 🌾🙌🏼🙇‍♂️",
    "mantap kali bahh 🔥🔥",
    "sesekali 🙌🏼",
    "top 🔝",
    "beraksi🍻🍻",
    "menyala abangkuhh 🔥🔥🔥",
    "kelas boskuuuh 🔥👍🏼",
    "makasih sharingnya abangkuhh, tetaplah ilmu padi 🌾🙇‍♂️🌾🔝🔝🔝",
    "tetap ilmu oriza sativa 🌾",
    "kasih paham tipis tipis 🤝🏼",
    "starboy vibez🥵😎🥀💥🐙",
    "eihhh mantaapp pedii kaliii 🔥🔥🔥",
    "wanita mana yang berani menyakitimu king 💯💯💪❤‍🔥",
    "kelas abangkuu 🔥🔝",
    "sehat selalu kaka panutan 💪💪🫡",
    "gas kanda 🔥🔥",
    "percaya proses capt 🔥🔥",
    "idola 🙌🏼🙌🏼",
    "eh yg punya setengah indo nih ee 😜😜",
    "kasih paham capt 🔥💯🙌🏼",
    "percaya proses king 💯💯💪❤‍🔥",
    "tetap membumi abangkuh 🔥🙌🏼🌎",
    "kasih keras abangkuhh 🔥👊🏼",
    "manyala capt 🔥🔥",
    "terstill💪💪",
    "bertahap abangkuuuu🔥🤙🪜👟",
    "gokil capt kaki tiga🦵🔥🔥",
    "kasih keras idola 🔥🔥",
    "jangan kasi longgar king 🔝💯🔥🙌🏼",
    "tipis tipis 🔥🔛🔝",
    "nikmati proses kakandaaa🤙🔥🙇‍♂️",
    "trcium aroma ilmu padi abangkuh🔥🔥🌾🌾",
    "sungkem dulu abangkuuu🙇‍♂️🙇‍♂️",
    "biarkan abangku memasakkk🔥🔥🧑‍🍳🧑‍🍳",
    "kasih tahu abangkuuu🔥🔥🙇‍♂️🙇‍♂️",
    "meroket abangku 🚀🚀🚀",
    "ilmu padi abangkuhh🌾🌾👊🏻💥🔥",
    "kelas banget kanda 🙏🏼🕺🏻",
    "rispeekk 👍🏼🙌🏼",
    "jangan kasih kendor king 🔥🔥🔥",
    "panutan 🔝✊🏼🙌🏼",
    "bercahaya abangkuhh 🔥💡💡",
    "masih memantau 🔭🔭🔭",
    "mahkotamu masih dilas, king 👑",
    "terbaik kandaku 🙌🏼",
    "tipis tipis asal menyala king 👑🔥",
    "kelas abangda 🔥🫡",
    "apotik tutup captain 🔥🔥💯🔝",
    "lanjutkan abangkuuhh 🔥🔝💥"
];

const list_jiko = [
    "Papipapipu aku akan mengejutkanmu dengan kehebatan ku",
    "Nyemangatin dan ngangenin..siapa yang kamu pikirkan..Delynn",
    "Bagi hamster yang lincah, aku akan berlari-lari di pikiranmu..Halo Haa katakan Kimmy!",
    "Seperti bunga yang mekar, aku akan membuat kamu..kamu..dan kamu terbayang-bayang..Aku Ara..Aralie!",
    "Moshi..Mosh! Welcome Nyala Land! Halo semuanya, bakyu-n nama aku Nayla!",
    "Mirror..Mirror on the wall..who the sweetest in here..It's me Ribka!",
    "Hadir dengan seribu kejutan..Checkmate! Siap memenangkan hatimu!",
    "Are you ready? Jalani hari ini dengan menari bersama ku! Yuhu..Aku Levi!",
    "Semangatku full terus! Guess..guess..Oline!",
    "Abracadabra..si pesulap yang siap membuat..hatimu terpikat!",
    "Bagi kalium yang bereaksi dengan air, aku akan meledak dengan semangat ku! Boom! Aku Regie!",
    "Si Panda Unyu yang selalu ceria! Hai aku Nachia..bikin kamu bahagia!",
    "Sweet as bubble gum, graceful as a princess. Siapakah itu? One and only, Moreen!",
    "Dengan kekuatan bulan aku akan menyihirmu dengan pesonaku!",
    "Roar! Si Singa pemberani yang siap menyemangati harimu!",
    "Horas wei! Gadis ceria yang akan membawamu ke dunia keajaiban penuh warna. Halo, panggil aku Shasa!",
    "Pelukis yang hadir di mimpi-mimpi indahmu. One, two, Tri... sha!"
  ];
