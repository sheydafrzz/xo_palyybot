const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Start message
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "سلام! من ربات XO هستم. چند لحظه دیگه آماده‌ام 😊");
});

// Simple XO game template
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let turn = "X";

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!/^[1-9]$/.test(text)) return;

  let index = Number(text) - 1;

  if (board[index] !== " ") {
    bot.sendMessage(chatId, "اینجا پره! یک شماره دیگر انتخاب کن.");
    return;
  }

  board[index] = turn;
  turn = turn === "X" ? "O" : "X";

  let display =
    `${board[0]} | ${board[1]} | ${board[2]}\n` +
    `---------\n` +
    `${board[3]} | ${board[4]} | ${board[5]}\n` +
    `---------\n` +
    `${board[6]} | ${board[7]} | ${board[8]}`;

  bot.sendMessage(chatId, display);
});
