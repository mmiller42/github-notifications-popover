;(() => {
  'use strict'

  const button = document.querySelector('.Header .notification-indicator')
  button.classList.add('js-menu-target')

  button.addEventListener('click', event => {
    event.preventDefault()
    showNotificationsList()
  })

  function showNotificationsList() {
    button.classList.add('selected')
    getNotifications()
      .then(list => {
        const dropdown = document.createElement('div')
        dropdown.setAttribute('id', 'notificationsDropdown')
        dropdown.classList.add('dropdown-menu-content', 'js-menu-content')
        const dropdownInner = document.createElement('div')
        dropdownInner.classList.add('dropdown-menu', 'dropdown-menu-sw')
        dropdown.append(dropdownInner)
        const link = document.createElement('a')
        link.setAttribute('id', 'seeAllNotifications')
        link.setAttribute('href', '/notifications')
        link.innerHTML = 'See all notifications'
        dropdownInner.append(link)
        dropdownInner.append(list)

        button.insertAdjacentHTML('afterend', dropdown.outerHTML)
      })
  }

  function getNotifications() {
    return fetch(`/notifications?${Date.now()}`, { credentials: 'include' })
      .then(response => response.text())
      .then(html => {
        const doc = document.implementation.createHTMLDocument()
        doc.body.outerHTML = html.substring(html.indexOf('<body'), html.indexOf('</body>') + '</body>'.length)
        return doc.querySelector('.notifications-list')
      })
  }

  const style = document.createElement('style')
  style.appendChild(document.createTextNode(`
    #seeAllNotifications {
      display: block;
      text-align: right;
      font-size: 90%;
      margin-top: -5px;
      padding: 5px 10px;
      border-radius: 4px 4px 0 0;
    }

    #seeAllNotifications:hover {
      background: #f5f9fc;
    }

    #notificationsDropdown .dropdown-menu {
      width: 600px;
    }

    #notificationsDropdown .boxed-group > h3 a {
      color: #0366d6;
    }

    #notificationsDropdown .notifications .list-group-item-name a {
      max-width: 300px;
    }
  `))
  document.head.appendChild(style)
})();
