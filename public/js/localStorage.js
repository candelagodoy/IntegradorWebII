

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el valor de localStorage al cargar la página
    const storedValue = localStorage.getItem('Location');
    if (storedValue) {
      document.getElementById('next').value = storedValue; // Establecer el valor del input
    }
  
    // Guardar el valor en localStorage solo cuando cambie
    const inputElement = document.getElementById('location');
    inputElement.addEventListener('input', () => {
      localStorage.setItem('Location', inputElement.value); // Guardar el nuevo valor en localStorage
    });
  });
  
  