// ~ show modal , show dialog message, splash
const commonFunctions = {
    openModal: function(width, height, html) {
        let sharedModalBg = document.getElementById('sharedModalBg');
        sharedModalBg.style.width = `${width}px`;
        sharedModalBg.style.height = `${height}px`;
        document.getElementById('sharedModal').classList.add('show');
        document.getElementById('sharedModalBody').innerHTML = html;
    },
    closeModal: function() {
        document.getElementById('sharedModal').classList.remove('show');
    }
}

export default commonFunctions;