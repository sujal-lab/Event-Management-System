const upcomingEvents = [
    {
      id: "event1",
      title: "Tech Conference 2025",
      date: "April 20, 2025",
      location: "Virtual",
      description: "Join global tech leaders to explore trends in software, AI, and cybersecurity."
    },
    {
      id: "event2",
      title: "AI & Innovation Expo",
      date: "May 10, 2025",
      location: "Bangalore",
      description: "A showcase of AI startups, innovations, and academic research pushing boundaries."
    }
  ];
  
  const pastEvents = [
    {
      id: "event3",
      title: "Creative Hackathon 2024",
      date: "Dec 5, 2024",
      location: "Delhi",
      description: "Collaborated on a 24-hour challenge building innovative tech products."
    },
    {
      id: "event4",
      title: "Cybersecurity Summit 2024",
      date: "Nov 15, 2024",
      location: "Online",
      description: "Attended expert sessions on digital security, data privacy, and threat prevention."
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
  