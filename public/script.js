document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const contactForm = document.getElementById('contact-form');

    // Simulación de datos de proyectos
    const projects = [
        { title: 'Proyecto 1', content: 'Despligue HTTPS', author: 'Camacho' },
        { title: 'Proyecto 2', content: 'Utilización de CORS', author: 'Camacho' },
        { title: 'Proyecto 3', content: 'Deploy CI/CD', author: 'Camacho' },
        { title: 'Proyecto 4', content: 'Acción gh recursiva repetible', author: 'Camacho' }
    ];

    // Renderizar proyectos
    projects.forEach(project => {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.content}</p>
            <p><strong>Autor:</strong> ${project.author}</p>
        `;
        postList.appendChild(post);
    });

    // Manejar envío del formulario de contacto
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Aquí puedes agregar la lógica para enviar el formulario de contacto
        console.log('Formulario enviado:', { name, email, message });

        // Crear y mostrar el mensaje de confirmación
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'confirmation-message';
        confirmationMessage.textContent = 'Mensaje enviado. Gracias por contactarme.';
        document.body.appendChild(confirmationMessage);

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            confirmationMessage.classList.add('hide');
            setTimeout(() => {
                confirmationMessage.remove();
            }, 1000);
        }, 3000);

        contactForm.reset();
    });
});