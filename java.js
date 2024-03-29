document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired');

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      console.log('Navigation link clicked');
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      if (targetId === 'home') {
        console.log('Scrolling to top of the page for home link');
        // Show all sections for home link
        showAllSections();
        scrollTo(0, 1000);
      } else {
        console.log('Hiding all sections except the target section');
        // Hide all sections except the target section
        hideAllSectionsExcept(targetId);
        // Scroll to the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          console.log('Scrolling to the target section:', targetId);
          scrollTo(targetSection.offsetTop, 1000);
        } else {
          console.log('Target section not found:', targetId);
        }
      }
    });
  });

  // Function to smoothly scroll to a target position
  function scrollTo(to, duration) {
    console.log('Smooth scrolling to:', to);
    const start = window.scrollY || window.pageYOffset;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = function() {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      window.scrollTo(0, val);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  // Easing function for smooth scrolling
  Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  // Toggle visibility of sections
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      console.log('Navigation link clicked');
      e.preventDefault();
      const targetSectionId = this.getAttribute('href').slice(1);

      // Hide all sections except the target section
      hideAllSectionsExcept(targetSectionId);

      // Set the clicked link as active
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Function to hide all sections except the target section
  function hideAllSectionsExcept(targetId) {
    console.log('Hiding all sections except:', targetId);
    sections.forEach(section => {
      if (section.id !== targetId) {
        section.classList.add('hidden');
      } else {
        section.classList.remove('hidden');
      }
    });
  }

  // Function to show all sections
  function showAllSections() {
    console.log('Showing all sections');
    sections.forEach(section => {
      section.classList.remove('hidden');
    });
  }

  // Form validation
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    if (validateForm()) {
      // If form is valid, submit the form
      this.submit();
    }
  });
});

function validateForm() {
  // Your form validation logic here
  // For example, validate if the required fields are filled
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Please fill out all the fields.');
    return false;
  }

  // You can add more validation logic here...

  return true; // Return true if the form is valid, false otherwise
}
