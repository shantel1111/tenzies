# 🎲 Tenzies – React Game
Tenzies is a simple dice game built with React.
The goal is to roll until all dice show the same value. You can "hold" dice to keep their values between rolls and keep rolling the rest until you win.

---

## ✨ Features
- 🎲 Roll 10 dice at once
- 📌 Click dice to hold/unhold them
- ⏱️ Timer: Tracks seconds from first roll to win
- 🔢 Roll Counter: Counts the number of rolls used
- 🏆 Game-winning condition detection
- 🔄 New game / reset option
- 🎉 Confetti animation when you win 

---

## 🛠️ Technologies Used
- React (Hooks: useState, useEffect, useRef, Props)
- JavaScript (ES6+)  
- HTML5 & CSS3  
- [nanoid](https://www.npmjs.com/package/nanoid) for unique IDs  
- [react-confetti](https://www.npmjs.com/package/react-confetti)  

---

## 🕹️ How to Play
1. Click Roll to roll the dice.
2. Click a die to hold its value.
3. Keep rolling until all dice show the same number.
4. Track your progress using the timer and roll counter.
5. Try to win in as few rolls as possible.
   
---

## 📦 Installation
```bash
git clone https://github.com/shantel1111/tenzies-game.git
cd tenzies-game
npm install
npm start

