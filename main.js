/* Meme */
// {
//     'id': 'qwertydfghjj',
//     'body'?: 'tthis is a message',
//     'media'?: {
//       'name': string,
//       'link': string,
//     },
//     'date': Date,
//     'sender_id': string
//    }

const userID = 1
var messages = [
    {
    body: "Message 1",
    date: "2021-06-08T15:57:08.696Z",
    id: "1",
    sender_id: 1
    },
    {
    body: "Message 2",
    date: "2021-06-08T15:58:08.696Z",
    id: "2",
    sender_id: 2
    },
    {
    body: "Message 3",
    date: "2021-06-08T23:24:08.696Z",
    id: "3",
    sender_id: 2
    },
    {
    body: "Message 4",
    date: "2021-06-09T02:18:08.696Z",
    id: "4",
    sender_id: 1
    },
    {
    body: "Message 5",
    date: "2021-06-09T12:04:08.696Z",
    id: "5",
    sender_id: 1
    },
    {
    body: "Message 6",
    date: "2021-06-09T13:19:08.696Z",
    id: "6",
    sender_id: 1
    },
    {
    body: "Message 7",
    date: "2021-06-10T01:01:08.696Z",
    id: "7",
    sender_id: 2
    },
    {
    body: "Message 8",
    date: "2021-06-10T01:01:38.696Z",
    id: "8",
    sender_id: 2
    },
    {
    body: "Message 9",
    date: "2021-06-10T01:23:08.696Z",
    id: "9",
    sender_id: 1
    },
    {
    body: "Message 10",
    date: "2021-06-10T17:00:08.696Z",
    id: "10",
    sender_id: 2
    }
    ];

let ArrangedMessages = (data)=>{

    data.forEach((val)=>{
        // console.log(val.date.split(" "));
        val.date.split(":")
    })
}

const sortedActivities = messages.sort(function(a, b) {
    var dateA = new Date(a.date), dateB = new Date(b.date);
    // console.log(dateA - dateB);
    return dateA - dateB;
});

// const sortedActivities = messages.slice().sort((a, b) => b.date - a.date)
// console.log(sortedActivities);

ArrangedMessages(messages)


let GroupedMessages = {}
messages.forEach((msg) => {
  const date = msg.date.split('T')[0]
  if (GroupedMessages[date]) {
    GroupedMessages[date].push(msg);
  } else {
    GroupedMessages[date] = [msg];
  }
})

console.log(GroupedMessages);


// var random = document.querySelector('#random');

// random.innerHTML = messages[2].body;

/* Time */

var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');

deviceTime.innerHTML = moment().format('h:mm');

setInterval(function() {
	deviceTime.innerHTML = moment().format('h:mm');
}, 1000);

for (var i = 0; i < messageTime.length; i++) {
	messageTime[i].innerHTML = moment().format('h:mm A');
}

/* Message */

var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

function appendMessages(data){
    data.forEach((val)=>{
        console.log(val);
        if (val.sender_id === userID ){
            conversation.appendChild(buildMessage(val.body, 'sent'));
        }else{
            conversation.appendChild(buildMessage(val.body, 'received'));
        }

    })
}

appendMessages(messages)



function newMessage(e) {
	var input = e.target.input;

	if (input.value) {
		var message = buildMessage(input.value, 'sent');
		conversation.appendChild(message);
		animateMessage(message);
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
}

function buildMessage(text, attr) {
	var element = document.createElement('div');

	element.classList.add('message', attr);

	element.innerHTML = text +
		'<span class="metadata">' +
			'<span class="time">' + moment().format('h:mm A') + '</span>' +
			'<span class="tick tick-animation">' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>' +
		'</span>';

	return element;
}

function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
		tick.classList.remove('tick-animation');
	}, 500);
}