document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        cpf: document.getElementById("cpf").value,
        birthdate: document.getElementById("birthdate").value,
        email: document.getElementById("email").value
    };

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        document.getElementById("message").textContent = "Cadastro realizado com sucesso!";
    } catch (error) {
        document.getElementById("message").textContent = "Erro ao cadastrar!";
    }
});
