# 4letters

*STILL IN DEVELOPMENT* ⚙️👶

Try out the game here!
https://4letters.vercel.app 🚀

# What is this? 🤔
4letters is a word guessing game where you use logical deduction to figure out your opponent's secret word. This website is still development but basically functionality is live right now.

# How to play 😃
- Each player will choose a 4 letter SECRET WORD which does not contain repeating characters. Words such as "LION", "THIS", "LOST", "CATS".... are *ALLOWED* but words like "TENT" ('T' repeats), "RARE" ('R' repeats), "EGGS" ('G' repeats)... are *NOT ALLOWED*
- Each player will make a guess during their turn. A guess has to be a 4 letter word without repeating characters.
- After a guess is made, a number from 1-4 will be displayed as feedback. This number represents the number of matching letters between the opponent's secret word and your guess word. So for example, if the opponent's secret word is "LION" and your guess word is "LIME" then the feedback number would display '2' because the letters 'L' and 'I' are present in both the words.
- The first one to correctly guess the opponent's secret word wins the game!

Now you shouldn't just simple guess random words, you should make guesses using logical deduction. For example, if you guess "LION" and you get '0' then the letters 'L', 'I', 'O', 'N' are not present in the opponents word, so your next guess would probably be a word which doesn't contain those letters.
So your next guess might be "WAKE" which doesn't contain any of the previous letters. Now, if you receive '2' then 2 letters in your guess are also present in the opponent's secret word. 
You use this deductive method to figure out the letters and finally make the winning guess!

# FOR CONTRIBUTERS ❤️
Thank for your interest in contributing to this project ~ 😊

Please follow the instructions below to make run the project locally:

1. **Clone the Repository:** Clone this repository to your local machine.

   ```bash
   git clone https://github.com/saikoaizen/4letters.git
   ```

2. **Install Dependencies:** Navigate to the project directory and install the necessary dependencies.

  CLIENT
   ```bash
   cd 4letters
   cd client
   npm install
   ```
  After installing the node modules, Create a .env.local file in the client root directory (i.e "4letters/client/") and add the following:
  ```
  NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3001
  ```
  
  SERVER
  ```bash
  cd 4letters
  cd server
  npm install
  ```

3. **Run the Game:** Start the game server and launch the game interface.

  in Server folder
   ```bash
   npm start
   ```

  in Client folder
   ```bash
   npm start
   ```

4. **Play the Game:** Open a web browser and access the game interface at `http://localhost:3000`.

Make the desire changes, build and check for errors, and finally open a pull request when you're ready
Enjoy the game and happy coding! 🚀❤️
