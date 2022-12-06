let logoutFunc = () => {
    localStorage.removeItem('name');
    window.location.reload();
}