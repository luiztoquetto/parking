(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const minuto = Math.floor(mil / 60000);
        const segundo = Math.floor((mil % 60000) / 1000);
        return `${minuto} minuto(s) e ${segundo} segundo(s)`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const existePlaca = ler().find((veiculoAtual) => veiculo.placa.toUpperCase() == veiculoAtual.placa.toUpperCase());
            if (!!existePlaca && salva == true) {
                alert("Veículo cadastrado.");
                return;
            }
            function forEach(veiculo) {
            }
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td colspan="2">
                    <button class="del btn btn-danger" data-placa="${veiculo.placa}">
                        Deletar veículo
                    </button>
                </td>
            `;
            (_a = row.querySelector(".del")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} com a placa ${placa} permaneceu por "${tempo}". Deseja excluir?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ nome, placa }); // teste inputs;
        if (!nome || !placa) {
            alert("Os campos nome e placa do veículo são obrigatórios!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
