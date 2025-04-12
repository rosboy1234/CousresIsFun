document.addEventListener("DOMContentLoaded", function() {
  // Ініціалізація теми
  initTheme();
  
  // Ініціалізація навігації
  initCourseNavigation();
  
  // Ініціалізація форм
  initForms();
  
  // Показати обраний курс на сторінці реєстрації
  showSelectedCourse();
});

function showSelectedCourse() {
  const selectedCourseInfo = document.getElementById('selectedCourseInfo');
  const selectedCourseName = document.getElementById('selectedCourseName');
  
  if (selectedCourseInfo && selectedCourseName) {
      const course = localStorage.getItem('selectedCourse');
      const courseName = localStorage.getItem('selectedCourseName');
      
      if (course && courseName) {
          selectedCourseName.textContent = courseName;
          selectedCourseInfo.classList.remove('d-none');
      } else {
          selectedCourseInfo.classList.add('d-none');
      }
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeSwitch = document.getElementById("themeSwitcher");
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeSwitch) themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  if (themeSwitch) {
    themeSwitch.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }
}

function initCourseNavigation() {
  // Обробка кліків на картки курсів
  document.querySelectorAll('[data-course]').forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.closest('a, button')) {
        const coursePage = this.getAttribute('data-course');
        window.location.href = coursePage;
      }
    });
  });
  
  // Обробка кнопок реєстрації
  document.querySelectorAll('[id^="enroll"], [id^="modalEnroll"], [id^="sidebarEnroll"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const course = this.id.replace(/enroll|modalEnroll|sidebarEnroll/, '');
      const courseName = this.closest('.card').querySelector('h3, .card-title').textContent;
      
      // Зберігаємо без розширення .html
      localStorage.setItem('selectedCourse', course.toLowerCase());
      localStorage.setItem('selectedCourseName', courseName);
    });
  });
}

function initForms() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }
      
      // Перевірка збігу паролів
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity('Паролі не співпадають');
        this.classList.add('was-validated');
        return;
      }
      
      // Збереження даних
      localStorage.setItem('userName', document.getElementById('name').value);
      localStorage.setItem('userEmail', document.getElementById('email').value);
      
      // Перенаправлення
      const course = localStorage.getItem('selectedCourse') || 'courses';
      window.location.href = `/${course}.html`;
    });
  }
  
  // Обробка форми очікування
  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }
      
      document.getElementById('waitlistSuccess').classList.remove('d-none');
      setTimeout(() => {
        this.reset();
        this.classList.remove('was-validated');
        document.getElementById('waitlistSuccess').classList.add('d-none');
      }, 3000);
    });
  }
}