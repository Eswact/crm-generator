const commonFunctions = {
  openModal: function(width, height, html) {
    let sharedModalBg = document.getElementById('sharedModalBg');
    if (window.innerWidth >= 640) { //sm
      sharedModalBg.style.width = `${width}px`;
      sharedModalBg.style.height = `${height}px`;
    }
    document.getElementById('sharedModal').classList.add('show');
    document.getElementById('sharedModalBody').innerHTML = html;
  },
  closeModal: function() {
    document.getElementById('sharedModal').classList.remove('show');
  },
  updateSEO: function({ title, description, keywords }) {
    if (title) {
      document.title = title;
    }
    if (description) {
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
    if (keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords.join(", ");
    }
  },
  openFilter: function() {
    document.getElementById('tableFilterModal').classList.add('show');
  },
  closeFilter: function() {
    document.getElementById('tableFilterModal').classList.remove('show');
  },
}

export default commonFunctions;