const fs = require('fs');
const loadReminders = () => {
  try {
    const data = fs.readFileSync('./reminders.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading reminders file:', err);
    return [];
  }
};

// Save reminders back to the file
const saveReminders = (reminders) => {
  try {
    fs.writeFileSync('./reminders.json', JSON.stringify(reminders, null, 2));
  } catch (err) {
    console.error('Error saving reminders file:', err);
  }
};

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {import("../../Structures/bot")} client
   */
  async execute(client) {
    /*
      different types for statuses can be a number and they as follows:
      Playing: 0
      Streaming: 1
      Listening: 2
      Watching: 3
      Competing: 5
          
      Want a changing status? Just change line 56 to `status: obj[key].status` and insert your own status into each object below.
      Different statuses include "online", "idle", "dnd", and "invisible"
    */
      const checkReminders = () => {
        const currentTime = Date.now();
        const reminders = loadReminders(); // Load the current reminders from the file
    
        reminders.forEach((reminder, index) => {
          if (reminder.time <= currentTime) {
            // Fetch the user and channel
            const user = client.users.cache.get(reminder.userId);
            const channel = client.channels.cache.get(reminder.channelId);
    
            // Send the reminder message
            if (user && channel) {
              channel.send(`✨ wake up ${user}, you told me to remind you, right?\nhere's ur msg: ${reminder.message}`);
            }
    
            // Remove the reminder after sending it
            reminders.splice(index, 1);
          }
        });
    
        // Save updated reminders back to the file
        saveReminders(reminders);
      };
    
      // Check every minute (60000ms)
      setInterval(checkReminders, 20000);
    let acts = [
      {
        name: "your messages 🙉",
        type: 3,
        status: "online",
      },
      {
        name: `"Waiting for you to talk to me" 🤗`,
        type: 2,
        status: "online",
      },
      {
        name: `your weird ideas to the CIA 😳`,
        type: 1,
        status: "online",
      },
      {
        name: `Your ideas become imagery 💫`,
        type: 3,
        status: "online",
      },
      // {
      //   name:"",
      //   type: Number,
      //   status: ""
      // }
    ];
    setInterval(async () => {
      const currentAct = acts.shift();
      client.user.setPresence({
        activities: [
          {
            name: currentAct.name.toString(),
            type: currentAct.type,
          },
        ],
        status: currentAct.status,
        /**
         * Don't want a changing status? Just change the line above to `status: "status"`. Different statuses include "online", "idle", "dnd", and "invisible"
         */
      });
      acts.push(currentAct);
    }, 15000);

  

      
  },
};
