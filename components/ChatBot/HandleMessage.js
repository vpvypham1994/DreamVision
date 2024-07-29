const allCommands = {
    welcome : {
        type			: 'text',
        description		: 'welcome message',
        text			: '<p>Frenify was founded in 2017. The company began working with the first customers, giving them the opportunity to purchase high-quality HTML templates.</p><p>The company’s products began to grow in terms of complexity and aesthetics. Frenify currently has a wide range of HTML templates, WordPress themes, WordPress plugins, Photoshop projects; paid and absolutely free products.</p><p>Design projects are unique and aesthetically pleasing based on customer requirements. Visit our website to get acquainted with our products. Thank you so much for being with us.</p>',
        append			: true
    },
    about : {
        type			: 'text',
        description		: 'some information about the Frenify team',
        text			: '<p>Frenify was founded in 2017. The company began working with the first customers, giving them the opportunity to purchase high-quality HTML templates.</p><p>The company’s products began to grow in terms of complexity and aesthetics. Frenify currently has a wide range of HTML templates, WordPress themes, WordPress plugins, Photoshop projects; paid and absolutely free products.</p><p>Design projects are unique and aesthetically pleasing based on customer requirements. Visit our website to get acquainted with our products. Thank you so much for being with us.</p>',
        append			: true
    },
    website: {
        type			: 'url',
        description		: 'go to our official website',
        append			: false,
        url				: 'https://frenify.com/'
    },
    free: {
        type			: 'url',
        description		: 'get PSD files of premium themes for free',
        append			: false,
        url				: 'https://frenify.com/freebies/'
    },
    doc: {
        type			: 'url',
        description		: 'visit online documentation for TechWave HTML template',
        append			: false,
        url				: 'https://frenify.com/work/envato/frenify/html/techwave/doc'
    },
    support: {
        type			: 'url',
        description		: 'if you have any questions regarding TechWave HTML template feel free and contact us by this command',
        append			: false,
        url				: 'https://themeforest.net/item/techwave-ai-html-dashboard-for-image-generation-chat-bot/46197058/support/contact'
    },
    purchase: {
        type			: 'url',
        description		: 'open the template description page on themeforest to purchase it',
        append			: false,
        url				: 'https://themeforest.net/item/techwave-ai-html-dashboard-for-image-generation-chat-bot/46197058'
    },
    youtube: {
        type			: 'url',
        description		: 'visit our youtube channel with video guides on our themes and templates',
        append			: false,
        url				: 'https://www.youtube.com/@frenifyteam/videos'
    },
    pass: {
        type			: 'password',
        description		: 'if you want to get strong password I can generate it for you, write <frenify_main>/pass 20</frenify_main> to get a 20 character password',
        append			: true,
    },
    joke: {
        type			: 'joke',
        description		: 'I can cheer you up by telling a joke',
        append			: true,
    },
    time: {
        type			: 'time',
        description		: 'display current time',
        append			: true,
    },
    clear: {
        type			: 'clear',
        description		: 'to clear current chat',
        append			: false,
    },
    commands: {
        type			: 'commands',
        description		: 'to list all available commands',
        append			: true,
    },
  };
  
  const handleMessage = (inputText) => {
    const command = inputText.trim().toLowerCase(); // Normalize the input
  
    if (allCommands.hasOwnProperty(command)) {
      const commandData = allCommands[command];
  
      if (commandData.type === 'text') {
        // Reply with the text message
        return commandData.text;
      } else if (commandData.type === 'url') {
        // Redirect to the URL
        window.location.href = commandData.url;
        return ''; // Return an empty string since the page will be redirected
      } else {
        // Append message to the chat if append is true, otherwise provide a default response
        if (commandData.append) {
          return commandData.description;
        } else {
          return "I'm sorry, I couldn't process your request.";
        }
      }
    } else {
      return "I'm sorry, I couldn't understand your command.";
    }
  };
  