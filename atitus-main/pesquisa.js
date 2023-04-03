function createCardElement(projeto) {
  const card = document.createElement('div');
  card.id = projeto.id;
  card.className = 'card';
  card.dataset.tags = projeto.tags.join(' ');
  card.dataset.projectId = projeto.id;

  return card;


}

function createCardContent(projeto) {
  return `
    <div class="cimaCard">
        <h2>${projeto.nome}</h2>
    </div>
    <div class="baixoCard">
        <div class="baixoCardTexto">
            <p>${projeto.descricao}</p>
        </div>
    </div>
    <div class="card-tags">
        <div class="tagsDescricao">
            <p>Escola</p>
            <span class="card-tag empreendedorismo">${projeto.escola}</span>
        </div>
        <div class="tagsDescricao">
            <p>Curso</p>
            <span class="card-tag robotica">${projeto.curso}</span>
        </div>
        <div class="tagsDescricao">
            <p>Estágio</p>
            <span class="card-tag mvp">${projeto.estagio}</span>
        </div>
    </div>`;
}

function createProjectCard(projeto) {
  const card = createCardElement(projeto);
  card.innerHTML = createCardContent(projeto);
  return card;
}

function carregarProjetos() {
  fetch('projects.json')
    .then(response => response.json())
    .then(projetos => {
      const container = document.querySelector('.portfolio');
      projetos.forEach(projeto => {
        const card = createProjectCard(projeto);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar projetos:', error);
    });
}

carregarProjetos();

// Restante do código


function carregarProjetos() {
  fetch('projects.json')
      .then(response => response.json())
      .then(projetos => {
          const container = document.querySelector('.portfolio');
          projetos.forEach(projeto => {
              const card = createProjectCard(projeto);
              container.appendChild(card);
          });
      })
      .catch(error => {
          console.error('Erro ao carregar projetos:', error);
      });
}



function filterProjects(filterSelectId) {
    const filterSelect = document.getElementById(filterSelectId);
    const projects = document.getElementsByClassName("card");
  
    filterSelect.addEventListener("change", function() {
      const selectedTag = filterSelect.value.toLowerCase();
  
      for (let project of projects) {
        const tags = project.getAttribute("data-tags").toLowerCase();
  
        if (tags.includes(selectedTag) || selectedTag === "") {
          project.style.display = "flex";
        } else {
          project.style.display = "none";
        }
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    filterProjects("filterSelectEscola");
    filterProjects("filterSelectCurso");
    filterProjects("filterSelectEstagio");
  
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      const projectId = parseInt(card.getAttribute("data-project-id"));
  
      card.addEventListener("click", () => {
        window.location.href = `projeto.html?id=${projectId}`;
      });
    });
  });
  
  function loadProjectPage() {
    const params = new URLSearchParams(window.location.search);

    
    const projectId = params.get("id");
    if (projectId === null) {
      console.log("Nenhum ID de projeto encontrado na URL.");
      return;
    }    
  
    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {
        const project = projects.find(project => project.id === parseInt(projectId));
        if (project) {
       
          document.getElementById("project-title").textContent = project.title;
          document.getElementById("project-description").innerHTML =  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ project.description;
          document.getElementById("project-diferencial").innerHTML =  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ project.diferencial;
          document.getElementById("project-solucao").innerHTML =  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ project.description;


          
          const tags = project.tags.map((tag, index) => {
            let tagColor = "";
            if (index === 0) {
              tagColor = "#7d71f6";
            } else if (index === 1) {
              tagColor = "#ec81c8";
            } else if (index === 2) {
              tagColor = "#ffaa72";
            }
            return `<span class="tag" style="background-color: ${tagColor};">${tag}</span>`;
          }).join("");
          document.getElementById("project-tags").innerHTML = tags;
          document.getElementById("project-author").textContent = `Autor: ${project.author.name}`;
  
          const authorImg = document.createElement("img");

          const linkedinBtn = document.querySelector(".linkedin-btn");
      

          authorImg.src = project.author.photo;
          authorImg.alt = `Foto do autor ${project.author.photo}`;
          linkedinBtn.href = project.author.linkedin;
          authorImg.classList.add("author-img");
  
          const container = document.querySelector(".container");
          container.appendChild(authorImg);
          container.appendChild(linkedinBtn)
  
     
        } else {
          
          console.error(`Projeto com ID ${projectId} não encontrado.`);
        }
      })
      .catch(error => {
        console.error(`Erro ao carregar os projetos: ${error}`);
      });
  }
  
  loadProjectPage();
  
  function carregarProjetos() {
    fetch('projects.json')
      .then(response => response.json())
      .then(projetos => {
        const container = document.querySelector('.portfolio');
        projetos.forEach(projeto => {
          const card = createProjectCard(projeto);
          card.addEventListener("click", () => {
            window.location.href = `projeto.html?id=${projeto.id}`;
          });
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar projetos:', error);
      });
  }
  