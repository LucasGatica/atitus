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
});
