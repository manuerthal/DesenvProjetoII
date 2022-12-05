$(function () { 
    $(document).on("click", "#logout", function logout() {
            localStorage.removeItem("name");
            window.location = 'escolhas.html';
        });  
});