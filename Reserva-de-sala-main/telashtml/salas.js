// javaScript para manipular o floatingPage sumir e aparecer


document.addEventListener("DOMContentLoaded", function() {
    var floatingPage = document.getElementById("floatingPage");
    var filtroInput = document.querySelector(".filtro");

    // Ocultando o floatingPage inicialmente
   floatingPage.style.display = "none";

    // Manipulador de eventos para exibir o floatingPage quando o usuário passar o mouse sobre o campo de entrada
    filtroInput.addEventListener("mouseenter", function() {
        floatingPage.style.display = "block";
    });

    // Manipulador de eventos para ocultar o floatingPage quando o mouse sair dos limites do campo de entrada
    filtroInput.addEventListener("mouseleave", function(event) {
        var boundingRect = floatingPage.getBoundingClientRect();
        if (event.clientX < boundingRect.left || event.clientX > boundingRect.right || 
            event.clientY < boundingRect.top || event.clientY > boundingRect.bottom) {
            floatingPage.style.display = "none";
        }
    });

    // Manipulador de eventos para ocultar o floatingPage quando o mouse sair dos limites do próprio floatingPage
    floatingPage.addEventListener("mouseleave", function(event) {
        var boundingRect = filtroInput.getBoundingClientRect();
        if (event.clientX < boundingRect.left || event.clientX > boundingRect.right || 
            event.clientY < boundingRect.top || event.clientY > boundingRect.bottom) {
            floatingPage.style.display = "none";
        }
    });
});


// Modifique a função fecharInputBox() para ocultar o input-box
function fecharInputBox() {
    var inputBox = document.querySelector('.input-box');
    inputBox.style.display = 'none'; // Ocultar a input-box
}

    // Manipulador de eventos para abrir a input-box quando o botão "Adicionar Sala" é clicado
    document.getElementById("btnAdicionarSala").addEventListener("click", function() {
        abrirInputBox();
    });
    function abrirInputBox() {
        var inputBox = document.querySelector('.input-box');
        inputBox.style.display = 'flex'; // Exibir a input-box
    }

    function abrirInputBox(event) {
        event.preventDefault();  // Impede o envio do formulário
    
        var inputBox = document.querySelector('.input-box');
        inputBox.style.display = 'flex'; // Exibir a input-box
    }
    
    // Modifique a função fecharInputBox() para ocultar o input-box
    function fecharInputBox() {
        var inputBox = document.querySelector('.input-box');
        inputBox.style.display = 'none'; // Ocultar a input-box
    }