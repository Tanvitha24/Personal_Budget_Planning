let currentAdIndex = 0;

function scrollAds() {
    const adContainer = document.querySelector('.ad-container');
    const ads = document.querySelectorAll('.ad');
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    adContainer.style.transform = `translateX(-${currentAdIndex * 100}%)`;
}

// Auto-scroll advertisements every 5 seconds
setInterval(scrollAds, 5000);

// const headerContent = `

// <header>
//         <div class="logo"><img src="./assests/img/paging/Finman-Logo-1.png" alt="logo" width="100px" height="50px"></div>
//         <nav>
//             <a href="/" class="button">Home</a>
//             <a href="/login" class="button">Login</a>
//             <a href="/signup" class="button">Sign Up</a>
//             <a href="/aboutus" class="button">AboutUs</a>
//             <a href="/services" class="button">Services</a>
//             <a href="/contact" class="button">Contact</a>
//         </nav>
//     </header>
// `;

// const footerContent = `
//     <footer class="footer">
//   <div class="container grid grid--footer">
//     <div class="logo-col">
//       <a href="#" class="footer-logo">
//         <img class="logo" alt="logo" src="./assests/img/paging/Finman-Logo-1.png" />
//         </a>
//         <ul class="social-links">
//           <li><a href="#" style="text-decoration: none"
//             ><i class="bx bxl-facebook"></i
//           ></a></li>
//           <li><a href="#" style="text-decoration: none"
//             ><i class="bx bxl-linkedin"></i
//           ></a></li>
//           <li><a href="#" style="text-decoration: none"
//             ><i class="bx bxl-twitter"></i
//           ></a></li>
//           <li>
//             <a href="#" style="text-decoration: none"
//             ><i class="bx bxl-instagram"></i
//           ></a>
//           </li>
//         </ul>
//         <p class="copy-right">Copyright &copy;<span class="year">2027</span> 
//            by Finman Services,Inc.All rights reserved.</p>
//     </div>
//     <div class="address-col">
//       <p class="footer-heading">Contant us</p>
//       <address class="contacts">
//         <p class="address">623 Harrison St., 2nd Floor, San Francisco, CA 94107</p>
//       <p>
//         <a class="footer-link" href="tel:415-201-6370">415-201-6370</a><br/>
//         <a class="footer-link" href="mailto:hello@website.com">info@website.com</a>
//       </p>
//       </address>
//     </div>
//     <nav class="nav-col">
//     <p class="footer-heading">Account</p>
//     <ul class="footer-nav">
//       <li><a class="footer-link" href="#">Create account</a></li>
//       <li><a class="footer-link" href="#">Sign in</a></li>
//       <li><a class="footer-link" href="#">ioS app</a></li>
//       <li><a class="footer-link" href="#">Android app</a></li>
//     </ul>
//     </nav>

//     <nav class="nav-col">
//       <p class="footer-heading">Company</p>
//       <ul class="footer-nav">
//         <li><a class="footer-link" href="#">Finman</a></li>
//         <li><a class="footer-link" href="#">For Business</a></li>
//         <li><a class="footer-link" href="#">Service</a></li>
//         <li><a class="footer-link" href="#">Finacial Sustainability</a></li>
//       </ul>
//       </nav>
     
//       <nav class="nav-col">
//         <p class="footer-heading">Resources</p>
//         <ul class="footer-nav">
//           <li><a class="footer-link" href="#">Recipe directory</a></li>
//           <li><a class="footer-link" href="#">Help center</a></li>
//           <li><a class="footer-link" href="#">Privacy & terms</a></li>
//         </ul>
//         </nav>
        
//   </div>
// </footer>
// `;

// document.getElementById('header').innerHTML = headerContent;
// document.getElementById('footer').innerHTML = footerContent;



// Initial Header and Footer Content
const guestHeaderContent = `
<header>
    <div class="logo"><img src="./assests/img/paging/Finman-Logo-1.png" alt="logo" width="100px" height="50px"></div>
    <nav>
        <a href="/" class="button">Home</a>
        <a href="/login" class="button">Login</a>
        <a href="/signup" class="button">Sign Up</a>
        <a href="/aboutus" class="button">About Us</a>
        <a href="/services" class="button">Services</a>
        <a href="/contact" class="button">Contact</a>
    </nav>
</header>
`;

const userHeaderContent = `
<header>
    <div class="logo"><img src="./assests/img/paging/Finman-Logo-1.png" alt="logo" width="100px" height="50px"></div>
    <nav>
        <a href="/" class="button">Home</a>
        <a href="/services" class="button">Services</a>
        <a href="/aboutus" class="button">About Us</a>
        <a href="/contact" class="button">Contact</a>
        <a href="/dashboard" class="button">User Dashboard</a>
        <a href="/logout" class="button" id="logoutBtn">Logout</a>
    </nav>
</header>
`;

// Function to Render Header Based on User Login Status
function renderHeader() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log('isLoggedIn:', isLoggedIn); // Debugging
  if (isLoggedIn === 'true') {
      document.getElementById('header').innerHTML = userHeaderContent;
      document.getElementById('logoutBtn').addEventListener('click', logout);
  } else {
      document.getElementById('header').innerHTML = guestHeaderContent;
  }
}


document.addEventListener('DOMContentLoaded', function() {
  renderHeader();
});


// Logout Function to Clear Login Status
// function logout() {
//     localStorage.setItem('isLoggedIn', 'false');
//     renderHeader();
//     window.location.href = '/login'; // Redirect to login page after logout
// }

// Initial Footer Content (Same for Both States)
const footerContent = `
<footer class="footer">
  <div class="container grid grid--footer">
    <div class="logo-col">
      <a href="#" class="footer-logo">
        <img class="logo" alt="logo" src="./assests/img/paging/Finman-Logo-1.png" />
      </a>
      <ul class="social-links">
        <li><a href="#" style="text-decoration: none"><i class="bx bxl-facebook"></i></a></li>
        <li><a href="#" style="text-decoration: none"><i class="bx bxl-linkedin"></i></a></li>
        <li><a href="#" style="text-decoration: none"><i class="bx bxl-twitter"></i></a></li>
        <li><a href="#" style="text-decoration: none"><i class="bx bxl-instagram"></i></a></li>
      </ul>
      <p class="copy-right">Copyright &copy;<span class="year">2027</span> 
      by Finman Services, Inc. All rights reserved.</p>
    </div>
    <div class="address-col">
      <p class="footer-heading">Contact us</p>
      <address class="contacts">
        <p class="address">623 Harrison St., 2nd Floor, San Francisco, CA 94107</p>
        <p><a class="footer-link" href="tel:415-201-6370">415-201-6370</a><br/>
           <a class="footer-link" href="mailto:info@website.com">info@website.com</a>
        </p>
      </address>
    </div>
    <nav class="nav-col">
      <p class="footer-heading">Account</p>
      <ul class="footer-nav">
        <li><a class="footer-link" href="#">Create account</a></li>
        <li><a class="footer-link" href="#">Sign in</a></li>
        <li><a class="footer-link" href="#">iOS app</a></li>
        <li><a class="footer-link" href="#">Android app</a></li>
      </ul>
    </nav>
    <!-- More footer columns can go here -->
  </div>
</footer>
`;

// Render Footer and Header Initially
document.getElementById('footer').innerHTML = footerContent;
renderHeader();




const subheading = document.querySelector('.subheading');
const howSection = document.getElementById('how');


document.addEventListener("DOMContentLoaded", function () {
  const howContainer = document.querySelector(".how-container");

  // Function to check if the element is in the viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll and trigger animation
  function onScroll() {
    if (isInViewport(howContainer)) {
      howContainer.classList.add("fade-in");
      window.removeEventListener("scroll", onScroll); // Trigger only once
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", onScroll);
});


document.addEventListener('DOMContentLoaded', function () {
  const testimonials = document.querySelectorAll('.testimonial');

  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to apply the animation
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Stop observing once it has faded in
      }
    });
  }, options);

  testimonials.forEach(testimonial => {
    observer.observe(testimonial); // Start observing each testimonial
  });
});


// function validateForm() {
//   const password = document.getElementById("password").value;
//   const confirmPassword = document.getElementById("confirmPassword").value;

//   if (password !== confirmPassword) {
//     alert("Passwords do not match.");
//     return false; // Prevent form submission
//   }

//   return true;
// }


function validateForm() {
  // Clear any previous error messages
  document.querySelectorAll(".error").forEach(el => el.innerText = "");

  let isValid = true;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const income = document.getElementById("income").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phonenumber").value;
  const occupation = document.getElementById("occupation").value;

  // Validate Name
  if (name.trim() === "") {
    document.getElementById("nameError").innerText = "Name is required";
    isValid = false;
  }

  // Validate Email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").innerText = "Enter a valid email address";
    isValid = false;
  }

  // Validate Password
  if (password.length < 6) {
    document.getElementById("passwordError").innerText = "Password must be at least 6 characters long";
    isValid = false;
  }

  // Validate Confirm Password
  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
    isValid = false;
  }

  // Validate Income
  if (income <= 0) {
    document.getElementById("incomeError").innerText = "Income must be a positive number";
    isValid = false;
  }

  // Validate Age
  if (age < 18) {
    document.getElementById("ageError").innerText = "You must be at least 18 years old";
    isValid = false;
  }

  // Validate Phone Number
  if (phone.length !== 10) {
    document.getElementById("phoneError").innerText = "Phone number must be 10 digits";
    isValid = false;
  }

  // Validate Occupation
  if (occupation.trim() === "") {
    document.getElementById("occupationError").innerText = "Occupation is required";
    isValid = false;
  }

  // Return false if there are any validation errors
  return isValid;
}


// 