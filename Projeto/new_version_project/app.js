document.addEventListener('DOMContentLoaded', function() {
    // Função principal assíncrona para carregar todos os dados
    async function main() {
        try {
            // Carrega os dados das guildas e do blog em paralelo para otimizar
            const [guildasResponse, blogResponse] = await Promise.all([
                fetch('dados.json'),
                fetch('blog.json')
            ]);

            const dadosGuildas = await guildasResponse.json();
            const dadosBlog = await blogResponse.json();

            // Pega os contêineres do HTML onde o conteúdo será inserido
            const infoCardsContainer = document.getElementById('info-cards');
            const detalheContainer = document.getElementById('detalhe-container');
            const postsContainer = document.getElementById('posts-container');

            // Verifica em qual página estamos e chama a função de renderização correspondente
            if (infoCardsContainer) {
                renderInfoCards(dadosGuildas);
            }

            if (detalheContainer) {
                renderDetalhes(dadosGuildas);
            }

            if (postsContainer) {
                renderBlogPosts(dadosBlog);
            }
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    }

    // Função para renderizar os cards das Guildas na página principal
    function renderInfoCards(dados) {
        const infoCardsContainer = document.getElementById('info-cards');
        infoCardsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos elementos
        dados.forEach(card => {
            const cardElement = `
                <a href="detalhes.html?id=${card.id}" class="block transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl rounded-lg">
                    <article class="project-card bg-gray-800 rounded-lg shadow-md overflow-hidden h-full">
                        <img src="${card.imagem}" alt="${card.titulo}" class="w-full h-40 object-cover">
                        <div class="p-5">
                            <h3 class="font-bold text-gray-100">${card.titulo}</h3>
                            <p class="text-gray-400 mt-2">${card.descricao}</p>
                        </div>
                    </article>
                </a>
            `;
            infoCardsContainer.innerHTML += cardElement;
        });
    }

    // Função para renderizar os cards de posts do blog na página principal
    function renderBlogPosts(posts) {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = `
                <a href="#" class="block transform hover:-translate-y-1 transition-transform duration-300">
                    <article class="bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                        <div class="p-6 flex-grow">
                            <p class="text-sm text-blue-400 font-semibold">${post.categoria}</p>
                            <h3 class="font-bold text-gray-100 text-xl mt-2">${post.titulo}</h3>
                            <p class="text-gray-400 mt-3">${post.resumo}</p>
                        </div>
                        <div class="bg-gray-700 px-6 py-3">
                            <p class="text-sm text-gray-400">Por ${post.autor} - ${new Date(post.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                        </div>
                    </article>
                </a>
            `;
            postsContainer.innerHTML += postElement;
        });
    }

    // Função para renderizar o conteúdo na página de detalhes
    function renderDetalhes(dados) {
        const detalheContainer = document.getElementById('detalhe-container');
        
        // Garante que o fundo da página de detalhes seja escuro
        document.body.style.backgroundColor = '#1a202c';
        
        const params = new URLSearchParams(window.location.search);
        const itemId = params.get('id');
        const item = dados.find(d => d.id == itemId);

        if (item) {
            document.title = item.titulo; // Atualiza o título da aba do navegador
            const detalheElement = `
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-6">${item.titulo}</h1>
                <img src="${item.imagem}" alt="${item.titulo}" class="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8">
                
                <div class="bg-gray-800 p-8 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold text-white mb-4">Sobre a Guilda</h2>
                    <p class="text-gray-300 text-lg leading-relaxed">${item.conteudo}</p>
                    
                    <div class="mt-8 border-t border-gray-700 pt-6">
                        <h3 class="text-xl font-bold text-white mb-3">Detalhes Adicionais</h3>
                        <p class="text-gray-300"><strong class="font-semibold text-gray-100">Coordenador(a):</strong> ${item.responsavel}</p>
                        <p class="text-gray-300"><strong class="font-semibold text-gray-100">Início das Atividades:</strong> ${new Date(item.data_inicio).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                    </div>
                </div>
            `;
            detalheContainer.innerHTML = detalheElement;
        } else {
            detalheContainer.innerHTML = '<h1 class="text-center text-2xl font-bold text-red-500">Guilda não encontrada!</h1>';
        }
    }

    // Inicia a execução do script
    main();
});
