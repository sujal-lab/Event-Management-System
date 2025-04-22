const upcomingEvents = [
    {
      id: "event1",
      title: "Freshers Party",
      date: "April 20, 2025",
      location: "Alpha Zone",
      description: "Join this memorable event."
    },
    {
      id: "event2",
      title: "Pitara Nights",
      date: "May 5, 2025",
      location: "Alpha Zone",
      description: "Join this memorable night with Parmish Verma"
    },
    {
      id: "event3",
      title: "Sports Tournament",
      date: "April 20, 2025",
      location: "Sportorium", 
      description: "Sports Tournament for National Selection",
      
    },
    {
      id: "event4",
      title: "Hack5ive",
      date: "March 25, 2025",
      location: "Chitkara University",
      description: "Great puzzles to be solved and win amazing prizes."
    }
  ];
  
  const pastEvents = [
    {
      id: "event5",
      title: "Stand-Up Comedy Night",
      date: "Dec 5, 2024",
      location: "Exploratorium",
      description: "Enjoy the night with drinks and jokes at comedy club auditorium."
    },
    {
      id: "event6",
      title: "Tech Fest",
      date: "Nov 15, 2024",
      location: "Carneggie Hall",
      description: "Attend Tech Fest with IIT Bombay Professors and chance to win excited prizes"
    },
    {
      id: "event7",
      title: "Cultural Nights",
      date: "Dec 31, 2025",
      location: "Alpha Zone",
      description: "Enjoy the Memorable Night with famous Singers and Performances.",
    },
    {
      id: "event8",
      title: "HackFest",
      date: "May 2, 2025",
      location: "Edison Block",
      description: "Make a Amazing website and win exciting prizes and cash prize upto 100000"
    }
  ];
  
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalLocation = document.getElementById('modal-location');
  const modalDescription = document.getElementById('modal-description');
  
  function generateCards(events, containerId) {
    const container = document.getElementById(containerId);
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.onclick = () => openEventModal(event);
      card.innerHTML = `
        <div class="event-title">${event.title}</div>
        <div class="event-info">Date: ${event.date}</div>
        <div class="event-info">Location: ${event.location}</div>
      `;
      container.appendChild(card);
    });
  }
  
  function openEventModal(event) {
    modalTitle.textContent = event.title;
    modalDate.textContent = `Date: ${event.date}`;
    modalLocation.textContent = `Location: ${event.location}`;
    modalDescription.textContent = event.description;
    modal.style.display = 'flex';
  }
  
  function closeEventModal() {
    modal.style.display = 'none';
  }
  
  window.onload = () => {
    generateCards(upcomingEvents, 'upcoming-events');
    generateCards(pastEvents, 'past-events');
  };
  