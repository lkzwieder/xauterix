let $x;
(function(d, w) {
    const Xautix = function(d, w) {
        let chatContainer, messageArea, inputField, chatIcon, closeButton;
        let messages = JSON.parse(localStorage.getItem('xautixMessages')) || [];

        const styles = `
            #chat-icon {
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 50px;
                height: 50px;
                background-color: #4CAF50;
                border-radius: 50%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 24px;
                cursor: pointer;
                z-index: 9999;
                transition: transform 0.3s;
                user-select: none;
                font-family: Arial, sans-serif;
            }
            #chat-icon:hover {
                transform: scale(1.1);
            }
            #chat-container {
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 300px;
                max-height: 400px;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                display: none;
                flex-direction: column;
                font-family: Arial, sans-serif;
                z-index: 9999;
            }
            .buttons-area {
                display: flex;
                justify-content: flex-end;
                padding: 5px;
                border-bottom: 1px solid #ccc;
                background-color: #f5f5f5;
            }
            .powered-by-text {
                font-size: 12px;
                color: #888; /* Gris que contrasta con el fondo */
                margin-top: 5px;
                text-align: center;
                width: 100%;
            }
            .close-button, .maximize-button {
                cursor: pointer;
                font-size: 20px;
                color: #999;
                margin-left: 10px;
                transition: color 0.3s;
            }
            .close-button:hover, .maximize-button:hover {
                color: #333;
            }
            #message-area {
                flex: 1;
                padding: 10px;
                overflow-y: auto;
                font-size: 14px;
            }
            .message-bubble {
                background-color: #e0e0e0;
                padding: 8px 12px;
                border-radius: 8px;
                margin-bottom: 10px;
                max-width: 80%;
                word-wrap: break-word;
                align-self: flex-start;
            }
            .input-container {
                display: flex;
                border-top: 1px solid #ccc;
            }
            .input-field {
                flex: 1;
                border: none;
                padding: 10px;
                font-size: 14px;
                outline: none;
            }
            .send-button {
                border: none;
                background-color: #4CAF50;
                color: white;
                padding: 10px 15px;
                cursor: pointer;
                outline: none;
                font-size: 14px;
            }
        `;

        const _insertStyles = function() {
            const styleSheet = d.createElement('style');
            styleSheet.innerText = styles;
            d.head.appendChild(styleSheet);
        };

        const _createChatIcon = function() {
            chatIcon = d.createElement('div');
            chatIcon.id = 'chat-icon';
            chatIcon.innerHTML = '💬';

            chatIcon.addEventListener('click', function() {
                chatContainer.style.display = 'flex';
                chatIcon.style.display = 'none';
            });

            d.body.appendChild(chatIcon);
        };

        const _createChatContainer = function() {
            chatContainer = d.createElement('div');
            chatContainer.id = 'chat-container';
        };

        const _createButtonsArea = function() {
            const buttonsArea = d.createElement('div');
            buttonsArea.className = 'buttons-area';

            closeButton = d.createElement('div');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '&times;';

            closeButton.addEventListener('click', function() {
                chatContainer.style.display = 'none';
                chatIcon.style.display = 'flex';
            });

            const maximizeButton = d.createElement('div');
            maximizeButton.className = 'maximize-button';
            maximizeButton.innerHTML = '&#9723;';

            maximizeButton.addEventListener('click', function() {
                if (chatContainer.style.width === '100%') {
                    chatContainer.style.width = '300px';
                    chatContainer.style.height = '400px';
                    messageArea.style.maxHeight = '320px';
                } else {
                    chatContainer.style.width = '100%';
                    chatContainer.style.height = '100%';
                    chatContainer.style.right = '0';
                    chatContainer.style.bottom = '0';
                    messageArea.style.maxHeight = 'calc(100% - 80px)';
                }
            });

            buttonsArea.appendChild(maximizeButton);
            buttonsArea.appendChild(closeButton);
            chatContainer.appendChild(buttonsArea);
        };

        const _createMessageArea = function() {
            messageArea = d.createElement('div');
            messageArea.id = 'message-area';

            messages.forEach(msg => {
                const messageBubble = d.createElement('div');
                messageBubble.className = 'message-bubble';
                messageBubble.innerText = msg;
                messageArea.appendChild(messageBubble);
            });
        };

        const _createInputArea = function() {
            const inputContainer = d.createElement('div');
            inputContainer.className = 'input-container';

            inputField = d.createElement('input');
            inputField.type = 'text';
            inputField.className = 'input-field';
            inputField.placeholder = 'Escribe un mensaje...';

            inputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.keyCode === 13) {
                    _sendMessage();
                }
            });

            const sendButton = d.createElement('button');
            sendButton.className = 'send-button';
            sendButton.innerHTML = 'Enviar';

            sendButton.addEventListener('click', _sendMessage);

            inputContainer.appendChild(inputField);
            inputContainer.appendChild(sendButton);
            chatContainer.appendChild(inputContainer);
        };

        const _sendMessage = function() {
            const message = inputField.value.trim();
            if (message !== '') {
                const messageBubble = d.createElement('div');
                messageBubble.className = 'message-bubble';
                messageBubble.innerText = message;

                messageArea.appendChild(messageBubble);
                messages.push(message);
                inputField.value = '';
                messageArea.scrollTop = messageArea.scrollHeight;
            }
        };

        const init = function() {
            _insertStyles();
            _createChatIcon();
            _createChatContainer();
            _createButtonsArea();
            _createMessageArea();
            _createInputArea();

            chatContainer.appendChild(messageArea);
            d.body.appendChild(chatContainer);
        };

        return {
            init: init
        };
    };
    $x = Xautix(d, w);
    $x.init();

})(document, window);