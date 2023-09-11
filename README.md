# 4letters

***STILL IN DEVELOPMENT*** ⚙️👶

Try out the game here!
https://4letters.vercel.app 🚀

# What is this? 🤔
4letters is a word guessing game where you use logical deduction to figure out your opponent's secret word. This website is still development but basically functionality is live right now.

# How to play 😃

**Objective:** The goal of this game is to guess your opponent's 4-letter secret word without repeating characters.

**Setup:**
Each player selects a 4-letter secret word without any repeating characters (e.g., "LION," "THIS," "LOST," "CATS" are allowed, but words like "TENT" with a repeated letter are not allowed).

**Gameplay:**
1. Players take turns making guesses.
2. A guess must be a 4-letter word without repeating characters.
3. After making a guess, you will receive a feedback number from 1 to 4.
4. The feedback number indicates the number of matching letters between your guess and your opponent's secret word. For example, if the opponent's secret word is "LION," and your guess is "LIME," you would receive a feedback of '2' because the letters 'L' and 'I' are present in both words.
5. Use deductive reasoning to make informed guesses. For instance, if you guess "LION" and receive '0' as feedback, it means none of the letters 'L,' 'I,' 'O,' or 'N' are in your opponent's word. Your next guess should avoid these letters. A logical guess might be "WAKE," which doesn't contain any of the previously mentioned letters.
6. Continue making educated guesses based on the feedback until you correctly guess your opponent's secret word.

**Winning:** The first player to correctly guess the opponent's secret word wins the game!

Remember to use logical deduction and process of elimination to increase your chances of winning. Good luck and have fun playing! 🙌😄

## FOR CONTRIBUTERS ❤️

Please follow the instructions below to make run the project locally:

1. **Clone the Repository:** Clone this repository to your local machine.

   ```bash
   git clone https://github.com/saikoaizen/4letters.git
   ```

2. **Install Dependencies:** Navigate to the project directory and install the necessary dependencies.

- CLIENT
   ```bash
   cd 4letters
   cd client
   npm install
   ```
- After installing the node modules, Create a .env.local file in the client root directory (i.e "4letters/client/") and add the following:
  
  ```
  NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3001
  ```
  
- SERVER
  ```bash
  cd 4letters
  cd server
  npm install
  ```

3. **Run the Game:** Start the game server and launch the game interface.

 - in 4letters/server
   ```bash
   npm start
   ```

 - in 4letters/client
   ```bash
   npm start
   ```

4. **Play the Game:** Open a web browser and access the game interface at `http://localhost:3000`.

Make the desire changes, build and check for errors, and finally open a pull request when you're ready
Enjoy the game and happy coding! 🚀❤️
