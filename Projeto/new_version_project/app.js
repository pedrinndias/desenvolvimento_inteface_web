document.addEventListener('DOMContentLoaded', function() {
    async function main() {
        try {
            const [equipesResponse, blogResponse] = await Promise.all([
                fetch('dados.json'),
                fetch('blog.json')
            ]);

            const dadosEquipes = await equipesResponse.json();
            const dadosBlog = await blogResponse.json();

            // Seletores dos contêineres em todas as páginas
            const infoCardsContainer = document.getElementById('info-cards');
            const detalheContainer = document.getElementById('detalhe-container');
            const postsContainer = document.getElementById('posts-container');
            const equipesContainer = document.getElementById('equipes-container'); // Container da nova página

            // Renderiza o conteúdo dependendo da página que está aberta
            if (infoCardsContainer) { // Se for a página inicial
                renderInfoCards(dadosEquipes);
            }
            if (postsContainer) { // Se for a página inicial
                renderBlogPosts(dadosBlog);
            }
            if (detalheContainer) { // Se for a página de detalhes
                renderDetalhes(dadosEquipes);
            }
            if (equipesContainer) { // Se for a nova página de equipes
                renderEquipesPage(dadosEquipes); 
            }

        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    }

    // Esta função renderiza os cards na BARRA LATERAL da Home
    function renderInfoCards(dados) {
        const infoCardsContainer = document.getElementById('info-cards');
        infoCardsContainer.innerHTML = '';
        dados.forEach(card => {
            const cardElement = `
                <a href="detalhes.html?id=${card.id}" class="block transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl rounded-lg">
                    <article class="project-card bg-gray-800 rounded-lg shadow-md overflow-hidden h-full">
                        <img src="${card.imagem}" alt="${card.titulo}" class="w-full h-40 object-cover">
                        <div class="p-5">
                            <h3 class="font-bold text-gray-100">${card.titulo}</h3>
                            <p class="text-gray-400 mt-2 text-sm">${card.descricao}</p>
                        </div>
                    </article>
                </a>
            `;
            infoCardsContainer.innerHTML += cardElement;
        });
    }
    
    // **NOVA FUNÇÃO** para renderizar os cards na PÁGINA DE EQUIPES
    function renderEquipesPage(dados) {
        const equipesContainer = document.getElementById('equipes-container');
        equipesContainer.innerHTML = '';
        dados.forEach(card => {
            const cardElement = `
                <a href="detalhes.html?id=${card.id}" class="block transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl rounded-lg">
                    <article class="project-card bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                        <img src="${card.imagem}" alt="${card.titulo}" class="w-full h-48 object-cover">
                        <div class="p-6 flex-grow">
                            <h3 class="font-bold text-xl text-gray-100">${card.titulo}</h3>
                            <p class="text-gray-400 mt-2">${card.descricao}</p>
                        </div>
                    </article>
                </a>
            `;
            equipesContainer.innerHTML += cardElement;
        });
    }

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

    function renderDetalhes(dados) {
        const detalheContainer = document.getElementById('detalhe-container');
        document.body.style.backgroundColor = '#1a202c';
        
        const params = new URLSearchParams(window.location.search);
        const itemId = params.get('id');
        const item = dados.find(d => d.id == itemId);

        if (item) {
            document.title = item.titulo;
            const detalheElement = `
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-6">${item.titulo}</h1>
                <img src="${item.imagem}" alt="${item.titulo}" class="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8">
                
                <div class="bg-gray-800 p-8 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold text-white mb-4">Sobre a Equipe</h2>
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
            detalheContainer.innerHTML = '<h1 class="text-center text-2xl font-bold text-red-500">Equipe não encontrada!</h1>';
        }
    }

    main();
});