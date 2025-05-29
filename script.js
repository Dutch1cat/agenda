const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const clearBtn = document.getElementById('clearBtn');

window.onload = () => {
  refreshEventList();
};

eventForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const day = document.getElementById('day').value.padStart(2, '0');
  const month = document.getElementById('month').value.padStart(2, '0');

  const event = {
    id: Date.now(), // ID univoco
    title,
    date: `${day}/${month}`
  };

  saveEvent(event);
  refreshEventList();
  eventForm.reset();
});

function addEventToList(event) {
  const li = document.createElement('li');
  li.textContent = `${event.date} - ${event.title} `;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteEvent(event.id);
  });

  li.appendChild(deleteBtn);
  eventList.appendChild(li);
}

function saveEvent(event) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
}

function deleteEvent(id) {
  let events = JSON.parse(localStorage.getItem('events')) || [];
  events = events.filter(event => event.id !== id);
  localStorage.setItem('events', JSON.stringify(events));
  refreshEventList();
}

function refreshEventList() {
  eventList.innerHTML = '';
  const savedEvents = JSON.parse(localStorage.getItem('events')) || [];

  savedEvents.sort((a, b) => {
    const [dayA, monthA] = a.date.split('/').map(Number);
    const [dayB, monthB] = b.date.split('/').map(Number);
    return monthA === monthB ? dayA - dayB : monthA - monthB;
  });

  savedEvents.forEach(event => {
    addEventToList(event);
  });
}

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('events');
  eventList.innerHTML = '';
});
