module.exports = {
  "icon": "/images/icon.png", //must be "/images/icon.png"
  "logo": "/images/logo.png",
  "siteName": "My CRM",
  "title": "My CRM",
  "theme": {
    "colors": {
      "bg": "#D7D7D7",
      "text": "#333",
      "darkBg": "#091625",
      "darkText": "#FFF",
      "accept": "#4CAF50",
      "cancel": "#DC3545",
      "main": "#77567A",
      "second": "#2F323A",
      "third": "#E3D26F",
      "fourth": "#347FC4",
      "customColors": {
        "deneme": "#FF0000",
        "test": "00FF00"
      }
    },
    "font": {
      "family": "Montserrat",
      "size": "14px",
      "custom": [
        {
          "name": "Montserrat",
          "file": "Montserrat.woff2"
        }
      ]
    },
  },
  "pages": [
    {
      "file": "HomePage.vue",
      "name": "Home",
      "path": "/",
      "icon": 'fa-solid fa-home',
      "seo": {
        "description": "Manage your profile information",
        "keywords": ["home", "main", "welcome"]
      },
      "components": [],
      "customDoms": `<div>Welcome to Crm Creater</div>
      <div>How it works?</div>`,
      "customScripts": ``,
    },
    {
      "file": "ProductsPage.vue",
      "name": "Products",
      "path": "/products",
      "icon": 'fa-solid fa-layer-group',
      "seo": {
        "title": "Products - My CRM",
        "description": "Overview of products",
        "keywords": ["products", "sale", "price"]
      },
      "components": [
        {
          "type": "datatable",
          "id": "productsTable",
          "columns": ["title", "url", "albumId", "thumbnailUrl"],
          "ajax": { "url": "https://jsonplaceholder.typicode.com/photos", "method": "GET", "dataSrc": '' },
          "filters": [],
          "toolbar": []
        }
      ],
      "customDoms": ``,
      "customScripts": ``,
    },
    {
      "file": "MessagesPage.vue",
      "name": "Messages",
      "path": "/messages",
      "icon": 'fa-solid fa-comment',
      "seo": {
        "title": "Messages - My CRM",
        "description": "Overview of customer messages",
        "keywords": ["messages", "communication", "complaint"]
      },
      "components": [
        {
          "type": "datatable",
          "id": "messagesTable",
          "columns": ["postId", "name", "email", "body"],
          "ajax": { "url": "https://jsonplaceholder.typicode.com/comments", "method": "GET", "dataSrc": '' },
          "filters": [],
          "toolbar": []
        }
      ],
      "customDoms": ``,
      "customScripts": ``,
    },
    {
      "file": "ProfilePage.vue",
      "name": "Profile",
      "path": "/profile",
      "icon": 'fa-solid fa-user',
      "seo": {
        "title": "User Profile",
        "description": "Manage your profile information",
        "keywords": ["profile", "user", "settings"]
      },
      "components": [],
      "customDoms": `<div>Edit Profile</div>`,
      "customScripts": ``,
    }
  ],
};