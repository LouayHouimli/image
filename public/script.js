function previewImage() {
    const input = document.getElementById('uploadInput');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        previewContainer.style.display = 'none';
    }
}

function uploadImage() {
    const input = document.getElementById('uploadInput');
    const resultContainer = document.getElementById('result');

    const file = input.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(url => {
            resultContainer.innerHTML = `<p>Image URL: <a href="${url}" target="_blank">${url}</a></p>`;
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            resultContainer.innerHTML = '<p>Error uploading image</p>';
        });
    } else {
        resultContainer.innerHTML = '<p>No image selected</p>';
    }
}
