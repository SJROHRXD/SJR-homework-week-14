const newFormHandler = async (event) => {
    event.preventDefault();
  
    const subject_name = document.querySelector('#project-name').value.trim();
    const body_content = document.querySelector('#project-desc').value.trim();
  
    if (subject_name && body_content) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ subject_name, body_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);