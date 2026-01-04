const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const bot = new Telegraf("8479599974:AAE52ZrI8eAF5nhi3oDRoNFlIh0Qx4s963A");
const groupFile = "./database/grub.json";
const presetFile = "./database/preset.json";
const premiumFile = "./database/premium.json";
const groupStatFile = "./database/groupstats.json";
const userFile = "./database/users.json";
const autoShareFile = './database/autoshare.json';
const ownerId = [8380229600];

if (!fs.existsSync(autoShareFile)) {
  fs.writeFileSync(autoShareFile, JSON.stringify({ interval: 10 }, null, 2));
}

if (!fs.existsSync(userFile)) fs.writeFileSync(userFile, JSON.stringify([]));

if (!fs.existsSync(groupStatFile)) fs.writeFileSync(groupStatFile, JSON.stringify({}));

if (!fs.existsSync(presetFile)) fs.writeFileSync(presetFile, JSON.stringify(Array(20).fill("")));

if (!fs.existsSync(groupFile)) fs.writeFileSync(groupFile, JSON.stringify([]));

if (!fs.existsSync(premiumFile)) fs.writeFileSync(premiumFile, JSON.stringify([]));


// FUNGSI DATA GRUP
bot.on("new_chat_members", async ctx => {
  const botId = (await ctx.telegram.getMe()).id;
  const newMembers = ctx.message.new_chat_members;

  const isBotAdded = newMembers.some(member => member.id === botId);
  if (!isBotAdded) return; // ⛔ Bukan bot yang ditambahkan, abaikan

  const groupId = ctx.chat.id;
  const groupName = ctx.chat.title || "Tanpa Nama";
  const adder = ctx.message.from;
  const adderId = adder.id;
  const username = adder.username ? `@${adder.username}` : "(tanpa username)";

  // === Tambahkan ke grub.json jika belum ada
  let groups = JSON.parse(fs.readFileSync(groupFile));
  if (!groups.includes(groupId)) {
    groups.push(groupId);
    fs.writeFileSync(groupFile, JSON.stringify(groups, null, 2));
  }

  // === Hitung jumlah grup yang ditambahkan oleh user
  let stats = JSON.parse(fs.readFileSync(groupStatFile));
  stats[adderId] = (stats[adderId] || 0) + 1;
  fs.writeFileSync(groupStatFile, JSON.stringify(stats, null, 2));

  const totalUserAdded = stats[adderId];

  // === Tambahkan ke premium jika pertama kali (grup ke-2)
  let premiumUsers = JSON.parse(fs.readFileSync(premiumFile));
  if (totalUserAdded === 2 && !premiumUsers.includes(adderId)) {
    premiumUsers.push(adderId);
    fs.writeFileSync(premiumFile, JSON.stringify(premiumUsers, null, 2));
  }

  // === Kirim notifikasi setiap kali user menambahkan grup ke-2, 3, dst.
  if (totalUserAdded >= 2) {
    for (const owner of ownerId) {
      ctx.telegram.sendMessage(owner, `➕ Bot Ditambahkan ke grup baru!

👤 Oleh: ${username}
🆔 ID: \`${adderId}\`
🏷 Nama Grup: *${groupName}*
🔢 Total Grup oleh User: *${totalUserAdded}*
📦 Total Grup Bot: *${groups.length}*`, {
        parse_mode: "Markdown"
      });
    }
  }
});

const randomImages = [
"https://files.catbox.moe/5oxcqy.jpg",
"https://files.catbox.moe/spcrnj.jpg",
"https://files.catbox.moe/8lw4hz.jpg",
"https://files.catbox.moe/qq571d.jpg",
"https://files.catbox.moe/189vt5.jpg",
"https://files.catbox.moe/xg9l9p.jpg",
"https://files.catbox.moe/ewqt47.jpg",
"https://files.catbox.moe/sjii8y.jpg",
"https://files.catbox.moe/6ykzx8.jpg"
];

const getRandomImage = () => randomImages[Math.floor(Math.random() * randomImages.length)];

function getPushName(ctx) {
  return ctx.from.first_name || "Pengguna";
}

async function editMenu(ctx, caption, buttons) {
  try {
    await ctx.editMessageMedia(
      {
        type: 'photo',
        media: getRandomImage(),
        caption,
        parse_mode: 'HTML',
      },
      {
        reply_markup: buttons.reply_markup,
      }
    );
  } catch (error) {
    console.error('Error editing menu:', error);
    await ctx.reply('Maaf, terjadi kesalahan saat mengedit pesan.');
  }
}

// PERINTAH START
bot.command('start', async (ctx) => {
  const username = ctx.from.username ? `@${ctx.from.username}` : 'Tidak tersedia';
  const userId = ctx.from.id;
  const RandomBgtJir = getRandomImage();

  // === Simpan ID user ke users.json ===
  let users = JSON.parse(fs.readFileSync(userFile));
  if (!users.includes(userId)) {
    users.push(userId);
    fs.writeFileSync(userFile, JSON.stringify(users, null, 2));
  }

  await ctx.replyWithPhoto(RandomBgtJir, {
    caption: `
<blockquote>
🍂 Zhaaa ☇ Jaseb 𖣂
( 👀 ) Olaa ☇ ${username} use the bot feature wisely, the creator is not responsible for what you do with this bot, enjoy.
━━━━━━━━━━━━━━━━━━
𒑡 𝐉𝐀𝐒𝐄𝐁 Zhaaa
⬡ Author : ZhaaaOFFC!?
⬡ Version : 1.0
━━━━━━━━━━━━━━━━━━
</blockquote>
`,
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('BROADCAST', 'NortInvictuz1'),
        Markup.button.callback('SETTING', 'NortInvictuz2'),
      ],
      [
        Markup.button.url('SUPPORT', 'https://t.me//ZhaaaOFFC'),
      ]
    ])
  });
});


bot.action('NortInvictuz1', async (ctx) => {
 const username = ctx.from.username ? `@${ctx.from.username}` : 'Tidak tersedia';
 const RandomBgtJir = getRandomImage();
 const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('BACK', 'startback')],
  ]);

  const caption = `
<blockquote>
🍂 Zhaaa || Jaseb  𖣂
( 👀 ) Holaa ☇ ${username} use the bot feature wisely, the creator is not responsible for what you do with this bot, enjoy.
━━━━━━━━━━━━━━━━━━
𒑡 𝐉𝐀𝐒𝐄𝐁 Zhaaa
⬡ Author : ZhaaaOFFC!?
⬡ Version : 1.0
━━━━━━━━━━━━━━━━━━
𒑡 Zhaaa Jaseb 
▢ /share 
╰➤ BC SUPPORT FORWARD 
▢ /autoshare 
╰➤ AUTO BC SUPPORT FORWARD
▢ /pinggrub 
╰➤ TOTAL GROUP 
▢ /bcuser
╰➤ BC USER SUPPORT FORWARD 
▢ /top
╰➤ TOP PENGUNDANG BOT KE GROUP
▢ /set
╰➤ SIMPAN TXT KE FILE JSON
▢ /del
╰➤ HAPUS TXT DARI FILE JSON
▢ /list 
╰➤ LIST TXT DARI JSON
━━━━━━━━━━━━━━━━━━
</blockquote>
  `;

  await editMenu(ctx, caption, buttons);
});

bot.action('NortInvictuz2', async (ctx) => {
 const username = ctx.from.username ? `@${ctx.from.username}` : 'Tidak tersedia';
 const RandomBgtJir = getRandomImage();
 const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('BACK', 'startback')],
  ]);

  const caption = `
<blockquote>
🍂 Zhaaa ☇ 𝐉𝐚𝐬𝐞𝐛 𖣂
( 👀 ) Holaa ☇ ${username} use the bot feature wisely, the creator is not responsible for what you do with this bot, enjoy.
━━━━━━━━━━━━━━━━━━
𒑡 𝐉𝐀𝐒𝐄𝐁 Zhaaa
⬡ Author : ZhaaaOFFC!?
⬡ Version : 1.0
━━━━━━━━━━━━━━━━━━
𒑡 OWNER
⬡ /addprem
╰➤ MENAMBAH AKSES PREMIUM
⬡ /delprem
╰➤ MENGHAPUS AKSES PREMIUM
━━━━━━━━━━━━━━━━━━
</blockquote>
  `;

  await editMenu(ctx, caption, buttons);
});

// Action untuk BugMenu
bot.action('startback', async (ctx) => {
 const username = ctx.from.username ? `@${ctx.from.username}` : 'Tidak tersedia';
 const RandomBgtJir = getRandomImage();
 const buttons = Markup.inlineKeyboard([

      [
        Markup.button.callback('BROADCAST', 'NortInvictuz1'),
        Markup.button.callback('SETTING', 'NortInvictuz2'),
      ],
      [
        Markup.button.url('SUPPORT', 'https://t.me//ZhaaaOFFC'),
      ]
]);

  const caption = `
<blockquote>
🍂 Zhaaa ☇ 𝐉𝐚𝐬𝐞𝐛 𖣂
( 👀 ) Holaa ☇ ${username} use the bot feature wisely, the creator is not responsible for what you do with this bot, enjoy.
━━━━━━━━━━━━━━━━━━
𒑡 𝐉𝐀𝐒𝐄𝐁 Zhaaa
⬡ Author : ZhaaaOFFC!?
⬡ Version : 1.0
━━━━━━━━━━━━━━━━━━
</blockquote>
`;
  await editMenu(ctx, caption, buttons);
});

// PERINTAH SHARE
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
bot.command("share", async ctx => {
  const senderId = ctx.from.id;
  const replyMsg = ctx.message.reply_to_message;

  const premiumUsers = JSON.parse(fs.readFileSync(premiumFile));
  if (!premiumUsers.includes(senderId)) {
    return ctx.reply("❌ Kamu belum menambahkan bot ini ke 2 grup telegram.\n\nJika ingin menggunakan fitur ini, kamu harus menambahkan bot ke dalam minimal 2 grup.", {
      parse_mode: "Markdown"
    });
  }

  if (!replyMsg) {
    return ctx.reply("🪧 ☇ Reply pesan yang ingin dibagikan / dipromosikan");
  }

  const groups = JSON.parse(fs.readFileSync(groupFile));
  let sukses = 0;
  let gagal = 0;

  // Notifikasi awal
  await ctx.reply(`⏳ Mengirim ke total ${groups.length} grup/channel...`, { parse_mode: "Markdown" });

  for (const groupId of groups) {
    try {
      await ctx.telegram.forwardMessage(groupId, ctx.chat.id, replyMsg.message_id);
      sukses++;
    } catch (err) {
      gagal++;
    }

    await new Promise(resolve => setTimeout(resolve, 1500)); // jeda 1.5 detik per kirim
  }

  // Laporan akhir
  await ctx.reply(
    `✅ *Selesai:*\nSukses: *${sukses}*\nGagal: *${gagal}*`,
    { parse_mode: "Markdown" }
  );
});


// PERINTAH AUTOSHARE
let autoShareInterval = null;

bot.command("autoshare", async ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) {
    return ctx.reply("❌ Fitur ini hanya untuk owner.");
  }

  const replyMsg = ctx.message.reply_to_message;
  if (!replyMsg) {
    return ctx.reply("🪧 ☇ Reply pesan yang ingin dibagikan / dipromosikan");
  }

  const intervalConfig = JSON.parse(fs.readFileSync(autoShareFile));
  const jedaMenit = intervalConfig.interval || 10;

  if (autoShareInterval) clearInterval(autoShareInterval);

  ctx.reply(`✅ ☇ Autoshare dimulai. Pesan akan dikirim otomatis setiap ${jedaMenit} menit`);

  const groups = JSON.parse(fs.readFileSync(groupFile));

  autoShareInterval = setInterval(async () => {
    let sukses = 0;
    let gagal = 0;

    for (const groupId of groups) {
      try {
        await ctx.telegram.forwardMessage(groupId, ctx.chat.id, replyMsg.message_id);
        sukses++;
      } catch (e) {
        gagal++;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`[AutoShare] Sukses: ${sukses} | Gagal: ${gagal}`);
  }, jedaMenit * 60 * 1000);
});

bot.command("setjeda", async ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) {
    return ctx.reply("❌ Hanya owner yang bisa mengatur jeda autoshare.");
  }

  const args = ctx.message.text.split(" ");
  const menit = parseInt(args[1]);

  if (isNaN(menit) || menit < 1) {
    return ctx.reply("❌ Format salah. Gunakan: /setjeda <menit>, contoh: /setjeda 15");
  }

  const config = { interval: menit };
  fs.writeFileSync(autoShareFile, JSON.stringify(config, null, 2));

  ctx.reply(`✅ Jeda autoshare diubah menjadi setiap ${menit} menit`);
});


// PERINTAH PINGGRUB
bot.command("pinggrub", async ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ ☇ Akses perintah hanya untuk owner");

  let groups = JSON.parse(fs.readFileSync(groupFile));
  let updatedGroups = [];
  let total = groups.length;
  let aktif = 0;
  let gagal = 0;
  let logText = `📡 ☇ Cek status grub, Total ${total} grub`;

  for (const groupId of groups) {
    try {
      await ctx.telegram.sendChatAction(groupId, "typing");
      updatedGroups.push(groupId);
      logText += `✅ ☇ ${groupId} Grub aktif`;
      aktif++;
    } catch (err) {
      logText += `❌ ☇ ${groupId} Grub tidak aktif`;
      gagal++;
    }
    await delay(1000);
  }

  fs.writeFileSync(groupFile, JSON.stringify(updatedGroups, null, 2));

  logText = `
☇ Total Grub: ${total}
☇ Grub Aktif: ${aktif}
☇ Grub Dihapus: ${gagal}

`
  ctx.reply(logText, { parse_mode: "Markdown" });
});

// === FITUR BROADCAST USER ===
bot.command("bcuser", async ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) {
    return ctx.reply("❌ Akses hanya untuk owner.");
  }

  const replyMsg = ctx.message.reply_to_message;
  if (!replyMsg) {
    return ctx.reply("❌ Balas pesan yang mau di-broadcast ke semua user.");
  }

  const userList = JSON.parse(fs.readFileSync(userFile));
  let sukses = 0;
  let gagal = 0;

  for (const userId of userList) {
    try {
      await ctx.telegram.forwardMessage(userId, ctx.chat.id, replyMsg.message_id);
      sukses++;
    } catch (err) {
      gagal++;
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Jeda 1 detik antar user
  }

  ctx.reply(`✅ Broadcast selesai!\nSukses: ${sukses}\nGagal: ${gagal}`);
});



// === /set <1-20> ===
bot.command("set", ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ Hanya owner yang bisa set.");

  const args = ctx.message.text.split(" ");
  const index = parseInt(args[1]);
  const text = args.slice(2).join(" ");

  if (isNaN(index) || index < 1 || index > 20) return ctx.reply("❌ Nomor harus 1-20.\nContoh: /set 1 Pesan rahasia");
  if (!text) return ctx.reply("❌ Teks tidak boleh kosong.");

  let presets = JSON.parse(fs.readFileSync(presetFile));
  presets[index - 1] = text;
  fs.writeFileSync(presetFile, JSON.stringify(presets, null, 2));

  ctx.reply(`✅ Pesan slot ${index} disimpan:\n${text}`);
});

// === /del <1-20> ===
bot.command("del", ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ Hanya owner yang bisa hapus.");

  const args = ctx.message.text.split(" ");
  const index = parseInt(args[1]);

  if (isNaN(index) || index < 1 || index > 20) return ctx.reply("❌ Nomor harus 1-20.\nContoh: /del 1");

  let presets = JSON.parse(fs.readFileSync(presetFile));
  presets[index - 1] = "";
  fs.writeFileSync(presetFile, JSON.stringify(presets, null, 2));

  ctx.reply(`✅ Pesan slot ${index} dihapus.`);
});

// === /list ===
bot.command("list", ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ Hanya owner yang bisa melihat daftar.");

  let presets = JSON.parse(fs.readFileSync(presetFile));
  let teks = "📑 *Daftar Pesan Tersimpan:*\n\n";
  presets.forEach((p, i) => {
    if (p) teks += `${i + 1}. ${p}\n`;
  });

  if (teks === "📑 *Daftar Pesan Tersimpan:*\n\n") teks = "❌ Belum ada pesan yang disimpan.";
  ctx.reply(teks, { parse_mode: "Markdown" });
});

bot.command("top", async ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ Akses hanya untuk owner.");

  let stats = JSON.parse(fs.readFileSync(groupStatFile));
  if (Object.keys(stats).length === 0) return ctx.reply("❌ Belum ada data statistik.");

  // Ubah ke array dan sort
  let sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  let teks = "📊 *Statistik User yang Menambahkan Bot ke Grup:*\n\n";
  for (let [userId, count] of sorted) {
    teks += `👤 ID: \`${userId}\` ➜ ${count} grup\n`;
  }

  ctx.reply(teks, { parse_mode: "Markdown" });
});

// PERINTAH ADDPREM
bot.command("addprem", ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ kamu belum menambah kan bot ini ke 2 group telegram, jika ingin menggunakan fitur ini kamu harus add group ini ke dalam 2 group di telegram");

  const args = ctx.message.text.split(" ");
  const targetId = parseInt(args[1]);
  if (!targetId) return ctx.reply("❌ Masukan id user yang ingin di tambahkan");

  let data = JSON.parse(fs.readFileSync(premiumFile));
  if (data.includes(targetId)) return ctx.reply("✅ Sudah premium.");

  data.push(targetId);
  fs.writeFileSync(premiumFile, JSON.stringify(data));
  ctx.reply(`✅ ☇ Berhasil menambahkan ${targetId} ke daftar premium.`);
});


// PERINTAH DELPREM
bot.command("delprem", ctx => {
  const senderId = ctx.from.id;
  if (!ownerId.includes(senderId)) return ctx.reply("❌ kamu belum menambah kan bot ini ke 2 group telegram, jika ingin menggunakan fitur ini kamu harus add group ini ke dalam 2 group di telegram");

  const args = ctx.message.text.split(" ");
  const targetId = parseInt(args[1]);
  if (!targetId) return ctx.reply("❌ Masukan id user yang ingin di dihapus");

  let data = JSON.parse(fs.readFileSync(premiumFile));
  if (!data.includes(targetId)) return ctx.reply("❌ ID tersebut tidak ada di daftar premium.");

  data = data.filter(id => id !== targetId);
  fs.writeFileSync(premiumFile, JSON.stringify(data));
  ctx.reply(`✅ Berhasil menghapus ${targetId} dari daftar premium.`);
});


// LAUNCH
bot.launch();