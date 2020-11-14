//protegemos tudo em um escopo de função...

function lista() {

    const inputTarefa = document.querySelector('.input-nova-tarefa');
    const botaoAdTarefa = document.querySelector('.btn-add-tarefa');
    const tarefas = document.querySelector('.tarefas');


    //recebendo click no botão de ad tarefa:
    botaoAdTarefa.addEventListener('click', function () {
        if (!inputTarefa.value) {
            return;
        } else {
            //importantíssimo adicionar o .value neste caso!!!
            //adiconando o valor de input na ul. Tem que chamar a criação de uma tarefa com o
            //argumento do que está no campo de input.
            criaTarefa(inputTarefa.value);
        }
    })

    //recebendo a tecla enter no campo de input tarefa:
    inputTarefa.addEventListener('keypress', function (e) {
        //uma condicional verifica se o que foi pressionado é a tecla de código 13 (enter).
        //se for abre uma nova condicional:
        if (e.keyCode === 13) {
            //que verifica se o input tem algo escrito. Se não tiver ele dá return e não faz nada. 
            if (!inputTarefa.value) {
                return;
            //e caso tenhas chama a função de criarTarefa.
            } else {
                //chamando a função de criar tarefa com o argumento do que está no camp input.
                criaTarefa(inputTarefa.value);
            }


        }
    })

    //funcção que cria a tarefa recebe um argumento de texto:
    function criaTarefa(texto) {
        //dá pra fazer assim, mas não é recomendado...
        //tarefas.innerHTML += '<li>'+inputTarefa.value+'</li>';
        //crio duas var, uma para o valor do campo input e outra pra chamar a função do 
        //botão apagar.

        //aqui crio uma var para o item e chamo a crioação de <li> já com o valor do input que veio quando 
        //invoquei a função de criar tarefa.
        let item = criarLi(texto);
        //crio uma var pra criar o botão de apagar.
        let itemBotao = criarBotaoApagar();
        //dou um append nestas duas var pra inserir elas na ul de tarefas.
        //item append em tarefas 
        tarefas.appendChild(item);
        //e itemBotão append em item, pra ficarem na mesma linha.
        item.appendChild(itemBotao);
        //chamo a função de limpar o campo pra liberar pra nova inserção.
        limparCampo();
        //e por fim a função de salvar tudo no local storage. 
        salvarTarefas();
    }

    //funcção de criar o <li>
    function criarLi(input) {
        //crio uma var para a tag li e atribuo a ela a criação do elemento <li></li>
        const li = document.createElement('li');
        //com ela criada dou um innerText pra inserir nela o texto do campo input.
        //aqui dou um espaço prara o botão de apagar nao ficar colado no item. 
        li.innerText = input + '   ';
        return li;
    }

    //aqui crio o botão de apagar. 
    function criarBotaoApagar() {
        let apagar = document.createElement('button');
        //defino o texto que vai descrever o botão.
        apagar.innerText = 'Apagar';
        //e determino sua classse, que será funcdamental na ação de apagar o item da lista mais tarde.
        apagar.classList.add('apagar', 'btn', 'btn-danger');
        //apagar.classList.add('btn btn-primary')
        return apagar;

    }

    //funcção que coloca o campo de input em foco e define o valor dele para vazio.
    function limparCampo() {
        inputTarefa.focus();
        inputTarefa.value = '';
    }

    //aqui vou escutar os cliques  no documento em qualquer target de classe que tenha o valor de 'apagar'
    document.addEventListener('click', function (e) {
        const el = e.target;
        if (el.classList.contains('apagar', 'btn', 'btn-danger')) {
            //aqui eu vejo qual é o elemento pai desse botão que tem a classe apagar. 
            //deve ser um <li>...</li>
            console.log(el.parentElement);
            //sabendo disso mando remover o parent do botão clicado. 
            el.parentElement.remove();

            //importante salvar no local storage quando apagar uma tarefa pra deixar tudo sincronzadinho. 
            salvarTarefas();
        }
    })

    //função para salvar as tarefas em local Storage
    function salvarTarefas() {
        //uso selectorAll pra selecionar todos os <li> de tarefas
        const liTarefas = tarefas.querySelectorAll('li');
        //daí crio uma var para a lista e atribuo a ela um array vazio.
        const listaDeTarefas = [];

        //usando for of crio uma var chamada tarefa com os dados de litarefas
        for (let tarefa of liTarefas) {
            //crio uma var pra extyrair só o texto de cada tarefa e atribuir ele à minha var tarefa.
            let tarefaTexto = tarefa.innerText;
            //aqui uso replace pra tirar os textos de Apagar das minhas li e também o trim para tirar o espaço em branco no final.
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            //com o texto dos meus intens de lista salvos em tarefaTexto dou um push pra mandar eles pro array 
            //de listaDeTarefas
            listaDeTarefas.push(tarefaTexto);
        }

        //com o array acertadinho é hora de mandarmos ele para a local storage.
        //para isso usaremos o JSON. Crio uma var de tarefasJSON e atribuo a ela o 
        //JSON.stringfy de lista de tarefas. isso converterá o array em texto e tbm para o formato JSON.    
        const tarefasJSON = JSON.stringify(listaDeTarefas);
        //feito isso uso localStorage.setItem pra guardar tarefasJSON em uma chave chamada 'tarefas'
        localStorage.setItem('tarefas', tarefasJSON);
    }


    //essa função serve para buscar as tarefas salvas em local storage no formato JSON.
    function adicionaTarefasSalvas() {
        //crio uma var tarefas dentro desse escopo e atribuo a ela o parse da chave tarefas que está em 
        //local storage, usando getItem.
        const tarefas = JSON.parse(localStorage.getItem('tarefas'));
        console.log(tarefas);
        //aqui crio uma var chamada tare psrs cada item de tarefas que acabei de dar o parse. 
        //é a forma de recuperar o que está em local storage no formato JSON.
        for (let tare of tarefas) {
            //com essas var criadas eu chamo a função de criar tarefa com o argumento de tare.
            //assim a tela vai estar sempre com o valor do que estiver em local storage. 
            criaTarefa(tare);
        }
    }

    adicionaTarefasSalvas();

}

lista();

