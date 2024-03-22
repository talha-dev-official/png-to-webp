document.getElementById('convert').addEventListener('click', function () {
    const fileInput = document.getElementById('upload');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const quality = 0.92;
                canvas.toBlob(function (blob) {
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    document.body.appendChild(downloadLink);
                    downloadLink.style.display = 'none';
                    downloadLink.href = url;
                    downloadLink.download = "converted-image.webp";
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(url);
                }, 'image/webp', quality);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload a PNG file first.');
    }
});
