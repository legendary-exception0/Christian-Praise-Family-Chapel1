document.getElementById('nav_user').addEventListener('click', function() {
    formChange();
});

document.getElementById('nav_admin').addEventListener('click', function() {
    formChange1();
});

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('change_password.php', {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        if (result.success) {
            alert('User Password changed successfully');
        } else {
            alert('Error: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('There was a problem with the fetch operation.');
    });
});

document.getElementById('form1').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('change_admin_password.php', {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        if (result.success) {
            alert('Admin Password changed successfully');
        } else {
            alert('Error: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('There was a problem with the fetch operation.');
    });
});

var form1 = document.getElementById('form1');
var form = document.getElementById('form');

form1.style.display = 'none'

function formChange(){
    form1.style.display = 'none';
    form.style.display = 'flex';
};

function formChange1(){
    form.style.display = 'none';
    form1.style.display = 'flex';
}