// Saves options to chrome.storage
function save_options() {
    var setUrl = document.getElementById('setUrl').value;
    var setUsername = document.getElementById('setUsername').value;
    var setPassword = document.getElementById('setPassword').value;
    var setProvinceName = document.getElementById('setProvinceName').value;

    chrome.storage.sync.set({
        setUrl: setUrl,
        setUsername: setUsername,
        setPassword: setPassword,
        setProvinceName: setProvinceName
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        setUrl: '',
        setUsername: '',
        setPassword: '',
        setProvinceName: ''
    }, function(items) {
        document.getElementById('setUrl').value = items.setUrl;
        document.getElementById('setUsername').value = items.setUsername;
        document.getElementById('setPassword').value = items.setPassword;
        document.getElementById('setProvinceName').value = items.setProvinceName;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);