# PHASE_1.md: Survive the AI Discord Bot - Core Functionality

## 1. Project Overview
The **"Survive the AI" Discord bot** hosts an interactive survival game where players respond to AI-generated scenarios. The AI judges player responses, determining whether they survive.

## 2. Technical Breakdown

### 2.1 Bot Initialization and Configuration
- **Setup Discord Bot:**
  - Create a new Discord application and bot token via Discord Developer Portal.
  - Set required permissions:
    - Manage Messages
    - Send Messages
    - Add Reactions
    - Use Slash Commands
  - Invite the bot to the server with proper permissions.

- **Environment Configuration:**
  - Set up a `.env` file to store:
    - `DISCORD_BOT_TOKEN`
    - `OPENAI_API_KEY`
    - `CHANNEL_ID` (#survive-ai-game)
  - Configure bot prefixes and default responses.

### 2.2 Command Structure

#### 2.2.1 Session Initialization Commands
- **/start-session**
  - Triggers the bot to post a message announcing a new game session.
  - Message includes:
    - Instructions on how to join.
    - Specific emoji to react with.
  - Bot tracks players who react with the designated emoji.
  - Stores the player list in memory.

- **/start-game**
  - Command to begin the game once players have joined.
  - Verifies at least one player has joined.
  - Bot sends a message indicating the game is starting.
  - Generates the initial survival scenario using OpenAI API.
  - Posts the scenario message to the game channel.

### 2.3 Game Flow Management

#### 2.3.1 Player Response Collection
- After the scenario message, the bot listens for player responses:
  - Tracks responses by username to avoid duplicate entries.
  - Waits for responses until all players have replied or a timeout is reached.
  - Stores responses in a dictionary:
    - **Key:** Username
    - **Value:** Player response

- **Timeout Handling:**
  - Set a default response timeout (e.g., 5 minutes).
  - If a player does not respond within the time, mark as "No response."

### 2.4 OpenAI API Integration

#### 2.4.1 API Setup
- Configure OpenAI API client in the bot.
- Create a prompt template for survival scenarios:
  - Include scenario context.
  - Append player responses.

#### 2.4.2 API Call Structure
- **Input:** Compiled responses.
- **Model:** gpt-4
- **Parameters:**
  - `Max Tokens`: 512
  - `Temperature`: 0.8
- **Parse the API response:**
  - Identify survival outcomes for each player.
  - Format responses for Discord output.

### 2.5 Rendering AI Responses
- Bot sends the formatted result message:
  - Includes each player’s name, their response, and the AI’s judgment.
  - If the AI response is too long, split into multiple messages.
  - Use embeds for better formatting:
    - **Title:** Scenario Outcome
    - **Description:** Player responses and judgments

## 3. Error Handling and Edge Cases
- **Bot Crashes:**
  - Restart the bot and attempt to resume the current game state.
- **API Errors:**
  - Log the error.
  - Send an informative message to the game channel.
- **User Disconnects:**
  - Allow rejoining if the session is still active.
- **Response Timeout:**
  - Automatically mark as "Did not respond" and proceed.

## 4. Testing and Deployment

### 4.1 Local Testing
- Test each command individually:
  - `/start-session` - Check player registration.
  - `/start-game` - Check scenario generation and response handling.

### 4.2 Deployment
- Deploy to a cloud environment (Heroku/Docker).
- Set up a continuous integration pipeline for updates.

## 5. Code Structure

### Directory Layout
```bash
survive-ai-bot/
├── src/
│   ├── commands/              # Command handlers
│   ├── game_logic/            # Core game flow
│   ├── api/                   # OpenAI API integration
│   ├── utils/                 # Helper functions
├── config/                    # Bot configuration files
├── logs/                      # Log files for debugging
├── .env                       # Environment variables
├── README.md
└── requirements.txt
