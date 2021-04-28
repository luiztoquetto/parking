interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
}

(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function calcTempo(mil: number): String {
        const minuto = Math.floor(mil / 60000);
        const segundo = Math.floor((mil % 60000) / 1000);

        return `${minuto} minuto(s) e ${segundo} segundo(s)`;
    }

    function patio() {
        function ler(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }

        function adicionar(veiculo: Veiculo, salva?: boolean) {
            const existePlaca = ler().find((veiculoAtual) => veiculo.placa.toUpperCase() == veiculoAtual.placa.toUpperCase());

            if (!!existePlaca && salva == true) {
                alert("Veículo cadastrado.");
                return;
            }

            function forEach(veiculo: number) {
                
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

            row.querySelector(".del")?.addEventListener("click", function() {
                remover(this.dataset.placa);
            });

            $("#patio")?.appendChild(row);

            if( salva ) salvar([...ler(), veiculo]);
        }

        function remover(placa: string) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);

            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            if (!confirm(`O veículo ${nome} com a placa ${placa} permaneceu por "${tempo}". Deseja excluir?`)) return;

            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }

        function render() {
            $("#patio")!.innerHTML = "";

            const patio = ler();

            if( patio.length ) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }

        return { ler, adicionar, remover, salvar, render };
    }

    patio().render();

    $("#cadastrar")?.addEventListener("click", () => {
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;

        console.log({ nome, placa });   // teste inputs;

        if( !nome || !placa ) {
            alert("Os campos nome e placa do veículo são obrigatórios!");
            return;
        }

        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();